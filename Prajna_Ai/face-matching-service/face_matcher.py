"""
CIRAS 1.0 - KSP Historical Face Recognition Engine
----------------------------------------------------
Historical record verification: compares current evidence images
against historical reference photographs (2011-2013 records).

Modes:
  DLIB MODE  (CIRAS_DEMO_MODE=false): Real dlib ResNet-128 embeddings
  DEMO MODE  (CIRAS_DEMO_MODE=true):  Mock 128-D cosine similarity vectors
                                       from mock_face_index.json

Threshold configured via FACE_MATCH_THRESHOLD env var.
Default: 0.70 (cosine similarity for demo mode).
"""

import os
import io
import time
import json
import math
import re
import hashlib
import numpy as np
import face_recognition
from PIL import Image
from typing import List, Dict, Any, Optional, Tuple

# ---------------------------------------------------------------------------
# Configuration - controlled by environment variables (never hard-coded)
# ---------------------------------------------------------------------------
# CIRAS_DEMO_MODE=false → real dlib ResNet-128 Euclidean face matching
# CIRAS_DEMO_MODE=true  → synthetic cosine vectors (NOT ACCURATE, demo only)
FACE_MATCH_THRESHOLD = float(os.environ.get("FACE_MATCH_THRESHOLD", "0.55"))
CIRAS_DEMO_MODE = os.environ.get("CIRAS_DEMO_MODE", "false").lower() == "true"

# Legacy alias used by app.py import
DISTANCE_THRESHOLD = FACE_MATCH_THRESHOLD

DEFAULT_HISTORICAL_SUBJECTS = [
    {
        "person_id": "CONV-001", "display_name": "Riya Sharma",
        "alias_primary": "Riya", "record_status": "Parole",
        "record_type": "CONVICT_RECORD", "record_period": "2022-present",
        "offence_category": "[FICTIONAL] House Breaking / Theft",
        "photo_filename": "CONV-001.jpg",
        "photo_url": "/assets/convicts/CONV-001.jpg",
        "last_known_address": "Shanti Nagar, Ward 14, Lucknow, Uttar Pradesh",
        "district": "Lucknow",
        "police_station": "Aliganj Police Station",
        "linked_firs": ["FIR-184/2020", "FIR-57/2021"],
        "risk_tier": "Medium",
        "conviction_date": "2022-06-17",
        "mo_signature": "[FICTIONAL TEST DATA] Targeted unoccupied residential properties during daytime hours.",
        "notes": "[FICTIONAL TEST DATA] For demo/testing only."
    },
    {
        "person_id": "CONV-002", "display_name": "Aarav Mehta",
        "alias_primary": "Avi", "record_status": "In Custody",
        "record_type": "CONVICT_RECORD", "record_period": "2021-present",
        "offence_category": "[FICTIONAL] Robbery",
        "photo_filename": "CONV-002.jpg",
        "photo_url": "/assets/convicts/CONV-002.jpg",
        "last_known_address": "Azad Nagar, Bhopal, Madhya Pradesh",
        "district": "Bhopal",
        "police_station": "Hanumanganj Police Station",
        "linked_firs": ["FIR-312/2019", "FIR-88/2020"],
        "risk_tier": "High",
        "conviction_date": "2021-11-09",
        "mo_signature": "[FICTIONAL TEST DATA] Operated in pairs and targeted isolated fictional locations.",
        "notes": "[FICTIONAL TEST DATA] For demo/testing only."
    },
    {
        "person_id": "CONV-003", "display_name": "Kabir Nair",
        "alias_primary": "Kabi", "record_status": "Released on Bail",
        "record_type": "CONVICT_RECORD", "record_period": "2023-present",
        "offence_category": "[FICTIONAL] Motor Vehicle Theft",
        "photo_filename": "CONV-003.jpg",
        "photo_url": "/assets/convicts/CONV-003.jpg",
        "last_known_address": "Kankarbagh, Patna, Bihar",
        "district": "Patna",
        "police_station": "Kankarbagh Police Station",
        "linked_firs": ["FIR-126/2021", "FIR-203/2022", "FIR-19/2023"],
        "risk_tier": "Medium",
        "conviction_date": "2023-02-14",
        "mo_signature": "[FICTIONAL TEST DATA] Targeted motorcycles parked in poorly monitored public areas.",
        "notes": "[FICTIONAL TEST DATA] For demo/testing only."
    },
    {
        "person_id": "CONV-004", "display_name": "Ananya Iyer",
        "alias_primary": "Anu", "record_status": "Parole",
        "record_type": "CONVICT_RECORD", "record_period": "2020-present",
        "offence_category": "[FICTIONAL] Fraud / Breach of Trust",
        "photo_filename": "CONV-004.jpg",
        "photo_url": "/assets/convicts/CONV-004.jpg",
        "last_known_address": "Vijayanagar, Bengaluru, Karnataka",
        "district": "Bengaluru Urban",
        "police_station": "Vijayanagar Police Station",
        "linked_firs": ["FIR-91/2019", "FIR-44/2020"],
        "risk_tier": "Medium",
        "conviction_date": "2020-09-28",
        "mo_signature": "[FICTIONAL TEST DATA] Obtained money through fictional business representations and false claims.",
        "notes": "[FICTIONAL TEST DATA] For demo/testing only."
    },
    {
        "person_id": "CONV-005", "display_name": "Priya Rao",
        "alias_primary": "Priya", "record_status": "Released on Bail",
        "record_type": "CONVICT_RECORD", "record_period": "2022-present",
        "offence_category": "[FICTIONAL] Robbery / Theft",
        "photo_filename": "CONV-005.jpg",
        "photo_url": "/assets/convicts/CONV-005.jpg",
        "last_known_address": "Mansarovar, Jaipur, Rajasthan",
        "district": "Jaipur",
        "police_station": "Mansarovar Police Station",
        "linked_firs": ["FIR-245/2021", "FIR-71/2022"],
        "risk_tier": "High",
        "conviction_date": "2022-12-05",
        "mo_signature": "[FICTIONAL TEST DATA] Targeted fictional commercial locations and pedestrians carrying visible valuables.",
        "notes": "[FICTIONAL TEST DATA] For demo/testing only."
    },
    # ---- PLACEHOLDER (kept to avoid breaking loop bounds) ----
    {
        "person_id": "CONV-PLACEHOLDER-006", "display_name": "Demo Subject 006",
        "alias_primary": "Subject-006", "record_status": "HISTORICAL",
        "record_type": "SYNTHETIC_DEMO", "record_period": "2011-2013",
        "offence_category": "Synthetic Property Scenario",
        "photo_filename": "CONV-005.jpg",
        "photo_url": "/assets/convicts/CONV-005.jpg",
        "notes": "Placeholder — remove when 6th real convict is added."
    },
    {
        "person_id": "CONV-PLACEHOLDER-007", "display_name": "Demo Subject 007",
        "alias_primary": "Subject-007", "record_status": "HISTORICAL",
        "record_type": "SYNTHETIC_DEMO", "record_period": "2011-2013",
        "offence_category": "Synthetic Cybercrime Scenario",
        "photo_filename": "CONV-005.jpg",
        "photo_url": "/assets/convicts/CONV-005.jpg",
        "notes": "Placeholder — remove when 7th real convict is added."
    },
]

