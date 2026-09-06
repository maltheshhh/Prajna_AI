# KSP Crime Portal — Probabilistic Face Matching Service

## Architecture & Technology Choice

### Model & Approach Justification
For the Karnataka State Police (KSP) Crime Portal, we employ **DeepFace with ArcFace/Facenet512 feature representations** combined with normalized **Cosine Similarity**.
- **Age-Invariance & Expression Robustness**: ArcFace enforces additive angular margins during feature extraction, making embeddings invariant to natural aging, expression shifts, and CCTV lighting variations.
- **Strict Similarity Cutoff (`SIMILARITY_THRESHOLD = 0.68`)**: To prevent wrongful accusations and bias, any candidate scoring below 68% confidence is automatically discarded, returning `"match_found": false` / `"match_status": "no_match"`.
- **Human-in-the-Loop Advisory Output**: Match outputs are explicitly advisory and marked `pending_manual_verification` for the Station House Officer (SHO).

---

## Directory Structure

```
face-matching-service/
├── app.py                     # FastAPI REST Microservice (/match, /enroll, /convicts, /health)
├── face_matcher.py            # Core Biometric Engine & 10 KSP Seed Convict Profiles
├── catalyst_integration.py    # Zoho Catalyst Advanced I/O Python function
├── seed_convicts.py           # Seed script for 10 KSP Convict Records
├── test_face_matching.py      # Automated Test Suite (Matching, Cutoffs, Non-face detection)
├── Dockerfile                 # Docker container specification
├── requirements.txt           # Python dependencies
└── README.md                  # System Documentation
```

---

## How to Run Locally

1. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the FastAPI Microservice**:
   ```bash
   python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
   ```

3. **Verify Health**:
   ```bash
   curl http://localhost:8000/health
   ```

4. **Run Automated Tests**:
   ```bash
   python test_face_matching.py
   ```

---

## Deploying to Free-Tier Hosting (Render / Railway)

1. Create a free account on **Render** or **Railway**.
2. Connect this repository and set the root directory to `face-matching-service`.
3. Set start command: `uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Copy the public service URL (e.g. `https://ksp-face-match.onrender.com`).

---

## Wiring Zoho Catalyst Function

Set the `FACE_SERVICE_URL` environment variable in Zoho Catalyst console:
```bash
FACE_SERVICE_URL=https://ksp-face-match.onrender.com
SERVICE_TIMEOUT_SECONDS=15
```

---

## JSON Response Contract (Aligned with KSP Database)

```json
{
  "complaint_id": "CMP-2026-BLR-0842",
  "match_status": "match_found",
  "status_description": "Probabilistic match found above similarity threshold (68%). Advisory only - pending manual officer verification.",
  "confidence_threshold": 68.0,
  "candidates": [
    {
      "convict_id": "SUS-001",
      "name": "Raju K.",
      "aliases": ["Shorty Raju", "Kulla Raju"],
      "photo_url": "/assets/suspects/raju_k.jpg",
      "confidence_score": 89.4,
      "crime_type": "Daytime Housebreaking & Burglary",
      "mo_signature": "Daytime housebreaking using duplicate latch keys along residential layouts",
      "conviction_date": "2023-04-14",
      "release_status": "Released on Bail (Active Watch)",
      "last_known_address": "Slum Quarter, Lakkasandra, Wilson Garden, Bengaluru - 560027",
      "district": "Bengaluru Urban",
      "police_station": "Wilson Garden Police Station",
      "linked_firs": ["FIR-001", "FIR-004", "FIR-015"],
      "aadhar_hash": "a12b34c56def7890",
      "risk_tier": "high"
    }
  ],
  "query_metadata": {
    "detection_confidence": 98.6,
    "face_bounding_box": { "top": 120, "right": 340, "bottom": 380, "left": 160 },
    "age_progression_applied": true,
    "estimated_query_age": 31,
    "gender": "male",
    "embedding_dimension": 512
  },
  "timestamp": "2026-08-27T14:52:00.000Z"
}
```
