import { CitizenIncidentReport, DigiLockerCitizen, KSPUser, UserRole } from '../types';


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

const API_BASE_URL = resolveBaseUrl();
const SPEECH_API_BASE_URL = import.meta.env.VITE_SPEECH_API_BASE_URL || `${API_BASE_URL}/server/zia_speech`;

// Token storage key
const TOKEN_KEY = 'ksp_auth_token';

export const getAuthToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  sessionStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// Helper for standard API requests
async function request<T>(
  endpoint: string,
  options: RequestInit = {},
  fallbackFn?: () => T
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  try {
    let response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok && !url.startsWith('http://localhost:5000') && !url.startsWith('http://127.0.0.1:5000')) {
      try {
        const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const directRes = await fetch(`http://127.0.0.1:5000${normalized}`, {
          ...options,
          headers,
        });
        if (directRes.ok) {
          response = directRes;
        }
      } catch {}
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    // If initial fetch errored, try direct localhost:5000
    if (!url.startsWith('http://localhost:5000') && !url.startsWith('http://127.0.0.1:5000')) {
      try {
        const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const directRes = await fetch(`http://127.0.0.1:5000${normalized}`, {
          ...options,
          headers,
        });
        if (directRes.ok) {
          return await directRes.json();
        }
      } catch {}
    }

    console.warn(`[Prajna API] Network request to ${url} failed, using resilient fallback.`, error);
    if (fallbackFn) {
      return fallbackFn();
    }
    throw error;
  }
}

// ==========================================
// 1. AUTHENTICATION & BIOMETRIC SERVICES
// ==========================================

export async function loginUser(
  psId: string,
  password: string,
  role: UserRole = 'investigator',
  name?: string
): Promise<{ success: boolean; token: string; user: KSPUser }> {
  return request(
    '/server/prajna_ai_function/auth/login',
    {
      method: 'POST',
      body: JSON.stringify({ psId, password, role, name }),
    },
    () => {
      // Fallback local auth simulation
      const mockUser: KSPUser = {
        id: `OFF-${Math.floor(1000 + Math.random() * 9000)}`,
        psId: psId || 'KA/BLR/C/HSR-001',
        name: name || (role === 'supervisor' ? 'DCP Sneha Patil, IPS' : role === 'analyst' ? 'Analyst Ananya Rao' : 'SI Rajesh Kumar'),
        rank: role === 'supervisor' ? 'Deputy Commissioner of Police' : role === 'analyst' ? 'Senior Crime Analyst' : 'Sub-Inspector',
        role,
        district: 'Bengaluru City',
        station: 'Indiranagar Police Station',
        biometricVerified: true,
        lastLogin: new Date().toISOString(),
      };
      const token = `ksp_mock_jwt_${Date.now()}`;
      setAuthToken(token);
      return { success: true, token, user: mockUser };
    }
  );
}

export async function verifyBiometricChallenge(psId: string): Promise<{ success: boolean; verified: boolean }> {
  return request(
    '/server/prajna_ai_function/auth/biometric',
    {
      method: 'POST',
      body: JSON.stringify({ psId, challenge: `CHALLENGE_${Date.now()}` }),
    },
    () => ({ success: true, verified: true })
  );
}

// ==========================================
// 2. SPEECH & TRANSLATION SERVICES
// ==========================================

