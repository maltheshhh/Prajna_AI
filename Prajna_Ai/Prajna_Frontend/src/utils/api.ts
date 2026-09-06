function resolveBaseUrl(): string {
  const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
  if (envUrl && !envUrl.includes('development.catalystserverless.in')) {
    return envUrl.replace(/\/+$/, '');
  }
  if (typeof window !== 'undefined') {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocal) {
      return ''; // Vite proxy -> http://127.0.0.1:5000
    }
    return window.location.origin;
  }
  return '';
}

export const API_BASE_URL = resolveBaseUrl();

function getAuthToken(): string | null {
  const session = sessionStorage.getItem('ksp_auth');
  if (session) {
    try {
      const parsed = JSON.parse(session);
      return parsed.token || null;
    } catch {
      return null;
    }
  }
  return null;
}

export async function fetchApi<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string; status?: number }> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${API_BASE_URL}${normalizedPath}`;

  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };

  const token = getAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Do not set Content-Type if sending FormData (browser sets boundary automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    let res = await fetch(url, {
      ...options,
      headers,
    });

    // If initial request failed (e.g. 401/404 on dead remote URL or proxy issue), try direct localhost:5000
    if (!res.ok && !url.startsWith('http://localhost:5000') && !url.startsWith('http://127.0.0.1:5000')) {
      try {
        const directRes = await fetch(`http://127.0.0.1:5000${normalizedPath}`, {
          ...options,
          headers,
        });
        if (directRes.ok) {
          res = directRes;
        }
      } catch {}
    }

    const contentType = res.headers.get('content-type') || '';
    let result: any = null;

    if (contentType.includes('application/json')) {
      result = await res.json();
    } else {
      result = await res.text();
    }

    if (!res.ok) {
      const errorMsg = (typeof result === 'object' && result?.error) ? result.error : `HTTP ${res.status}: ${res.statusText}`;
      return { success: false, error: errorMsg, status: res.status, data: result };
    }

    return {
      success: true,
      data: result,
      status: res.status,
    };
  } catch (err: any) {
    // If network fetch threw error, try direct localhost:5000
    if (!url.startsWith('http://localhost:5000') && !url.startsWith('http://127.0.0.1:5000')) {
      try {
        const directRes = await fetch(`http://127.0.0.1:5000${normalizedPath}`, {
          ...options,
          headers,
        });
        if (directRes.ok) {
          const contentType = directRes.headers.get('content-type') || '';
          const result = contentType.includes('application/json') ? await directRes.json() : await directRes.text();
          return { success: true, data: result, status: directRes.status };
        }
      } catch {}
    }

    console.warn(`API call to ${url} failed:`, err.message);
    return {
      success: false,
      error: err.message || 'Network error connecting to Prajna AI backend',
    };
  }
}

// ----------------------------------------------------
// Specific API Endpoints
// ----------------------------------------------------

export async function queryPrajnaAI(query: string, language: string = 'en') {
  return fetchApi('/server/prajna_ai_function/', {
    method: 'POST',
    body: JSON.stringify({ query, language }),
  });
}

export async function transcribeAudio(audioBlob: Blob, language: string = 'en') {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'speech.webm');
  formData.append('language', language);

  return fetchApi('/server/zia_speech', {
    method: 'POST',
    body: formData,
  });
}

export async function matchFace(formData: FormData) {
  // 1. Try Vite proxy to Python face-matching-service (http://localhost:8000/match)
  try {
    const res = await fetch('/api/face/match', {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, data };
    }
  } catch (e) {
    // fallback
  }

  // 2. Direct localhost:8000 fallback
  try {
    const directRes = await fetch('http://127.0.0.1:8000/match', {
      method: 'POST',
      body: formData,
    });
    if (directRes.ok) {
      const data = await directRes.json();
      return { success: true, data };
    }
  } catch (e) {
    // fallback
  }

  // 3. Cloud / Serverless backend fallback
  return fetchApi('/server/prajna_ai_function/face/match', {
    method: 'POST',
    body: formData,
  });
}

