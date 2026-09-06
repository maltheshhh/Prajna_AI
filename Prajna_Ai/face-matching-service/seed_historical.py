"""
CIRAS 1.0 - Historical Subjects Seed Script
--------------------------------------------
Seeds the face-matching service with all 30 historical reference images
(P-001 through P-010, years 2011/2012/2013).

Usage:
    python seed_historical.py

Requires the face-matching service to be running on port 8000.
"""

import os
import sys
import json
import requests

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
HISTORICAL_DIR = os.path.join(BASE_DIR, "historical_photos")
MATCH_API = "http://localhost:8000"

SUBJECTS = [
    {"person_id": f"P-{str(i).zfill(3)}", "display_name": f"Demo Subject {str(i).zfill(3)}"}
    for i in range(1, 11)
]

YEARS = [2011, 2012, 2013]


def seed_via_api():
    """Enroll all historical subjects via the /enroll endpoint."""
    enrolled = 0
    failed = 0

    for subj in SUBJECTS:
        pid = subj["person_id"]
        primary_filename = f"{pid}_2011.jpg"
        primary_path = os.path.join(HISTORICAL_DIR, primary_filename)

        if not os.path.exists(primary_path):
            print(f"  [WARN] Image not found: {primary_path}")
            failed += 1
            continue

        with open(primary_path, "rb") as f:
            img_bytes = f.read()

        try:
            resp = requests.post(
                f"{MATCH_API}/enroll",
                data={
                    "convict_id": pid,
                    "name": subj["display_name"],
                    "crime_type": "Synthetic Historical Record (Demo)",
                    "conviction_date": "2011-01-01",
                    "release_status": "HISTORICAL",
                    "last_known_address": "Karnataka (Historical Record)",
                    "district": "Karnataka",
                    "police_station": "Historical Records Unit",
                },
                files={"photo": (primary_filename, img_bytes, "image/jpeg")},
                timeout=30
            )
            if resp.status_code == 200:
                print(f"  [OK] Enrolled {pid} ({subj['display_name']})")
                enrolled += 1
            else:
                print(f"  [FAIL] {pid}: HTTP {resp.status_code}")
                failed += 1
        except Exception as e:
            print(f"  [ERROR] {pid}: {e}")
            failed += 1

    print(f"\nSeed complete: {enrolled} enrolled, {failed} failed.")


def verify_images():
    """Verify all 30 historical images are present."""
    missing = []
    for subj in SUBJECTS:
        for year in YEARS:
            fname = f"{subj['person_id']}_{year}.jpg"
            fpath = os.path.join(HISTORICAL_DIR, fname)
            if not os.path.exists(fpath):
                missing.append(fname)
    if missing:
        print(f"[WARN] Missing {len(missing)} images: {missing}")
    else:
        print(f"[OK] All 30 historical images present in {HISTORICAL_DIR}")
    return len(missing) == 0


if __name__ == "__main__":
    print("=== CIRAS 1.0 Historical Subjects Seed ===")
    print(f"Historical photos dir: {HISTORICAL_DIR}")
    print()

    ok = verify_images()
    if not ok and "--force" not in sys.argv:
        print("[ABORT] Fix missing images first. Use --force to proceed anyway.")
        sys.exit(1)

    print("\nSeeding via API...")
    seed_via_api()
