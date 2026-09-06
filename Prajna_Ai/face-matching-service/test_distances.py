import face_recognition
import numpy as np
import os

path = r'c:\Users\anshv\OneDrive\Desktop\KSP\photos'

# Load DB embeddings
db = {}
names = {1:'Allu Arjun', 2:'Surya', 3:'Vijay', 4:'Prabhas', 5:'Rajinikanth',
         6:'Yash', 7:'SRK', 8:'Akshay', 9:'Shivanna', 10:'Salman'}

for i in range(1, 11):
    img = face_recognition.load_image_file(os.path.join(path, f'Convict_{i}.jpg.png'))
    encs = face_recognition.face_encodings(img)
    if encs:
        db[i] = encs[0]

# Print close pairwise distances
print('=== Cross-person distances below 0.6 (should all be > 0.5 for safety) ===')
for i in range(1, 11):
    for j in range(i+1, 11):
        d = float(np.linalg.norm(db[i] - db[j]))
        if d < 0.6:
            tag = ' *** DANGEROUSLY CLOSE ***' if d < 0.5 else ''
            print(f'  {names[i]} vs {names[j]}: {d:.4f}{tag}')

# Test unknown person from user screenshot
print()
print('=== Unknown person (from user screenshot - should NOT match anyone) ===')
unknown_path = r'C:\Users\anshv\.gemini\antigravity\brain\26fe278a-0963-4758-a216-854908cd1d71\.user_uploaded\media_1787933898529.png'
unknown = face_recognition.load_image_file(unknown_path)
u_encs = face_recognition.face_encodings(unknown)
if u_encs:
    dists = []
    for i in range(1, 11):
        d = float(np.linalg.norm(u_encs[0] - db[i]))
        tag = 'MATCH' if d < 0.5 else 'no match'
        dists.append((d, names[i]))
        print(f'  Unknown vs {names[i]}: {d:.4f} -> {tag}')
    dists.sort()
    print(f'\n  Closest: {dists[0][1]} at {dists[0][0]:.4f}')
    print(f'  With threshold 0.5: {"FALSE POSITIVE!" if dists[0][0] < 0.5 else "Correctly rejected"}')
else:
    print('  No face detected in unknown image')