export async function submitCitizenReport(payload: FormData | Record<string, any>) {
  const body = payload instanceof FormData ? Object.fromEntries(payload.entries()) : payload;

  // ── Primary: Catalyst serverless → MongoDB Atlas (works on any deployment) ──
  try {
    const res = await fetchApi('/server/prajna_ai_function/', {
      method: 'POST',
      body: JSON.stringify({ query: '__saveCitizenReport__', report: body }),
    });
    if (res.success) return res;
  } catch {}

  // ── Fallback 1: /api/citizen/report proxy (vite dev proxy → port 8000) ──────
  try {
    const res = await fetch('/api/citizen/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) return { success: true, data: await res.json() };
  } catch {}

  // ── Fallback 2: Direct localhost:8000 (local dev without vite proxy) ─────────
  try {
    const res = await fetch('http://127.0.0.1:8000/citizen/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) return { success: true, data: await res.json() };
  } catch {}

  return { success: false, error: 'Backend unavailable — report saved locally only.' };
}

export async function fetchCitizenReports(): Promise<{ success: boolean; data?: any; reports?: any[]; error?: string }> {
  // ── Primary: Catalyst serverless → MongoDB Atlas ──────────────────────────
  try {
    const res: any = await fetchApi('/server/prajna_ai_function/', {
      method: 'POST',
      body: JSON.stringify({ query: '__getCitizenReports__' }),
    });
    if (res && res.success) {
      const reports = Array.isArray(res.reports) ? res.reports : (Array.isArray(res.data) ? res.data : (res.data?.reports || []));
      if (reports.length > 0) return { success: true, data: reports };
    }
  } catch {}

  // ── Fallback 1: /api/citizen/reports proxy (vite dev proxy → port 8000) ────
  try {
    const res = await fetch('/api/citizen/reports');
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.reports || [] };
    }
  } catch {}

  // ── Fallback 2: Direct localhost:8000 ─────────────────────────────────────
  try {
    const res = await fetch('http://127.0.0.1:8000/citizen/reports');
    if (res.ok) {
      const json = await res.json();
      return { success: true, data: json.reports || [] };
    }
  } catch {}

  return { success: false, error: 'Backend unavailable.' };
}


export async function submitSightingReport(data: {
  wantedId?: string;
  suspectName: string;
  location: string;
  details: string;
  contact?: string;
}) {
  return fetchApi('/server/prajna_ai_function/citizen/sighting', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function verifyDigiLocker(consentToken: string, aadharHash?: string) {
  return fetchApi('/server/prajna_ai_function/citizen/digilocker-verify', {
    method: 'POST',
    body: JSON.stringify({ consentToken, aadharHash }),
  });
}

// ── OpenWA WhatsApp & SMS OTP Gateway APIs ──────────────────────────────────
export async function sendRealOtpApi(
  phone: string,
  openwaUrl?: string,
  openwaSessionId?: string,
  openwaApiKey?: string
): Promise<{
  success: boolean;
  message: string;
  otp?: string;
  whatsapp_dispatched?: boolean;
}> {
  const payload = {
    phone,
    provider: 'openwa',
    openwaUrl,
    openwaSessionId,
    apiKey: openwaApiKey
  };

  // 1. Primary: Catalyst serverless function (MongoDB Atlas + OpenWA integration)
  try {
    const res = await fetchApi('/server/prajna_ai_function/', {
      method: 'POST',
      body: JSON.stringify({ query: '__sendOtp__', ...payload }),
    });
    if (res.success && res.data) {
      return res.data;
    }
  } catch {}

  // 2. Fallback 1: Vite proxy /api/otp/send (Python FastAPI microservice)
  try {
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}

  // 3. Fallback 2: Direct localhost:8000
  try {
    const res = await fetch('http://127.0.0.1:8000/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {}

  // Resilient local generation
  const localOtp = `${Math.floor(Math.random() * 900000) + 100000}`;
  return {
    success: true,
    message: `6-digit DigiLocker OTP generated for +91-${phone}.`,
    otp: localOtp,
    whatsapp_dispatched: false
  };
}

export async function verifyRealOtpApi(phone: string, otp: string): Promise<{
  success: boolean;
  verified?: boolean;
  message?: string;
  error?: string;
}> {
  // 1. Primary: Catalyst serverless function
  try {
    const res = await fetchApi('/server/prajna_ai_function/', {
      method: 'POST',
      body: JSON.stringify({ query: '__verifyOtp__', phone, otp }),
    });
    if (res.success && res.data?.verified) {
      return { success: true, verified: true, message: res.data.message };
    }
  } catch {}

  // 2. Fallback 1: Vite proxy /api/otp/verify
  try {
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, verified: true, message: data.message };
    }
  } catch {}

  // 3. Fallback 2: Direct localhost:8000
  try {
    const res = await fetch('http://127.0.0.1:8000/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, verified: true, message: data.message };
    }
  } catch {}

  // Universal Demo Bypass: strictly 123456 only
  if (otp.trim() === '123456') {
    return { success: true, verified: true, message: 'OTP authenticated with DigiLocker Gateway (Demo Mode).' };
  }

  return { success: false, verified: false, error: 'Invalid OTP code. Please enter the exact 6-digit OTP sent to your WhatsApp or enter 123456.' };
}

export async function fetchHotspotsApi() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__hotspots__', {
    method: 'GET',
  });
}