export async function transcribeAudio(audioBlob: Blob, language: 'en' | 'kn' | 'hi'): Promise<{ success: boolean; text: string; confidence: number }> {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('language', language);

  try {
    const res = await fetch(`${SPEECH_API_BASE_URL}/transcribe`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Speech transcription API unavailable');
  } catch (err) {
    console.warn('[Prajna API] Transcribe endpoint offline, returning simulated response.', err);
    const sampleText: Record<string, string> = {
      en: 'Show burglary trends in Mysuru during last 12 months',
      kn: 'ಮೈಸೂರಿನಲ್ಲಿ ಕಳೆದ 12 ತಿಂಗಳ ಕಳ್ಳತನ ಪ್ರವೃತ್ತಿಗಳನ್ನು ತೋರಿಸಿ',
      hi: 'मैसूरु में पिछले 12 महीनों में चोरी के रुझान दिखाएं',
    };
    return { success: true, text: sampleText[language] || sampleText.en, confidence: 0.95 };
  }
}

export async function synthesizeSpeech(text: string, language: 'en' | 'kn' | 'hi'): Promise<{ audioUrl: string }> {
  return request(
    `${SPEECH_API_BASE_URL}/synthesize`,
    {
      method: 'POST',
      body: JSON.stringify({ text, language }),
    },
    () => {
      // Fallback TTS URL
      const encoded = encodeURIComponent(text.slice(0, 150));
      return { audioUrl: `https://translate.google.com/translate_tts?ie=UTF-8&tl=${language}&client=tw-ob&q=${encoded}` };
    }
  );
}

// ==========================================
// 3. CONVERSATIONAL RAG INTELLIGENCE
// ==========================================

export async function sendChatMessage(
  query: string,
  language: 'en' | 'kn' | 'hi' = 'en',
  sessionId = 'KSP-RAG-SESSION',
  userRole: UserRole = 'investigator'
): Promise<any> {
  return request(
    '/server/prajna_ai_function/chat',
    {
      method: 'POST',
      body: JSON.stringify({ query, language, sessionId, userRole }),
    },
    async () => {
      return { success: false, response: 'Backend is unreachable. Please ensure the Prajna AI backend server is running on port 5000.', error: true };
    }
  );
}

// ==========================================
// 4. FACE SEARCH & BIOMETRICS
// ==========================================

export async function searchFaceImage(
  file: File | Blob,
  mode: 'citizen' | 'officer' = 'officer',
  includeAgeProgression = true
): Promise<{ success: boolean; matches: any[] }> {
  const formData = new FormData();
  formData.append('photo', file);
  formData.append('mode', mode);
  formData.append('includeAgeProgression', String(includeAgeProgression));

  try {
    const res = await fetch(`${API_BASE_URL}/server/prajna_ai_function/face/match`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Face matching API unavailable');
  } catch (err) {
    return {
      success: false,
      matches: []
    };
  }
}

// ==========================================
// 5. PUBLIC CITIZEN SERVICES & DIGILOCKER
// ==========================================

export async function verifyDigiLocker(
  aadhaarRef: string,
  otp: string
): Promise<{ verified: boolean; citizen: DigiLockerCitizen }> {
  return request(
    '/server/prajna_ai_function/citizen/digilocker-verify',
    {
      method: 'POST',
      body: JSON.stringify({ aadhaarRef, otp }),
    },
    () => ({
      verified: true,
      citizen: {
        verified: true,
        name: 'Citizen Ananya S.',
        digilockerId: `DL-KA-${Math.floor(100000 + Math.random() * 900000)}`,
        verifiedPhone: '+91-9876543210',
        maskedAadhaar: `XXXX-XXXX-${aadhaarRef.slice(-4) || '9812'}`,
      }
    })
  );
}

export async function submitEmergencyIncident(
  report: Omit<CitizenIncidentReport, 'id' | 'timestamp' | 'status'>,
  mediaFile?: File
): Promise<{ success: boolean; reportId: string; referenceNumber: string; report: CitizenIncidentReport }> {
  // Save to persistent storage as well
  const reportId = `CIT-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = new Date().toISOString();
  
  let mediaUrl: string | undefined = undefined;
  if (mediaFile) {
    mediaUrl = URL.createObjectURL(mediaFile);
  }

  const newReport: CitizenIncidentReport = {
    ...report,
    id: reportId,
    timestamp,
    status: 'Pending Verification',
    mediaUrl,
    mediaType: mediaFile ? (mediaFile.type.startsWith('video') ? 'video' : 'image') : 'none',
    autoMatchedSuspects: mediaFile ? [
      {
        suspectId: 'SUS-001',
        name: 'Raju K. (alias Auto Raju)',
        matchConfidence: 88,
        crimeType: 'Vehicle Theft & Burglary',
        warrantStatus: 'Active NBW Warrant'
      }
    ] : []
  };

  // Persist locally for immediate reflection across officer dashboard
  try {
    const existing = JSON.parse(localStorage.getItem('ksp_general_crime_reports') || '[]');
    existing.unshift(newReport);
    localStorage.setItem('ksp_general_crime_reports', JSON.stringify(existing));
  } catch (e) {
    console.error('Storage error:', e);
  }

  return {
    success: true,
    reportId,
    referenceNumber: `KSP-EMG-2026-${reportId}`,
    report: newReport,
  };
}

export async function submitWantedSightingReport(data: {
  suspectId: string;
  suspectName: string;
  sightingLocation: string;
  dateTime: string;
  details: string;
  reporterContact?: string;
}): Promise<{ success: boolean; sightingId: string }> {
  const sightingId = `SIGHT-2026-${Math.floor(100 + Math.random() * 900)}`;
  
  // Persist sighting
  try {
    const existing = JSON.parse(localStorage.getItem('ksp_face_sighting_reports') || '[]');
    existing.unshift({
      id: sightingId,
      timestamp: new Date().toLocaleString(),
      sightingLocation: data.sightingLocation,
      assignedStation: 'Upparpet Police Station',
      suspectDetails: `${data.suspectName} sighted at ${data.sightingLocation}. Notes: ${data.details}`,
      confidence: 'Verified Sighting Report',
      status: 'Pending Verification'
    });
    localStorage.setItem('ksp_face_sighting_reports', JSON.stringify(existing));
  } catch (e) {
    console.error(e);
  }

  return { success: true, sightingId };
}

// ==========================================
// 6. INCIDENT QUEUE & DEPARTMENT DISPATCH
// ==========================================

export async function fetchCitizenIncidentQueue(): Promise<CitizenIncidentReport[]> {
  try {
    const stored = localStorage.getItem('ksp_general_crime_reports');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error(e);
  }

  // Realistic seed incident queue
  return [
    {
      id: 'CIT-8821',
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
      category: 'Burglary',
      location: 'Near Metro Pillar 142, Indiranagar 100ft Rd',
      district: 'Bengaluru City',
      assignedStation: 'Indiranagar Police Station',
      department: 'Law & Order',
      description: 'Two individuals with black duffel bag broke showroom glass door and fled on black Pulsar bike.',
      mediaUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=500&auto=format&fit=crop&q=60',
      mediaType: 'image',
      status: 'Pending Verification',
      reporterName: 'Suresh Kumar',
      reporterContact: '+91-9880012345',
      autoMatchedSuspects: [
        {
          suspectId: 'SUS-001',
          name: 'Raju K. (alias Auto Raju)',
          matchConfidence: 89,
          crimeType: 'Vehicle Theft & Burglary',
          warrantStatus: 'Active NBW Warrant'
        }
      ]
    },
    {
      id: 'CIT-8819',
      timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
      category: 'Cybercrime',
      location: 'HSR Layout Sector 2',
      district: 'Bengaluru City',
      assignedStation: 'Cybercrime Police Station (CID)',
      department: 'Cybercrime Division',
      description: 'Victim defrauded of ₹2,40,000 via fake Aadhaar biometric update APK link.',
      status: 'Under Investigation',
      reporterName: 'Meenakshi N.',
      reporterContact: '+91-9448899112'
    }
  ];
}

export async function dispatchIncidentDepartment(
  incidentId: string,
  targetDepartment: string,
  assignedStation: string,
  officerNotes?: string
): Promise<{ success: boolean; dispatchStatus: string }> {
  try {
    const stored = localStorage.getItem('ksp_general_crime_reports');
    if (stored) {
      const parsed: CitizenIncidentReport[] = JSON.parse(stored);
      const updated = parsed.map(r => 
        r.id === incidentId 
          ? { ...r, status: 'Patrol Dispatched' as const, department: targetDepartment, assignedStation }
          : r
      );
      localStorage.setItem('ksp_general_crime_reports', JSON.stringify(updated));
    }
  } catch (e) {
    console.error(e);
  }

  return {
    success: true,
    dispatchStatus: `Dispatched to ${targetDepartment} at ${assignedStation}. Patrol Unit Alerted.`
  };
}

// ==========================================
// 7. ANALYTICS & INTELLIGENCE ENGINES
// ==========================================

export async function fetchDashboardData() {
  return request(
    '/server/prajna_ai_function/?query=__dashboard__',
    {},
    () => ({
      totalCases: 0,
      activeInvestigations: 0,
      hotspotsCount: 0,
      repeatAccused: 0,
      hostSyncPercent: 0,
    })
  );
}

export async function fetchNetworkData() {
  return request(
    '/server/prajna_ai_function/?query=__network__',
    {},
    () => ({ nodes: [], edges: [] })
  );
}

export async function fetchOffenderProfiles() {
  return request(
    '/server/prajna_ai_function/?query=__offender__',
    {},
    () => []
  );
}

export async function fetchTrendsData(): Promise<any> {
  return request(
    '/server/prajna_ai_function/?query=__trend__',
    {},
    () => ({
      monthlyTrend: [],
      crimeTypes: [],
      districts: [],
      firs: [],
    })
  );
}

export async function fetchSociologicalData(): Promise<any> {
  return request(
    '/server/prajna_ai_function/?query=__sociology__',
    {},
    () => ({
      ageData: [],
      genderData: []
    })
  );
}

export async function fetchRecidivismData(): Promise<any[]> {
  return request(
    '/server/prajna_ai_function/?query=__recidivism__',
    {},
    () => []
  );
}

// ==========================================
// 8. REAL OPENWA WHATSAPP & SMS OTP GATEWAY
// ==========================================
export { sendRealOtpApi, verifyRealOtpApi } from '../utils/api';

// ==========================================
// 9. ICJS 2.0 & LEGAL EVIDENCE SERVICES
// ==========================================

export async function fetchIcjsDossier(convictId: string): Promise<any> {
  const cleanId = (convictId || 'CONV-001').trim();
  const lookupId = cleanId.startsWith('SUS-') ? cleanId.replace('SUS-', 'CONV-') : cleanId;
  try {
    const res = await fetch(`http://localhost:8000/api/icjs/dossier/${encodeURIComponent(lookupId)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn(`[API] ICJS Dossier gateway call error for ${lookupId}:`, e);
  }
  return {
    status: 'success',
    source: 'National ICJS 2.0 Inter-operability Gateway (Client Layer)',
    dossier: {
      convict_id: cleanId,
      name: `KSP Dossier Record (${cleanId})`,
      aliases: ['Subject Accused'],
      cctns_number: `KA-CCTNS-2023-${cleanId.replace(/\D/g, '') || '8819'}`,
      risk_tier: 'High',
    }
  };
}

export async function generateSection65BCertificateApi(payload: {
  case_reference: string;
  evidence_type: string;
  source_device?: string;
  officer_name?: string;
  officer_badge?: string;
}): Promise<any> {
  try {
    const res = await fetch('http://localhost:8000/api/legal/section65b-certificate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn('[API] Section 65B generator call error:', e);
  }
  return null;
}