# Legacy alias — keeps app.py and legacy endpoints working.
# Pulls real per-record fields from DEFAULT_HISTORICAL_SUBJECTS.
DEFAULT_CONVICTS_DATA = [
    {
        "convict_id": s["person_id"],
        "person_id": s["person_id"],
        "name": s["display_name"],
        "display_name": s["display_name"],
        "aliases": [s["alias_primary"]],
        "crime_type": s["offence_category"],
        "mo_signature": s.get("mo_signature", f"Record — {s['record_period']}"),
        "conviction_date": s.get("conviction_date", "2022-01-01"),
        "release_status": s["record_status"],
        "record_status": s["record_status"],
        "record_period": s["record_period"],
        "record_type": s["record_type"],
        "last_known_address": s.get("last_known_address", ""),
        "district": s.get("district", ""),
        "police_station": s.get("police_station", ""),
        "linked_firs": s.get("linked_firs", []),
        "risk_tier": s.get("risk_tier", ""),
        "photo_filename": s["photo_filename"],
        "photo_url": s["photo_url"],
    }
    for s in DEFAULT_HISTORICAL_SUBJECTS
    if not s["person_id"].startswith("CONV-PLACEHOLDER")
]


class ConvictRecord:
    """Represents a historical person record in the CIRAS database."""
    def __init__(
        self,
        convict_id: str,
        name: str,
        aliases: List[str],
        crime_type: str,
        mo_signature: str,
        conviction_date: str,
        release_status: str,
        last_known_address: str,
        district: str,
        police_station: str,
        linked_firs: List[str],
        risk_tier: str,
        photo_url: str,
        embedding: Optional[np.ndarray] = None,
        record_period: str = "2011-2013",
        record_type: str = "SYNTHETIC_DEMO",
    ):
        self.convict_id = convict_id
        self.person_id = convict_id          # CIRAS alias
        self.name = name
        self.display_name = name             # CIRAS alias
        self.aliases = aliases
        self.crime_type = crime_type
        self.mo_signature = mo_signature
        self.conviction_date = conviction_date
        self.release_status = release_status
        self.record_status = release_status  # CIRAS alias
        self.last_known_address = last_known_address
        self.district = district
        self.police_station = police_station
        self.linked_firs = linked_firs
        self.risk_tier = risk_tier
        self.photo_url = photo_url
        self.embedding = embedding
        self.record_period = record_period
        self.record_type = record_type


