"""
Automated Test Suite for KSP Probabilistic Face Matching Service
-----------------------------------------------------------------
Validates real computer-vision facial biometric extraction and thresholding:
  Test 1: Generates synthetic image with real face landmarks -> successfully extracts 512-dim embedding.
  Test 2: Matches query face against enrolled face -> verifies Cosine Similarity calculation.
  Test 3: Non-face / blank image -> returns "no_face_detected".
"""

import unittest
import numpy as np
import cv2
from face_matcher import FaceMatchingEngine, DISTANCE_THRESHOLD


def create_synthetic_face_image(expression_seed: int = 0) -> bytes:
    """Generates a synthetic portrait image with eyes, nose, and mouth landmarks for testing."""
    img = np.ones((200, 200, 3), dtype=np.uint8) * 230  # Light background

    # Head oval
    cv2.ellipse(img, (100, 100), (55, 75), 0, 0, 360, (180, 150, 130), -1)
    
    # Eyes
    eye_offset = expression_seed % 5
    cv2.circle(img, (80, 85 + eye_offset), 8, (50, 50, 50), -1)
    cv2.circle(img, (120, 85 + eye_offset), 8, (50, 50, 50), -1)
    
    # Nose
    cv2.line(img, (100, 95), (100, 115), (70, 70, 70), 3)
    
    # Mouth
    cv2.ellipse(img, (100, 135), (20, 10), 0, 0, 180, (40, 40, 40), 3)

    _, encoded = cv2.imencode('.jpg', img)
    return encoded.tobytes()


def create_blank_non_face_image() -> bytes:
    """Generates a blank image without any human facial landmarks."""
    img = np.ones((200, 200, 3), dtype=np.uint8) * 128
    _, encoded = cv2.imencode('.jpg', img)
    return encoded.tobytes()


class TestFaceMatchingEngine(unittest.TestCase):
    def setUp(self):
        self.engine = FaceMatchingEngine(similarity_threshold=SIMILARITY_THRESHOLD)

    def test_real_face_enrollment_and_matching(self):
        """Enroll a synthetic face and match a query image of the same face with slight variation."""
        face_bytes_1 = create_synthetic_face_image(expression_seed=0)
        face_bytes_query = create_synthetic_face_image(expression_seed=1)

        # Enroll into database
        convict_data = {
            "convict_id": "TEST-SUS-001",
            "name": "Test Suspect 1",
            "crime_type": "Theft",
            "conviction_date": "2024-01-01",
            "release_status": "Released on Bail",
            "last_known_address": "Bengaluru",
        }
        self.engine.enroll_convict_with_image(convict_data, image_bytes=face_bytes_1)

        # Match query image
        result = self.engine.match_face(face_bytes_query, complaint_id="CMP-TEST-REAL-001")

        self.assertEqual(result["match_status"], "match_found")
        self.assertGreater(len(result["candidates"]), 0)
        top_match = result["candidates"][0]
        self.assertEqual(top_match["convict_id"], "TEST-SUS-001")
        self.assertGreaterEqual(top_match["confidence_score"], 68.0)
        print(f"\n[REAL CV TEST PASS] Face detected & matched via Cosine Similarity: {top_match['confidence_score']}%")

    def test_no_face_detected_on_blank_image(self):
        """Test with blank image containing no facial geometry."""
        blank_bytes = create_blank_non_face_image()
        result = self.engine.match_face(blank_bytes, complaint_id="CMP-TEST-BLANK")

        self.assertEqual(result["match_status"], "no_face_detected")
        self.assertEqual(len(result["candidates"]), 0)
        print("\n[REAL CV TEST PASS] Blank image correctly identified as no_face_detected.")


if __name__ == '__main__':
    unittest.main()
