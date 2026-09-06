# Prajna-AI (ಪ್ರಜ್ಞಾ-AI)

**AI Copilot & Biometrics platform for the Karnataka State Police**

Prajna-AI turns raw FIR records and case data into instant, conversational crime intelligence for officers — searchable in English, Kannada, or Hindi — backed by a retrieval-grounded LLM pipeline that never invents facts.

---

## What it does

Instead of manually digging through case files, an officer can ask Prajna-AI a question in plain language:

> "Show vehicle theft cases in Bengaluru"
> "What are the crime trends this year?"
> "Who are the known repeat offenders in this district?"

The system detects intent, extracts entities (district, crime type, status, FIR number, etc.), queries live FIR data in MongoDB, and hands the retrieved records to an LLM that is explicitly constrained to answer **only** from that data — no invented FIR numbers, statistics, or case details.

## Key Features

| Module | Description |
|---|---|
| **Conversational Crime Intelligence** | RAG-based chatbot grounded in real FIR data, multilingual (EN/KN/HI), voice input support |
| **Dashboard** | At-a-glance case load, active investigations, hotspots, and repeat-offender stats |
| **Real-Time Crime Center (RTCC)** | Live operational overview |
| **Hotspot Intelligence** | Geographic crime clustering on an interactive Karnataka map |
| **Offender Profiling** | Suspect/offender profiles built from linked FIRs |
| **Network Analysis** | Criminal network graph — associates, gangs, linked cases |
| **Trends & Analytics** | Monthly trends, crime-type breakdowns, district comparisons |
| **Sociological Insights** | Age/gender demographic analysis of accused and victims |
| **Recidivism Engine** | Repeat-offense risk scoring |
| **Predictive Insights / Forecasting & Alerts** | Forward-looking risk and hotspot forecasting |
| **Financial Analysis** | Mule-account/transaction network visualization |
| **AI Face Search & Suspect Identification** | Biometric face matching against a convict database |
| **NAFIS Fingerprint Matcher** | Fingerprint-based identification workflow |
| **Operational Simulation / AI Tactical Commander** | Scenario planning and tactical recommendations |
| **Decision Support / Explainable AI** | Reasoning transparency for AI-assisted decisions |
| **Reports & Audit / Governance** | Audit log tracking and compliance oversight |
| **Citizen Services** | Citizen incident reporting, DigiLocker verification, wanted-sighting reports |
| **User Management & Role-Based Access** | Investigator / Analyst / Supervisor roles |

## Architecture

```
┌─────────────────┐      ┌───────────────────────┐      ┌──────────────┐
│  React Frontend  │─────▶│  Catalyst Advanced I/O │─────▶│  MongoDB     │
│  (Vite + TS)     │ /server proxy│  Function (Node 18)   │      │  Atlas       │
└─────────────────┘      └───────────┬───────────┘      └──────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
             Intent Detector   Entity Extractor    Query/Filter Builder
                    │                 │                 │
                    └─────────────────┴─────────────────┘
                                      │
                                      ▼
                         Analytics + Context Builder
                                      │
                                      ▼
                    QuickML (GLM) — grounded LLM response
                                      │
                                      ▼
                              Frontend chat UI
```

A separate **Python face-matching microservice** (`face-matching-service/`) and a **Zoho Zia speech function** (`zia_speech`) handle biometric search and voice transcription respectively.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, React Router, Recharts, Leaflet (maps), jsPDF, html2canvas

**Backend:** Node.js 18, Zoho Catalyst (Advanced I/O serverless functions), MongoDB Atlas

**AI / ML:** Zoho QuickML (GLM) for conversational intelligence, custom face-matching service (Python)

**Infra:** Zoho Catalyst Cloud Scale (API Gateway, Authentication/Whitelisting, Data Store)

## Project Structure