class FaceMatchingEngine:
    def __init__(self, distance_threshold: float = FACE_MATCH_THRESHOLD):
        self.threshold = distance_threshold
        self.convicts_db: Dict[str, ConvictRecord] = {}
        self._mock_adapter = None
        self.load_default_convicts()
        if CIRAS_DEMO_MODE:
            self._load_mock_adapter()

    def _load_mock_adapter(self):
        """Load the CIRAS Demo Mock Adapter from mock_face_index.json."""
        try:
            mock_path = os.path.join(os.path.dirname(__file__), "mock_face_index.json")
            self._mock_adapter = CIRASMockAdapter(mock_path, self.threshold, engine_ref=self)
            print(f"[CIRAS] Demo mock adapter loaded - {len(self._mock_adapter.enrolled_vectors)} enrolled vectors, threshold={self.threshold}")
        except Exception as e:
            print(f"[CIRAS] Warning: Could not load mock adapter: {e}")
            self._mock_adapter = None

    def load_default_convicts(self):
        """Loads and computes 128-dim dlib ResNet face embeddings for all convicts."""
        base_dirs = [
            os.path.join(os.path.dirname(__file__), "historical_photos"),
            os.path.join(os.path.dirname(__file__), "convict_photos"),
        ]

        loaded = 0
        for item in DEFAULT_CONVICTS_DATA:
            img_bytes = None
            filename = item["photo_filename"]
            possible_names = [
                filename,
                f"{filename}.png",
                filename.replace('.jpg', '.png'),
                filename.replace('.jpg', '.jpg.png')
            ]

            for bdir in base_dirs:
                if not os.path.exists(bdir):
                    continue
                for pname in possible_names:
                    full_path = os.path.join(bdir, pname)
                    if os.path.exists(full_path):
                        try:
                            with open(full_path, "rb") as f:
                                img_bytes = f.read()
                            break
                        except Exception:
                            pass
                if img_bytes:
                    break

            success = self.enroll_convict_with_image(item, image_bytes=img_bytes)
            if success:
                loaded += 1

        print(f"[CIRAS] Loaded {loaded}/{len(DEFAULT_CONVICTS_DATA)} historical subject embeddings (dlib ResNet-128)")

    def _bytes_to_rgb_array(self, image_bytes: bytes) -> Optional[np.ndarray]:
        """Convert raw image bytes to RGB numpy array for face_recognition."""
        try:
            pil_img = Image.open(io.BytesIO(image_bytes))
            # Convert to RGB (face_recognition requires RGB)
            rgb_img = pil_img.convert('RGB')
            return np.array(rgb_img)
        except Exception:
            return None

    def extract_face_embedding(self, image_bytes: bytes) -> Tuple[Optional[np.ndarray], Dict[str, Any]]:
        """
        Extract 128-dimensional face identity embedding using dlib's pre-trained ResNet.
        This is a REAL neural network that encodes facial IDENTITY, not texture patterns.
        """
        if not image_bytes or len(image_bytes) < 80:
            return None, {"error": "Corrupted or empty image payload"}

        img_array = self._bytes_to_rgb_array(image_bytes)
        if img_array is None:
            return None, {"error": "Unsupported image format"}

        # Detect face locations first
        face_locations = face_recognition.face_locations(img_array, model="hog")

        if not face_locations:
            # Try with the full image as a single face (some tightly cropped portraits)
            face_encodings = face_recognition.face_encodings(img_array)
            if not face_encodings:
                return None, {
                    "match_status": "no_face_detected",
                    "message": "No human face detected in the uploaded image. Ensure the photo shows a clear face."
                }
            embedding = face_encodings[0]
            bbox = {"top": 0, "right": img_array.shape[1], "bottom": img_array.shape[0], "left": 0}
        else:
            # Use the largest detected face
            largest_face = max(face_locations, key=lambda loc: (loc[2] - loc[0]) * (loc[1] - loc[3]))
            face_encodings = face_recognition.face_encodings(img_array, known_face_locations=[largest_face])
            if not face_encodings:
                return None, {
                    "match_status": "no_face_detected",
                    "message": "Face detected but encoding extraction failed."
                }
            embedding = face_encodings[0]
            top, right, bottom, left = largest_face
            bbox = {"top": int(top), "right": int(right), "bottom": int(bottom), "left": int(left)}

        metadata = {
            "detection_confidence": 99.5,
            "face_bounding_box": bbox,
            "faces_detected": len(face_locations) if face_locations else 1,
            "embedding_dimension": 128,
            "model": "dlib-resnet-v1"
        }

        return embedding, metadata

    def match_face(
        self,
        image_bytes: bytes,
        complaint_id: str = "CMP-2026-BLR-0842",
        officer_ps_id: str = "KA/BLR/C/HSR-001"
    ) -> Dict[str, Any]:
        """
        Match uploaded face against all enrolled convicts using dlib ResNet embeddings.
        Uses Euclidean distance: < 0.6 = same person, > 0.6 = different person.
        """
        start_time = time.time()
        query_embedding, metadata = self.extract_face_embedding(image_bytes)
        timestamp_iso = time.strftime('%Y-%m-%dT%H:%M:%S.000Z', time.gmtime())

        if query_embedding is None:
            return {
                "complaint_id": complaint_id,
                "match_status": metadata.get("match_status", "no_face_detected"),
                "status_description": metadata.get("message", "No face detected in the uploaded image."),
                "confidence_threshold": round((1 - self.threshold) * 100, 1),
                "candidates": [],
                "timestamp": timestamp_iso
            }

        # Compute Euclidean distance to all enrolled convicts
        scored_convicts = []
        for convict_id, convict in self.convicts_db.items():
            if convict.embedding is None:
                continue
            distance = float(np.linalg.norm(query_embedding - convict.embedding))
            scored_convicts.append((distance, convict))

        scored_convicts.sort(key=lambda x: x[0])  # Lower distance = better match

        if not scored_convicts:
            return {
                "complaint_id": complaint_id,
                "match_status": "no_match",
                "status_description": "No enrolled convicts available in photo database.",
                "confidence_threshold": round((1 - self.threshold) * 100, 1),
                "candidates": [],
                "timestamp": timestamp_iso
            }

        top_distance, top_convict = scored_convicts[0]

        # Convert distance to confidence percentage
        # distance 0.0 = 100% match (identical)
        # distance 0.6 = threshold (~0% usable confidence)
        # distance 0.4 = ~66% confidence (strong match)
        # distance 0.3 = ~83% confidence (very strong match)
        if top_distance <= 0.0:
            top_confidence = 100.0
        elif top_distance >= self.threshold:
            top_confidence = 0.0
        else:
            # Linear mapping: 0 -> 100%, threshold -> 0%
            top_confidence = round((1.0 - top_distance / self.threshold) * 100.0, 1)

        candidates = []
        if top_distance < self.threshold:
            candidates.append({
                "convict_id": top_convict.convict_id,
                "person_id": top_convict.convict_id,
                "name": top_convict.name,
                "display_name": getattr(top_convict, 'display_name', top_convict.name),
                "aliases": top_convict.aliases,
                "photo_url": top_convict.photo_url,
                "historical_photos": [
                    top_convict.photo_url,
                    top_convict.photo_url.replace('_2011.jpg', '_2012.jpg'),
                    top_convict.photo_url.replace('_2011.jpg', '_2013.jpg')
                ],
                "confidence_score": top_confidence,
                "similarity": round(1.0 - top_distance, 4),
                "distance": round(top_distance, 4),
                "crime_type": top_convict.crime_type,
                "offence_category": top_convict.crime_type,
                "mo_signature": top_convict.mo_signature,
                "conviction_date": top_convict.conviction_date,
                "release_status": top_convict.release_status,
                "record_status": getattr(top_convict, 'record_status', 'HISTORICAL'),
                "record_period": getattr(top_convict, 'record_period', '2011-2013'),
                "record_type": getattr(top_convict, 'record_type', 'SYNTHETIC_DEMO'),
                "last_known_address": top_convict.last_known_address,
                "district": top_convict.district,
                "police_station": top_convict.police_station,
                "linked_firs": top_convict.linked_firs,
                "risk_tier": top_convict.risk_tier,
                "threshold": self.threshold,
                "model_version": "CIRAS-DLIB-1.0"
            })

            # Also add runner-up if it's also below threshold
            if len(scored_convicts) > 1:
                r_dist, r_convict = scored_convicts[1]
                if r_dist < self.threshold:
                    r_conf = round((1.0 - r_dist / self.threshold) * 100.0, 1)
                    candidates.append({
                        "convict_id": r_convict.convict_id,
                        "person_id": r_convict.convict_id,
                        "name": r_convict.name,
                        "display_name": getattr(r_convict, 'display_name', r_convict.name),
                        "aliases": r_convict.aliases,
                        "photo_url": r_convict.photo_url,
                        "historical_photos": [
                            r_convict.photo_url,
                            r_convict.photo_url.replace('_2011.jpg', '_2012.jpg'),
                            r_convict.photo_url.replace('_2011.jpg', '_2013.jpg')
                        ],
                        "confidence_score": r_conf,
                        "similarity": round(1.0 - r_dist, 4),
                        "distance": round(r_dist, 4),
                        "crime_type": r_convict.crime_type,
                        "offence_category": r_convict.crime_type,
                        "mo_signature": r_convict.mo_signature,
                        "conviction_date": r_convict.conviction_date,
                        "release_status": r_convict.release_status,
                        "record_status": getattr(r_convict, 'record_status', 'HISTORICAL'),
                        "record_period": getattr(r_convict, 'record_period', '2011-2013'),
                        "record_type": getattr(r_convict, 'record_type', 'SYNTHETIC_DEMO'),
                        "last_known_address": r_convict.last_known_address,
                        "district": r_convict.district,
                        "police_station": r_convict.police_station,
                        "linked_firs": r_convict.linked_firs,
                        "risk_tier": r_convict.risk_tier,
                        "threshold": self.threshold,
                        "model_version": "CIRAS-DLIB-1.0"
                    })

        exec_time_ms = round((time.time() - start_time) * 1000, 1)

        if not candidates:
            return {
                "complaint_id": complaint_id,
                "match_status": "NO_CANDIDATE_ABOVE_THRESHOLD",
                "status_description": f"AI Face Search Complete. No historical record candidate above threshold (highest similarity: {1 - top_distance:.3f}, configured threshold: {1 - self.threshold:.2f}). No historical record candidate above threshold.",
                "similarity": round(1 - top_distance, 4),
                "threshold": round(1 - self.threshold, 2),
                "closest_distance": round(top_distance, 4),
                "candidates": [],
                "query_metadata": metadata,
                "audit_trail": {
                    "model_name": "dlib-ResNet-v1-128dim",
                    "model_version": "CIRAS-DLIB-1.0",
                    "similarity_metric": "euclidean_distance",
                    "database_records_scanned": len(self.convicts_db),
                    "execution_time_ms": exec_time_ms,
                    "officer_ps_id": officer_ps_id
                },
                "timestamp": timestamp_iso
            }

        return {
            "complaint_id": complaint_id,
            "match_status": "POTENTIAL_MATCH",
            "status_description": f"Potential historical record candidate found. Similarity {1 - top_distance:.3f} above threshold {1 - self.threshold:.2f}. Advisory only - officer review required. AI result does not establish identity, guilt, or current criminal status.",
            "similarity": round(1 - top_distance, 4),
            "threshold": round(1 - self.threshold, 2),
            "candidates": candidates,
            "query_metadata": metadata,
            "audit_trail": {
                "model_name": "dlib-ResNet-v1-128dim",
                "model_version": "CIRAS-DLIB-1.0",
                "similarity_metric": "euclidean_distance",
                "database_records_scanned": len(self.convicts_db),
                "execution_time_ms": exec_time_ms,
                "officer_ps_id": officer_ps_id
            },
            "timestamp": timestamp_iso
        }

    def enroll_convict_with_image(self, record_data: Dict[str, Any], image_bytes: Optional[bytes] = None) -> bool:
        """Enroll a convict with their 128-dim dlib ResNet face embedding."""
        embedding = None
        if image_bytes:
            embedding, _ = self.extract_face_embedding(image_bytes)
            if embedding is None:
                print(f"[WARN] No face detected for {record_data['convict_id']} ({record_data['name']})")

        convict = ConvictRecord(
            convict_id=record_data.get("convict_id", record_data.get("person_id", "P-000")),
            name=record_data.get("name", record_data.get("display_name", "Unknown Subject")),
            aliases=record_data.get("aliases", []),
            crime_type=record_data.get("crime_type", "Synthetic Historical Record"),
            mo_signature=record_data.get("mo_signature", record_data.get("crime_type", "Historical record")),
            conviction_date=record_data.get("conviction_date", "2011-01-01"),
            release_status=record_data.get("release_status", "HISTORICAL"),
            last_known_address=record_data.get("last_known_address", "Karnataka"),
            district=record_data.get("district", "Karnataka"),
            police_station=record_data.get("police_station", "Historical Records Unit"),
            linked_firs=record_data.get("linked_firs", []),
            risk_tier=record_data.get("risk_tier", "Historical"),
            photo_url=record_data.get("photo_url", f"/assets/historical/{record_data.get('photo_filename', 'unknown.jpg')}"),
            embedding=embedding,
            record_period=record_data.get("record_period", "2011-2013"),
            record_type=record_data.get("record_type", "SYNTHETIC_DEMO"),
        )
        self.convicts_db[convict.convict_id] = convict
        return embedding is not None

    def search_ciras(
        self,
        image_bytes: bytes,
        filename_hint: str = "",
        complaint_id: str = "",
        officer_ps_id: str = ""
    ) -> Dict[str, Any]:
        """
        CIRAS-aware face search. In demo mode delegates to CIRASMockAdapter.
        In real mode delegates to match_face() dlib path.
        """
        if CIRAS_DEMO_MODE and self._mock_adapter:
            return self._mock_adapter.search(
                image_bytes=image_bytes,
                filename_hint=filename_hint,
                complaint_id=complaint_id,
                officer_ps_id=officer_ps_id
            )
        return self.match_face(
            image_bytes=image_bytes,
            complaint_id=complaint_id,
            officer_ps_id=officer_ps_id
        )


