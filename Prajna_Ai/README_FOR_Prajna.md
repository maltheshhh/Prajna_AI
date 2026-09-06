# Prajna AI - Complete Stack & Replacement Guide
**Prepared for: Prakash**
**Version:** 2.0 (Includes Full 5-Photo Convict Database & Biometric Matcher)
**Date:** September 6, 2026

---

## 📌 Executive Summary of What Was Fixed & Added
1. **The 5-Photo Enrolled Convict Database**:
   - Includes the complete 5-convict photo roster (`CONV-001` through `CONV-005`) with high-resolution portraits, full criminal records, FIR history, MO signatures, risk tiers, and ResNet-128 face embeddings.
   - Fully synced across both **Frontend** (`Prajna_Frontend/public/assets/convicts/` + TypeScript database) and **Backend** (`face-matching-service/convict_photos/` + Python matcher & vector index).
2. **Citizen Portal to Police AI Queue Sync**:
   - Fixed the legacy filter bug in `FaceSearchPage.tsx` where citizen reports were being dropped if filenames contained `'screenshot'`.
   - Added persistent file-backed storage (`POST /citizen/report`, `GET /citizen/reports` in `face-matching-service/app.py` -> `citizen_reports.json`).
   - Reduced police queue polling from 30s to 2.5s with instant `window.focus` synchronization on tab switch.
   - Fixed broken images in the police queue table by ensuring Base64 data URLs are maintained with fallback avatars.
3. **WhatsApp Gateway & Strict OTP Flow**:
   - Dedicated microservice in `whatsapp-gateway/` on port `2785` using `whatsapp-web.js`.
   - Strict 6-digit OTP verification (random PINs fail with HTTP 400; only genuine server OTPs or the universal testing PIN `123456` succeed).
   - Removed plaintext OTP displays and auto-paste buttons from citizen UI for proper security compliance.
4. **Routing & Reverse Proxy**:
   - Added `/citizen`, `/citizen/report`, and `/citizen-search` routes in `App.tsx`.
   - Reverse proxies configured in `vite.config.ts` for ports `8000` (FastAPI) and `2785` (WhatsApp Gateway).

---

## 👤 The 5-Photo Enrolled Convict Database: Full Profiles & Details

The biometric face matching engine matches submitted citizen/surveillance photos against this 5-convict roster.

### 1. CONV-001 — Riya Sharma
- **Photo File**: `CONV-001.jpg`
- **Aliases**: Riya
- **Gender**: Female
- **Crime Type**: `[FICTIONAL] House Breaking / Theft`
- **MO Signature**: `[FICTIONAL TEST DATA] Targeted unoccupied residential properties during daytime hours.`
- **Conviction Date**: 2022-06-17
- **Record Status**: Parole (2022-present)
- **Last Known Address**: Shanti Nagar, Ward 14, Lucknow, Uttar Pradesh
- **District / Police Station**: Lucknow / Aliganj Police Station
- **Linked FIRs**: `FIR-184/2020`, `FIR-57/2021`
- **Risk Tier**: Medium
- **Frontend Path**: `/assets/convicts/CONV-001.jpg`
- **Backend Path**: `face-matching-service/convict_photos/CONV-001.jpg`

---

### 2. CONV-002 — Aarav Mehta
- **Photo File**: `CONV-002.jpg`
- **Aliases**: Avi
- **Gender**: Male
- **Crime Type**: `[FICTIONAL] Robbery`
- **MO Signature**: `[FICTIONAL TEST DATA] Operated in pairs and targeted isolated fictional locations.`
- **Conviction Date**: 2021-11-09
- **Record Status**: In Custody (2021-present)
- **Last Known Address**: Azad Nagar, Bhopal, Madhya Pradesh
- **District / Police Station**: Bhopal / Hanumanganj Police Station
- **Linked FIRs**: `FIR-312/2019`, `FIR-88/2020`
- **Risk Tier**: High
- **Frontend Path**: `/assets/convicts/CONV-002.jpg`
- **Backend Path**: `face-matching-service/convict_photos/CONV-002.jpg`

---

### 3. CONV-003 — Kabir Nair
- **Photo File**: `CONV-003.jpg`
- **Aliases**: Kabi
- **Gender**: Male
- **Crime Type**: `[FICTIONAL] Motor Vehicle Theft`
- **MO Signature**: `[FICTIONAL TEST DATA] Targeted motorcycles parked in poorly monitored public areas.`
- **Conviction Date**: 2023-02-14
- **Record Status**: Released on Bail (2023-present)
- **Last Known Address**: Kankarbagh, Patna, Bihar
- **District / Police Station**: Patna / Kankarbagh Police Station
- **Linked FIRs**: `FIR-126/2021`, `FIR-203/2022`, `FIR-19/2023`
- **Risk Tier**: Medium
- **Frontend Path**: `/assets/convicts/CONV-003.jpg`
- **Backend Path**: `face-matching-service/convict_photos/CONV-003.jpg`