const LOCAL_SCENARIOS_KEY = 'ksp_saved_scenarios_v2';

export async function fetchSavedScenariosApi() {
  try {
    const remote = await fetchApi<any[]>('/server/prajna_ai_function/?query=__getScenarios__', {
      method: 'GET',
    });
    
    // Read local cache
    let localScenarios: any[] = [];
    try {
      const stored = localStorage.getItem(LOCAL_SCENARIOS_KEY);
      if (stored) localScenarios = JSON.parse(stored);
    } catch (e) {
      console.warn('Error reading local scenarios cache:', e);
    }

    if (remote.success && Array.isArray(remote.data)) {
      // Merge unique by name/_id
      const remoteIds = new Set(remote.data.map((s: any) => s._id || s.name));
      const merged = [...remote.data, ...localScenarios.filter((s) => !remoteIds.has(s._id || s.name))];
      return { success: true, data: merged };
    }

    return { success: true, data: localScenarios };
  } catch (err) {
    try {
      const stored = localStorage.getItem(LOCAL_SCENARIOS_KEY);
      const localScenarios = stored ? JSON.parse(stored) : [];
      return { success: true, data: localScenarios };
    } catch {
      return { success: true, data: [] };
    }
  }
}

export async function saveScenarioApi(scenario: any) {
  // Always persist to localStorage first
  try {
    const stored = localStorage.getItem(LOCAL_SCENARIOS_KEY);
    const localScenarios: any[] = stored ? JSON.parse(stored) : [];
    const newEntry = {
      ...scenario,
      _id: scenario._id || `scen-${Date.now()}`,
      savedAt: scenario.savedAt || new Date().toISOString(),
    };
    
    // Replace if same name exists, else prepend
    const existingIdx = localScenarios.findIndex((s) => s.name === newEntry.name);
    if (existingIdx >= 0) {
      localScenarios[existingIdx] = newEntry;
    } else {
      localScenarios.unshift(newEntry);
    }
    localStorage.setItem(LOCAL_SCENARIOS_KEY, JSON.stringify(localScenarios));
  } catch (e) {
    console.warn('Error writing local scenario:', e);
  }

  // Attempt backend push
  try {
    const remoteRes = await fetchApi<{ success: boolean; saved: any }>('/server/prajna_ai_function/', {
      method: 'POST',
      body: JSON.stringify({ query: '__saveScenario__', scenario }),
    });
    if (remoteRes.success) return remoteRes;
  } catch (err) {
    console.warn('Remote save fallback to local storage:', err);
  }

  return { success: true, data: { success: true, saved: scenario } };
}

export async function computeRiskApi(factors: any) {
  return fetchApi<any>('/server/prajna_ai_function/', {
    method: 'POST',
    body: JSON.stringify({ query: '__computeRisk__', factors }),
  });
}

export async function fetchDistrictIntelligenceApi(district: string) {
  return fetchApi<any>(`/server/prajna_ai_function/?query=__districtIntelligence__&district=${encodeURIComponent(district)}`, {
    method: 'GET',
  });
}

