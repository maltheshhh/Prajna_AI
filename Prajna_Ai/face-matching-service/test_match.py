import sys
sys.path.insert(0, '.')
from face_matcher import FaceMatchingEngine

engine = FaceMatchingEngine()
print("Loaded convicts:", len(engine.convicts_db))

base = "c:/Users/anshv/Documents/antigravity/elegant-hubble/Prajna_AI/Prajna_Frontend/public/assets/convicts/"

tests = [
    ("Convict_1.jpg", "CONV-001 Allu Arjun"),
    ("Convict_4.jpg", "CONV-004 Prabhas"),
    ("Convict_7.jpg", "CONV-007 SRK"),
]

for fname, label in tests:
    with open(base + fname, "rb") as f:
        data = f.read()
    result = engine.match_face(data)
    status = result.get("match_status")
    cands = result.get("candidates", [])
    if cands:
        top = cands[0]
        name = top["name"]
        dist = top["distance"]
        conf = top["confidence_score"]
        print(f"INPUT={label} -> MATCHED={name} dist={dist} conf={conf}%")
    else:
        closest = result.get("closest_distance", "?")
        print(f"INPUT={label} -> NO MATCH (closest_dist={closest})")