---

### 4. CONV-004 — Ananya Iyer
- **Photo File**: `CONV-004.jpg`
- **Aliases**: Anu
- **Gender**: Female
- **Crime Type**: `[FICTIONAL] Fraud / Breach of Trust`
- **MO Signature**: `[FICTIONAL TEST DATA] Obtained money through fictional business representations and false claims.`
- **Conviction Date**: 2020-09-28
- **Record Status**: Parole (2020-present)
- **Last Known Address**: Vijayanagar, Bengaluru, Karnataka
- **District / Police Station**: Bengaluru Urban / Vijayanagar Police Station
- **Linked FIRs**: `FIR-91/2019`, `FIR-44/2020`
- **Risk Tier**: Medium
- **Frontend Path**: `/assets/convicts/CONV-004.jpg`
- **Backend Path**: `face-matching-service/convict_photos/CONV-004.jpg`

---

### 5. CONV-005 — Priya Rao
- **Photo File**: `CONV-005.jpg`
- **Aliases**: Priya
- **Gender**: Female
- **Crime Type**: `[FICTIONAL] Robbery / Theft`
- **MO Signature**: `[FICTIONAL TEST DATA] Targeted fictional commercial locations and pedestrians carrying visible valuables.`
- **Conviction Date**: 2022-12-05
- **Record Status**: Released on Bail (2022-present)
- **Last Known Address**: Mansarovar, Jaipur, Rajasthan
- **District / Police Station**: Jaipur / Mansarovar Police Station
- **Linked FIRs**: `FIR-245/2021`, `FIR-71/2022`
- **Risk Tier**: High
- **Frontend Path**: `/assets/convicts/CONV-005.jpg`
- **Backend Path**: `face-matching-service/convict_photos/CONV-005.jpg`

---

## 📁 Complete Stack Placement & Swapping Directory Map

Extracting this ZIP replaces the necessary files and places the 5-photo database into the exact folders:

```
[PROJECT ROOT]/
│
├── README_FOR_DISHA.md                                <-- Complete deployment & stack guide
├── STACK_INSTRUCTIONS.txt                             <-- Plain text copy of instructions
│
├── whatsapp-gateway/                                  <-- [MICROSERVICE LAYER]
│   ├── server.js                                      <-- WhatsApp Web service on port 2785
│   ├── package.json
│   └── package-lock.json
│
├── face-matching-service/                             <-- [BACKEND LAYER - PORT 8000]
│   ├── app.py                                         <-- [REPLACE] FastAPI with OTP, Citizen API & Matcher
│   ├── requirements.txt                               <-- [REPLACE] FastAPI, Uvicorn, Requests
│   ├── citizen_reports.json                           <-- [DATASTORE] Persistent citizen reports JSON
│   ├── convicts.json                                  <-- [DATABASE] All 5 convict profiles in JSON
│   ├── mock_face_index.json                           <-- [BIOMETRIC INDEX] 128-d ResNet embeddings for CONV-001..005
│   ├── face_matcher.py                                <-- [MATCHER ENGINE] ResNet Euclidean distance matcher
│   ├── seed_convicts.py                               <-- Convict database seeder
│   ├── seed_historical.py                             <-- Historical record seeder
│   └── convict_photos/                                <-- [PHOTO REPOSITORY - BACKEND]
│       ├── CONV-001.jpg                               <-- Riya Sharma photo
│       ├── CONV-002.jpg                               <-- Aarav Mehta photo
│       ├── CONV-003.jpg                               <-- Kabir Nair photo
│       ├── CONV-004.jpg                               <-- Ananya Iyer photo
│       └── CONV-005.jpg                               <-- Priya Rao photo
│
├── Prajna_Frontend/                                   <-- [FRONTEND LAYER - PORT 5173]
│   ├── vite.config.ts                                 <-- [REPLACE] Reverse proxies to 8000 & 2785
│   ├── package.json                                   <-- [REPLACE]
│   ├── public/assets/convicts/                        <-- [PHOTO REPOSITORY - FRONTEND]
│   │   ├── CONV-001.jpg                               <-- Riya Sharma public asset
│   │   ├── CONV-002.jpg                               <-- Aarav Mehta public asset
│   │   ├── CONV-003.jpg                               <-- Kabir Nair public asset
│   │   ├── CONV-004.jpg                               <-- Ananya Iyer public asset
│   │   └── CONV-005.jpg                               <-- Priya Rao public asset
│   └── src/
│       ├── App.tsx                                    <-- [REPLACE] Routes for /citizen & /citizen-search
│       ├── pages/
│       │   └── FaceSearchPage.tsx                     <-- [REPLACE] Queue sync, legacy filter fix, strict OTP
│       ├── utils/
│       │   ├── api.ts                                 <-- [REPLACE] Citizen report routing & fallback
│       │   └── faceMatchingEngine.ts                  <-- [REPLACE] Frontend CIRAS biometric matcher with 5 convicts
│       ├── services/
│       │   └── api.ts                                 <-- [REPLACE] Police & Biometric service endpoints
│       └── data/
│           ├── mockConvicts.ts                        <-- [DATABASE] 5 Convicts TypeScript profile list
│           ├── convicts_10.json                       <-- [DATABASE] 5 Convicts JSON records
│           └── convictEmbeddings.json                 <-- Vector embeddings
│
└── Prajna_Backend/functions/prajna_ai_function/       <-- [SERVERLESS CATALYST LAYER]
    ├── index.js                                       <-- [REPLACE] Catalyst router & CORS
    ├── catalyst-config.json                           <-- [REPLACE]
    └── (companion AI engines)                         <-- aiEngine, analyticsEngine, ciras routes, etc.
```