```
Prajna_AI/
├── Prajna_Frontend/           # React + Vite SPA
│   ├── src/
│   │   ├── components/        # chat, charts, maps, biometrics, network, etc.
│   │   ├── pages/              # one page per feature module
│   │   ├── services/api.ts     # backend API client
│   │   ├── utils/api.ts        # low-level fetch helper (proxy-aware)
│   │   └── context/             # Auth, Language, Toast providers
│   └── vite.config.ts          # dev-server proxy → Catalyst backend
│
├── Prajna_Backend/
│   ├── functions/
│   │   ├── prajna_ai_function/  # main RAG pipeline (Advanced I/O)
│   │   │   ├── index.js          # request entrypoint
│   │   │   ├── intentDetector.js
│   │   │   ├── entityExtractor.js
│   │   │   ├── executeQuery.js   # MongoDB filter + query
│   │   │   ├── analyticsEngine.js
│   │   │   ├── responseGenerator.js
│   │   │   ├── aiEngine.js       # QuickML integration
│   │   │   ├── offenderEngine.js / networkEngine.js / trendEngine.js / hotspotEngine.js / riskEngine.js / scenarioEngine.js
│   │   │   └── db.js             # MongoDB connection (+ in-memory fallback)
│   │   └── zia_speech/          # speech-to-text function
│   └── catalyst.json
│
└── face-matching-service/      # Python face recognition microservice
```

## Getting Started

### Prerequisites
- Node.js 18+
- A Zoho Catalyst project (Cloud Scale) with a MongoDB Atlas cluster
- Python 3.12 (only if running the face-matching service locally)

### 1. Frontend

```bash
cd Prajna_Frontend
npm install
cp .env.example .env   # fill in values, or leave VITE_API_BASE_URL empty to use the dev proxy
npm run dev
```

### 2. Backend (Catalyst function)

The backend runs as a Zoho Catalyst Advanced I/O function. To deploy:

```bash
cd Prajna_Backend
npm install -g zcatalyst-cli   # if not already installed
catalyst login
catalyst deploy
```

Configure these environment variables in the **Catalyst Console** (Settings → Environment Variables) for your project/environment:

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PROJECT_ID` | Catalyst project ID |
| `ORG_ID` | Catalyst org ID |
| `CLIENT_ID` / `CLIENT_SECRET` / `REFRESH_TOKEN` | Zoho OAuth credentials for QuickML (from api-console.zoho.in) |

Also confirm in **API Gateway** that the deployed function's API has **Authentication: No Authentication** and, if calling from `localhost` during development, that your dev origin is added under **Authentication → Whitelisting → Authorized Domains** with CORS enabled.

### 3. Face-matching microservice (optional, local dev)

```bash
cd Prajna_Backend/face-matching-service
pip install -r requirements.txt
python app.py
```

## Environment Variables (Frontend)

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Backend base URL. Leave empty for local dev (uses Vite's `/server` proxy); set to the deployed Catalyst URL for direct/production use. |
| `VITE_SPEECH_API_BASE_URL` | Speech-to-text function endpoint |
| `VITE_FACE_MATCHING_URL` | Face-matching microservice URL (defaults to local proxy at `127.0.0.1:8000`) |
| `VITE_ENABLE_MOCK_FALLBACK` | Whether UI components fall back to mock data when the backend is unreachable |

## Data Grounding

All conversational responses are generated **only** from FIR records actually retrieved from MongoDB for the current query. If no records match, the system states that plainly rather than fabricating an answer — this is enforced in the LLM system prompt in `aiEngine.js` and the context passed by `responseGenerator.js`.

## Multi-language Support

The chatbot and reports support English, Kannada (ಕನ್ನಡ), and Hindi (हिन्दी), including full report generation and UI translation.

## Built For

Karnataka State Police (KSP) — developed as part of the KSP Datathon by Team BITHEADS.

---

*This README reflects the current state of the codebase. For architecture decisions and setup troubleshooting, see inline comments in `db.js`, `aiEngine.js`, and `vite.config.ts`.*