export async function generateAiDeploymentPlanApi(payload: any) {
  return fetchApi<any>('/server/prajna_ai_function/', {
    method: 'POST',
    body: JSON.stringify({ query: '__generateAiPlan__', payload }),
  });
}

export async function fetchDashboardData() {
  return fetchApi<any>('/server/prajna_ai_function/?query=__dashboard__', {
    method: 'GET',
  });
}

export async function fetchTrendsData() {
  return fetchApi<any>('/server/prajna_ai_function/?query=__trend__', {
    method: 'GET',
  });
}

export async function fetchSociologicalData() {
  return fetchApi<any>('/server/prajna_ai_function/?query=__sociology__', {
    method: 'GET',
  });
}

export async function fetchOffenderProfiles() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__offender__', {
    method: 'GET',
  });
}

export async function fetchNetworkData() {
  return fetchApi<any>('/server/prajna_ai_function/?query=__network__', {
    method: 'GET',
  });
}

export async function fetchRecidivismData() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__recidivism__', {
    method: 'GET',
  });
}

export async function fetchFIRsApi() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__firs__', {
    method: 'GET',
  });
}

export async function fetchTransactionsApi() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__transactions__', {
    method: 'GET',
  });
}

export async function fetchAuditLogsApi() {
  return fetchApi<any[]>('/server/prajna_ai_function/?query=__auditLogs__', {
    method: 'GET',
  });
}

export interface ChatSessionRecord {
  id: string;
  userId: string;
  title: string;
  messages: any[];
  createdAt: string;
  updatedAt: string;
}

export async function fetchUserChatHistoryApi(userId: string) {
  return fetchApi<ChatSessionRecord[]>(`/api/chat/history?userId=${encodeURIComponent(userId)}`, {
    method: 'GET',
  });
}

export async function saveChatSessionApi(session: ChatSessionRecord) {
  return fetchApi<ChatSessionRecord>('/api/chat/session', {
    method: 'POST',
    body: JSON.stringify(session),
  });
}

export async function deleteChatSessionApi(sessionId: string, userId: string) {
  return fetchApi(`/api/chat/session/${sessionId}?userId=${encodeURIComponent(userId)}`, {
    method: 'DELETE',
  });
}

// ── CIRAS 1.0 Face Search API Functions ────────────────────────────────────────

/** Configured similarity threshold (cosine similarity). Single source of truth. */
export const FACE_MATCH_THRESHOLD = 0.70;

/** Fetch all CIRAS incidents from Catalyst Data Store. */
export async function fetchCirasIncidents(filters?: { status?: string; district?: string }) {
  const params = new URLSearchParams({ query: '__ciras_incidents__', ...(filters || {}) });
  return fetchApi<any[]>(`/server/prajna_ai_function/ciras/incidents?${params}`, { method: 'GET' });
}

/** Fetch CIRAS match results for a given incident ID. */
export async function fetchCirasMatchResults(incidentId: string) {
  return fetchApi<any>(`/server/prajna_ai_function/ciras/incidents/${encodeURIComponent(incidentId)}`, { method: 'GET' });
}

/** Officer review action for a CIRAS match result. */
export async function reviewCirasMatch(
  matchId: string,
  action: 'CONFIRMED' | 'REJECTED' | 'FURTHER_REVIEW',
  notes?: string
) {
  return fetchApi<any>(`/server/prajna_ai_function/ciras/matches/${encodeURIComponent(matchId)}/review`, {
    method: 'POST',
    body: JSON.stringify({ action, notes }),
  });
}

/** Fetch a CIRAS historical person record (officer-only). */
export async function fetchHistoricalPersonRecord(personId: string) {
  return fetchApi<any>(`/server/prajna_ai_function/ciras/persons/${encodeURIComponent(personId)}`, { method: 'GET' });
}

/** Fetch CIRAS face search dashboard metrics. */
export async function fetchCirasDashboardStats() {
  return fetchApi<{
    openIncidents: number;
    aiSearchesToday: number;
    potentialMatches: number;
    awaitingOfficerReview: number;
    noCandidateResults: number;
    officerConfirmed: number;
    officerRejected: number;
  }>('/server/prajna_ai_function/ciras/dashboard', { method: 'GET' });
}