---

## 🚀 Step-by-Step Setup & Run Instructions

### Step 1: Install Dependencies
Open 3 separate terminals:

1. **WhatsApp Gateway**:
   ```bash
   cd whatsapp-gateway
   npm install
   ```

2. **Python Face Matching & OTP Backend**:
   ```bash
   cd face-matching-service
   pip install -r requirements.txt
   ```

3. **Frontend**:
   ```bash
   cd Prajna_Frontend
   npm install
   ```

---

### Step 2: Start the Services

#### Terminal 1 — WhatsApp Gateway (Port 2785)
```bash
cd whatsapp-gateway
node server.js
```
*(On first run, scan the QR code displayed in your terminal or at `http://localhost:2785/qr` using WhatsApp on your phone under Linked Devices)*

#### Terminal 2 — Python API Server (Port 8000)
```bash
cd face-matching-service
python -m uvicorn app:app --host 127.0.0.1 --port 8000
```

#### Terminal 3 — Vite Frontend (Port 5173)
```bash
cd Prajna_Frontend
npm run dev
```

---

## 🧪 Testing & Verification Steps

### 1. Test Biometric Face Matching Directly
You can run a quick Python verification to test photo matching against the 5-convict database:
```python
import urllib.request, json, os, uuid, http.client

def test_match(photo_path):
    boundary = uuid.uuid4().hex
    fname = os.path.basename(photo_path)
    with open(photo_path, "rb") as f:
        data = f.read()
    body = (f'--{boundary}\r\nContent-Disposition: form-data; name="photo"; filename="{fname}"\r\nContent-Type: image/jpeg\r\n\r\n'.encode()
            + data + f'\r\n--{boundary}--

'.encode())
    conn = http.client.HTTPConnection("127.0.0.1", 8000)
    conn.request("POST", "/match", body=body, headers={"Content-Type": f"multipart/form-data; boundary={boundary}"})
    resp = json.loads(conn.getresponse().read().decode())
    print(resp)

# Test matching CONV-001 (Riya Sharma)
test_match(r"face-matching-service/convict_photos/CONV-001.jpg")
```
*Expected Result:* `match_status: "MATCH_FOUND"`, `matched_person_id: "CONV-001"`, Name: "Riya Sharma", Euclidean distance < 0.55.

---

### 2. Full End-to-End Citizen -> Police Queue Workflow
1. Open Citizen Portal: `http://localhost:5173/citizen`
2. Enter your phone number and request OTP.
3. Check WhatsApp for the PIN (or use testing PIN `123456`).
4. Enter the PIN, upload any photo (e.g. `CONV-001.jpg` or a test picture), enter description and submit.
5. Open Police Portal: `http://localhost:5173/face-search`
6. Look at **Citizen Incident Queue / Recent Reports**:
   - The complaint appears in 2.5 seconds with the photo, suspect description, and citizen phone.
   - Click **Run Biometric Scan** to trigger real-time AI face matching against the 5-photo database!
