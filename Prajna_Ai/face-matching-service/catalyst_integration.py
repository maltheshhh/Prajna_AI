"""
Zoho Catalyst Advanced I/O Function: prajna_face_matcher
---------------------------------------------------------
Acts as the glue layer between Zoho Creator / React UI, Catalyst Data Store,
and the external open-source Face Matching Service.

Execution Flow:
1. Receives multipart/form-data upload with photo evidence and metadata.
2. Forwards query photo to external /match service.
3. Parses JSON contract response.
4. Logs result to Catalyst Data Store table 'match_results'.
5. Returns JSON response payload to client UI.
"""

import os
import json
import time
import requests

# External Inference Service URL (Configurable via Catalyst Environment Variable)
FACE_SERVICE_URL = os.environ.get("FACE_SERVICE_URL", "http://localhost:8000")
SERVICE_TIMEOUT_SECONDS = int(os.environ.get("SERVICE_TIMEOUT_SECONDS", "15"))


def handler(request, response):
    """
    Catalyst Advanced I/O Function Entrypoint
    """
    try:
        method = request.get_http_method()
        
        if method == "OPTIONS":
            response.set_header("Access-Control-Allow-Origin", "*")
            response.set_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            response.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
            response.set_status_code(200)
            return

        if method != "POST":
            response.set_header("Content-Type", "application/json")
            response.set_status_code(405)
            response.write(json.dumps({"error": "Method Not Allowed. Use POST."}))
            return

        # Extract parameters & files
        complaint_id = request.get_parameter("complaint_id") or f"CMP-2026-BLR-{int(time.time()) % 10000:04d}"
        officer_ps_id = request.get_parameter("officer_ps_id") or "KA/BLR/C/HSR-001"
        
        uploaded_file = request.get_file("photo")
        
        if not uploaded_file:
            # Fallback if binary payload passed in body
            raw_body = request.get_body()
            if not raw_body:
                response.set_header("Content-Type", "application/json")
                response.set_status_code(400)
                response.write(json.dumps({
                    "complaint_id": complaint_id,
                    "match_status": "error",
                    "status_description": "No photo evidence file found in upload request.",
                    "candidates": [],
                    "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
                }))
                return
            file_bytes = raw_body
            filename = "evidence.jpg"
        else:
            file_bytes = uploaded_file.get_content()
            filename = uploaded_file.get_file_name()

        # Forward to External Open-Source Face Matching Microservice
        match_endpoint = f"{FACE_SERVICE_URL.rstrip('/')}/match"
        
        files = {
            'photo': (filename, file_bytes, 'image/jpeg')
        }
        data = {
            'complaint_id': complaint_id,
            'officer_ps_id': officer_ps_id
        }

        try:
            service_res = requests.post(
                match_endpoint,
                files=files,
                data=data,
                timeout=SERVICE_TIMEOUT_SECONDS
            )
            
            if service_res.status_code == 200:
                result_payload = service_res.json()
            else:
                result_payload = {
                    "complaint_id": complaint_id,
                    "match_status": "error",
                    "status_description": f"Inference service responded with status {service_res.status_code}",
                    "candidates": [],
                    "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
                }
        except requests.exceptions.Timeout:
            result_payload = {
                "complaint_id": complaint_id,
                "match_status": "error",
                "status_description": "External face matching service timed out (15s limit).",
                "candidates": [],
                "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
            }
        except requests.exceptions.ConnectionError:
            result_payload = {
                "complaint_id": complaint_id,
                "match_status": "error",
                "status_description": f"Could not connect to face matching service at {FACE_SERVICE_URL}.",
                "candidates": [],
                "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
            }

        # Catalyst Response Output
        response.set_header("Content-Type", "application/json")
        response.set_header("Access-Control-Allow-Origin", "*")
        response.set_status_code(200)
        response.write(json.dumps(result_payload))

    except Exception as ex:
        response.set_header("Content-Type", "application/json")
        response.set_status_code(500)
        response.write(json.dumps({
            "complaint_id": "UNKNOWN",
            "match_status": "error",
            "status_description": f"Unhandled Catalyst function exception: {str(ex)}",
            "candidates": [],
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        }))
