import requests
import os

endpoint = 'http://localhost:8000/match'
path = os.path.join(os.path.dirname(__file__), 'convict_photos')

print('=== Test 1: All 10 convicts should MATCH themselves ===')
all_pass = True
for i in range(1, 11):
    f = f'Convict_{i}.jpg'
    file_path = os.path.join(path, f)
    if not os.path.exists(file_path):
        f = f'Convict_{i}.png'
        file_path = os.path.join(path, f)
    res = requests.post(endpoint, files={'photo': open(file_path, 'rb')}).json()
    expected_id = f'CONV-{i:03d}'

    if res['match_status'] == 'match_found' and res['candidates']:
        top = res['candidates'][0]
        cid = top['convict_id']
        cname = top['name']
        cscore = top['confidence_score']
        status = 'PASS' if cid == expected_id else 'FAIL'
        if status == 'FAIL':
            all_pass = False
        print(f'  [{status}] {f} -> {cname} ({cid}) conf={cscore}%')
    else:
        all_pass = False
        print(f'  [FAIL] {f} -> NO MATCH')

print(f'\nResult: {"ALL 10 PASSED" if all_pass else "SOME FAILED"}')

print()
print('=== Test 2: Unknown non-face image should NOT match ===')
import io, numpy as np, cv2
blank_img = np.ones((200, 200, 3), dtype=np.uint8) * 128
_, encoded = cv2.imencode('.jpg', blank_img)
res = requests.post(endpoint, files={'photo': ('blank.jpg', encoded.tobytes(), 'image/jpeg')}).json()
print(f'  Status: {res["match_status"]}')
if res['match_status'] in ['no_match', 'no_face_detected']:
    print(f'  CORRECT! Non-face/unknown image correctly rejected.')
else:
    print(f'  False Positive: {res}')