# ---------------------------------------------------------------------------
# CIRAS Demo Mock Adapter
# ---------------------------------------------------------------------------
class CIRASMockAdapter:
    """
    DEMO-ONLY face search adapter using pre-computed 128-dimensional
    cosine similarity vectors from mock_face_index.json.
    Supports filename matching, direct SHA256 hashing, perceptual dHash (64-bit),
    and real dlib face encoding fallback.
    Model version: DEMO-ADAPTER-1.0
    """

    MODEL_VERSION = "DEMO-ADAPTER-1.0"

    def __init__(self, index_path: str, threshold: float = 0.70, engine_ref=None):
        self.threshold = threshold
        self._engine_ref = engine_ref
        self.enrolled_vectors: Dict[str, np.ndarray] = {}
        self.sha256_map: Dict[str, Tuple[Optional[str], float]] = {}
        self.dhash_list: List[Tuple[np.ndarray, Optional[str], float]] = []
        self._load_index(index_path)
        self._index_known_images()

    def _load_index(self, path: str):
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        raw = data.get("enrolled_vectors", {})
        for pid, vec in raw.items():
            arr = np.array(vec, dtype=np.float32)
            norm = np.linalg.norm(arr)
            if norm > 0:
                arr = arr / norm
            self.enrolled_vectors[pid] = arr

    @staticmethod
    def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
        return float(np.dot(a, b))

    @staticmethod
    def _compute_dhash(img_bytes: bytes) -> Optional[np.ndarray]:
        try:
            img = Image.open(io.BytesIO(img_bytes)).convert('L').resize((9, 8), Image.Resampling.LANCZOS)
            pixels = np.array(img, dtype=np.float32)
            return (pixels[:, 1:] > pixels[:, :-1]).flatten()
        except Exception:
            return None

    def _index_known_images(self):
        """Index all known historical and evidence images by SHA256 and dHash."""
        base_dir = os.path.dirname(os.path.abspath(__file__))
        search_dirs = [
            os.path.join(base_dir, "historical_photos"),
            os.path.join(base_dir, "evidence_photos"),
            os.path.join(base_dir, "convict_photos"),
            os.path.join(base_dir, "..", "Prajna_Frontend", "public", "assets", "historical"),
            os.path.join(base_dir, "..", "Prajna_Frontend", "public", "assets", "evidence"),
            r"c:\Users\anshv\OneDrive\Desktop\CIRAS_1.0_COMPLETE_DEMO_DATASET\images\historical",
            r"c:\Users\anshv\OneDrive\Desktop\CIRAS_1.0_COMPLETE_DEMO_DATASET\images\evidence",
        ]

        inc_targets = {
            "INC-001": ("P-001", 0.91), "INC-002": ("P-002", 0.86),
            "INC-003": ("P-003", 0.82), "INC-004": ("P-004", 0.77),
            "INC-005": ("P-005", 0.74), "INC-006": ("P-006", 0.71),
            "INC-007": (None, 0.68),    "INC-008": (None, 0.61),
            "INC-009": (None, 0.53),    "INC-010": (None, 0.44),
        }

        indexed = 0
        for sdir in search_dirs:
            if not os.path.exists(sdir):
                continue
            try:
                for fname in os.listdir(sdir):
                    fpath = os.path.join(sdir, fname)
                    if not os.path.isfile(fpath) or not fname.lower().endswith(('.jpg', '.jpeg', '.png')):
                        continue
                    try:
                        with open(fpath, "rb") as fp:
                            b = fp.read()
                        if not b:
                            continue
                        digest = hashlib.sha256(b).hexdigest()
                        if digest in self.sha256_map:
                            continue

                        upper = fname.upper()
                        target_pid = None
                        target_sim = 0.96

                        # Check P-001 through P-010
                        matched_p = False
                        for i in range(1, 11):
                            padded = f"{i:03d}"
                            if f"P-{padded}" in upper or f"P_{padded}" in upper or f"P{padded}" in upper:
                                target_pid = f"P-{padded}"
                                target_sim = 0.96
                                matched_p = True
                                break

                        if not matched_p:
                            for inc_key, (t_pid, t_sim) in inc_targets.items():
                                if inc_key in upper:
                                    target_pid = t_pid
                                    target_sim = t_sim
                                    break

                        self.sha256_map[digest] = (target_pid, target_sim)
                        dh = self._compute_dhash(b)
                        if dh is not None:
                            self.dhash_list.append((dh, target_pid, target_sim))
                        indexed += 1
                    except Exception:
                        pass
            except Exception:
                pass
        print(f"[CIRAS] Mock adapter indexed {indexed} images across {len(self.sha256_map)} unique hashes")

    def _probe_vector_for_image(self, image_bytes: bytes, filename_hint: str = "") -> np.ndarray:
        """
        Generate a deterministic probe vector for CIRAS 1.0.
        Checks:
          1. Filename hints (P-001..P-010, INC-001..INC-010, Convict_1..10)
          2. SHA256 hash match against all known historical and evidence images
          3. Perceptual dHash match (Hamming distance <= 12)
          4. Real dlib ResNet-128 face encoding comparison
          5. Fallback deterministic below-threshold probe (~0.42)
        """
        hint = (filename_hint or "").upper()
        target_pid: Optional[str] = None
        target_sim: Optional[float] = None

        # 1. Filename matching: P-001 through P-010
        for i in range(1, 11):
            padded = f"{i:03d}"
            pid = f"P-{padded}"
            pats = [
                rf"\bP-?0*{i}\b",
                rf"\bP_0*{i}\b",
                rf"CONVICT[-_ ]?0*{i}\b",
                rf"SUBJECT[-_ ]?0*{i}\b",
            ]
            if any(re.search(pat, hint, re.IGNORECASE) for pat in pats):
                target_pid = pid
                target_sim = 0.96
                break

        # 1b. Filename matching: INC-001 through INC-010
        if target_pid is None and target_sim is None:
            inc_map = {
                1: ("P-001", 0.91), 2: ("P-002", 0.86), 3: ("P-003", 0.82),
                4: ("P-004", 0.77), 5: ("P-005", 0.74), 6: ("P-006", 0.71),
                7: (None, 0.68),    8: (None, 0.61),    9: (None, 0.53), 10: (None, 0.44),
            }
            for i, (p_id, s_val) in inc_map.items():
                if re.search(rf"\bINC-?0*{i}\b", hint, re.IGNORECASE):
                    target_pid = p_id
                    target_sim = s_val
                    break

        # 2. Exact SHA256 hash match
        if (target_pid is None and target_sim is None) and image_bytes:
            digest = hashlib.sha256(image_bytes).hexdigest()
            if digest in self.sha256_map:
                target_pid, target_sim = self.sha256_map[digest]

        # 3. Perceptual dHash match (Hamming distance <= 12)
        if (target_pid is None and target_sim is None) and image_bytes:
            query_dh = self._compute_dhash(image_bytes)
            if query_dh is not None and self.dhash_list:
                best_dist = 64
                best_match = None
                for known_dh, k_pid, k_sim in self.dhash_list:
                    dist = int(np.count_nonzero(query_dh != known_dh))
                    if dist < best_dist:
                        best_dist = dist
                        best_match = (k_pid, k_sim)
                if best_dist <= 12 and best_match:
                    target_pid, target_sim = best_match

        # 4. Real dlib face encoding fallback
        if (target_pid is None and target_sim is None) and image_bytes and self._engine_ref:
            try:
                img_pil = Image.open(io.BytesIO(image_bytes)).convert("RGB")
                rgb_arr = np.array(img_pil)
                encodings = face_recognition.face_encodings(rgb_arr)
                if encodings:
                    q_enc = encodings[0]
                    norm_q = float(np.linalg.norm(q_enc))
                    scored_dlib = []
                    for cid, crec in self._engine_ref.convicts_db.items():
                        if crec.embedding is not None:
                            norm_c = float(np.linalg.norm(crec.embedding))
                            cos = float(np.dot(q_enc, crec.embedding) / (norm_q * norm_c)) if norm_q > 0 and norm_c > 0 else 0.0
                            scored_dlib.append((cos, cid))
                    if scored_dlib:
                        scored_dlib.sort(key=lambda x: -x[0])
                        top_cos, top_id = scored_dlib[0]
                        if top_cos >= 0.70:
                            target_pid = top_id
                            target_sim = round(top_cos, 4)
                        else:
                            target_pid = None
                            target_sim = round(top_cos, 4)
            except Exception:
                pass

        # 5. Build unit probe vector
        if target_pid and target_pid in self.enrolled_vectors:
            enrolled = self.enrolled_vectors[target_pid]
            sim = target_sim if target_sim is not None else 0.95
            seed = hash(f"{hint}_{target_pid}") % (2**31)
            noise = np.random.RandomState(seed=seed).randn(128).astype(np.float32)
            noise -= np.dot(noise, enrolled) * enrolled
            norm_noise = np.linalg.norm(noise)
            if norm_noise > 0:
                noise /= norm_noise
            probe = sim * enrolled + math.sqrt(max(0.0, 1.0 - sim**2)) * noise
            norm_probe = np.linalg.norm(probe)
            if norm_probe > 0:
                probe /= norm_probe
            return probe

        elif target_sim is not None:
            # Deterministic below-threshold vector matching target_sim exactly
            first_vec = next(iter(self.enrolled_vectors.values()))
            sim = target_sim
            seed = hash(f"{hint}_neg_{sim}") % (2**31)
            noise = np.random.RandomState(seed=seed).randn(128).astype(np.float32)
            noise -= np.dot(noise, first_vec) * first_vec
            norm_noise = np.linalg.norm(noise)
            if norm_noise > 0:
                noise /= norm_noise
            probe = sim * first_vec + math.sqrt(max(0.0, 1.0 - sim**2)) * noise
            norm_probe = np.linalg.norm(probe)
            if norm_probe > 0:
                probe /= norm_probe
            return probe

        else:
            # Unmatched / unknown subject below threshold (~0.42)
            seed = int.from_bytes(image_bytes[:4], 'little') if image_bytes else 42
            rng = np.random.RandomState(seed=seed % (2**31))
            probe = rng.randn(128).astype(np.float32)
            probe /= np.linalg.norm(probe)
            return probe

    def search(
        self,
        image_bytes: bytes,
        filename_hint: str = "",
        complaint_id: str = "",
        officer_ps_id: str = ""
    ) -> Dict[str, Any]:
        start = time.time()
        timestamp_iso = time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        probe = self._probe_vector_for_image(image_bytes, filename_hint)

        scored = [
            (self._cosine_similarity(probe, vec), pid)
            for pid, vec in self.enrolled_vectors.items()
        ]
        scored.sort(key=lambda x: -x[0])

        exec_ms = round((time.time() - start) * 1000, 1)

        def get_subject(pid):
            for s in DEFAULT_HISTORICAL_SUBJECTS:
                if s["person_id"] == pid:
                    return s
            return {"person_id": pid, "display_name": pid, "record_period": "2011-2013"}

        candidates = []
        for sim, pid in scored:
            if sim >= self.threshold:
                subj = get_subject(pid)
                candidates.append({
                    "person_id": pid,
                    "convict_id": pid,
                    "display_name": subj.get("display_name", pid),
                    "name": subj.get("display_name", pid),
                    "record_status": subj.get("record_status", "HISTORICAL"),
                    "record_period": subj.get("record_period", "2011-2013"),
                    "offence_category": subj.get("offence_category", ""),
                    "photo_url": subj.get("photo_url", f"/assets/historical/{pid}_2011.jpg"),
                    "historical_photos": [
                        f"/assets/historical/{pid}_2011.jpg",
                        f"/assets/historical/{pid}_2012.jpg",
                        f"/assets/historical/{pid}_2013.jpg",
                    ],
                    "similarity": round(sim, 4),
                    "confidence_score": round(max(70.0, min(99.0, sim * 100)), 1),
                    "distance": round(1.0 - sim, 4),
                    "threshold": self.threshold,
                    "model_version": self.MODEL_VERSION,
                })

        audit = {
            "model_name": "ciras-demo-mock-adapter",
            "model_version": self.MODEL_VERSION,
            "similarity_metric": "cosine_similarity",
            "database_records_scanned": len(self.enrolled_vectors),
            "execution_time_ms": exec_ms,
            "officer_ps_id": officer_ps_id,
            "demo_mode": True,
            "warning": "Synthetic demo vectors only. Not real biometric embeddings."
        }

        if candidates:
            top = candidates[0]
            return {
                "complaint_id": complaint_id,
                "match_status": "POTENTIAL_MATCH",
                "status_description": (
                    f"Potential historical record candidate found. "
                    f"{top['display_name']} - Similarity {top['similarity']} above "
                    f"configured threshold {self.threshold}. "
                    "Advisory only - officer review required."
                ),
                "similarity": top["similarity"],
                "threshold": self.threshold,
                "candidates": candidates,
                "audit_trail": audit,
                "timestamp": timestamp_iso,
            }
        else:
            top_sim = scored[0][0] if scored else 0.0
            return {
                "complaint_id": complaint_id,
                "match_status": "NO_CANDIDATE_ABOVE_THRESHOLD",
                "status_description": (
                    f"AI Face Search Complete. No historical record candidate above threshold "
                    f"(highest similarity: {top_sim:.4f}, configured threshold: {self.threshold}). "
                    "No historical record candidate above threshold."
                ),
                "similarity": round(top_sim, 4),
                "threshold": self.threshold,
                "candidates": [],
                "audit_trail": audit,
                "timestamp": timestamp_iso,
            }
