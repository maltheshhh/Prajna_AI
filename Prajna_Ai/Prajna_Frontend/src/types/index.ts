// ===== USER & AUTH =====
export type UserRole = 'investigator' | 'analyst' | 'supervisor' | 'policymaker';

export interface KSPUser {
  id: string;
  psId: string;             // Police Station ID e.g. "KA/BLR/C/HSR-001"
  name: string;
  rank: string;              // e.g. "Sub-Inspector", "Inspector", "SP"
  role: UserRole;
  district: string;
  station: string;
  biometricVerified: boolean;
  lastLogin: string;         // ISO date
  profilePhoto?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: KSPUser | null;
  role: UserRole | null;
  login: (psId: string, password: string, role?: UserRole, name?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

// ===== FIR RECORDS =====
export interface FIRRecord {
  id: string;
  firNumber: string;         // e.g. "0120/2026"
  district: string;
  policeStation: string;
  dateOfOffence: string;     // ISO date
  dateOfRegistration: string;// ISO date
  crimeType: string;         // e.g. "Theft", "Robbery", "Cybercrime"
  actsAndSections: string[]; // e.g. ["Sec 379 IPC", "Sec 303 BNS"]
  modusOperandi: string;     // detailed MO description
  complainantName: string;
  accusedNames: string[];
  victimNames: string[];
  status: 'open' | 'under_investigation' | 'chargesheeted' | 'closed' | 'convicted';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    latitude: number;
    longitude: number;
    address: string;
    beat: string;
    circle: string;
  };
  summary: string;
  ioName: string;            // Investigation Officer
  linkedFIRs?: string[];
}

// ===== SUSPECT / ACCUSED =====
export interface SuspectProfile {
  id: string;
  name: string;
  aliases: string[];
  age: number;
  gender: 'male' | 'female' | 'other';
  photoUrl?: string;
  aadharHash?: string;
  district: string;
  knownAddresses: string[];
  linkedFIRs: string[];
  moSignature: string;
  riskTier: 'high' | 'medium' | 'low';
  totalCases: number;
  isRepeatOffender: boolean;
  lastKnownActivity: string;
  associateIds: string[];
  financialAccounts?: string[];
}

// ===== CRIMINAL NETWORK =====
export interface NetworkNode {
  id: string;
  label: string;
  type: 'suspect' | 'victim' | 'location' | 'vehicle' | 'phone' | 'account' | 'case';
  riskTier?: 'high' | 'medium' | 'low';
  metadata?: Record<string, string>;
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  relationship: string;      // "co-accused", "shared-location", "financial-link", "phone-contact", "same-vehicle", "family"
  weight: number;            // 0–1 confidence
  caseId?: string;
  metadata?: Record<string, string>;
}

export interface NetworkGraphData {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
}

// ===== HOTSPOT / MAP =====
export interface HotspotDataPoint {
  id: string;
  latitude: number;
  longitude: number;
  district: string;
  taluk: string;
  crimeType: string;
  count: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  trend: 'increasing' | 'stable' | 'decreasing';
  period: string;
}

// ===== RECIDIVISM =====
export interface RecidivismScore {
  suspectId: string;
  suspectName: string;
  riskScore: number;         // 0–100
  predictedCrimeType: string;
  predictedTimeline: string;
  predictedZone: string;
  triggerFactors: string[];
  lastUpdated: string;
}

// ===== FINANCIAL LINKS =====
export interface FinancialTransaction {
  id: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  date: string;
  suspicious: boolean;
  linkedSuspectIds: string[];
  transactionType: 'transfer' | 'withdrawal' | 'deposit' | 'structured';
}

// ===== CHAT =====
export interface ChatAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document' | 'other';
  mimeType: string;
  size: number;
  dataUrl?: string;
  extractedText?: string;
}

export interface SuspectMatchCardData {
  convict_id: string;
  name: string;
  aliases: string[];
  photo_url: string;
  crime_type: string;
  mo_signature: string;
  police_station: string;
  district: string;
  risk_tier: string;
  reward?: string;
  release_status?: string;
  last_known_address?: string;
  linked_firs: string[];
  confidence: number;
  distanceScore?: number;
  uploadedPhotoUrl?: string;
  biometricVector?: {
    orbitalRatio: string;
    nasalCurvature: string;
    jawlineEmbedding: string;
    distanceScore: string;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  language: 'en' | 'kn' | 'hi';
  citations?: FIRCitation[];
  charts?: ChartData[];
  confidence?: number;
  auditId?: string;
  attachments?: ChatAttachment[];
  suspectMatch?: SuspectMatchCardData;
  action?: {
    label: string;
    path: string;
    state?: any;
  };
}

export interface FIRCitation {
  firNumber: string;
  policeStation: string;
  relevanceScore: number;
}

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'heatmap' | 'table';
  title: string;
  data: Record<string, any>[];
}

// ===== FACE SEARCH =====
export interface FaceSearchResult {
  matchId: string;
  suspectId: string;
  suspectName: string;
  confidence: number;
  matchBasis: string;
  databasePhotoYear: number;
  uploadedPhotoUrl: string;
  matchedPhotoUrl: string;
  status: 'strong_match' | 'possible_match' | 'no_match';
}

export interface FaceSearchHistoryRecord {
  id: string;
  investigatorId: string;
  investigatorName: string;
  investigatorPsId: string;
  investigatorRank?: string;
  timestamp: string;
  formattedDate: string;
  fileName: string;
  fileSize?: string;
  previewUrl: string;
  status: 'MATCH_FOUND' | 'NO_MATCH' | 'ERROR';
  confidence?: number;
  distanceScore?: number;
  matchedConvict?: {
    convict_id: string;
    name: string;
    aliases?: string[];
    crime_type: string;
    district?: string;
    police_station?: string;
    photo_url: string;
    release_status?: string;
    mo_signature?: string;
    reward?: string;
    last_known_address?: string;
    risk_tier?: string;
  } | null;
  statusDescription: string;
  biometricVector?: {
    orbitalRatio: string;
    nasalCurvature: string;
    jawlineEmbedding: string;
    distanceScore: string;
  };
  notes?: string;
}

// ===== AUDIT =====
export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress: string;
  sessionId: string;
  responseTime?: number;
}

// ===== CATALYST STATUS =====
export interface CatalystServiceStatus {
  serviceName: string;
  status: 'online' | 'degraded' | 'offline';
  latency: number;
  recordCount?: number;
  lastChecked: string;
}

// ===== DASHBOARD =====
export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  color: string;
}

// ===== CITIZEN INCIDENT REPORT =====
export interface CitizenIncidentReport {
  id: string;
  timestamp: string;
  crimeType?: string;
  category?: string;
  location: string;
  station?: string;
  assignedStation?: string;
  district?: string;
  department?: string;
  details?: string;
  description?: string;
  contact?: string;
  reporterName?: string;
  reporterContact?: string;
  status: string;
  media?: string | null;
  mediaUrl?: string | null;
  mediaType?: string;
  digilockerVerified?: boolean;
  autoMatchedSuspects?: Array<{
    id?: string;
    suspectId?: string;
    name: string;
    confidence?: number;
    matchConfidence?: number;
    crimeType?: string;
    warrantStatus?: string;
    reason?: string;
    photo_url?: string;
  }>;
  routing?: {
    department: string;
    stationCode?: string;
    redirectUrl?: string;
  };
}

export interface DigiLockerCitizen {
  consentToken?: string;
  aadharHash?: string;
  citizenName?: string;
  name?: string;
  maskedAadhar?: string;
  maskedAadhaar?: string;
  digilockerId?: string;
  verifiedPhone?: string;
  phone?: string;
  verified: boolean;
  timestamp?: string;
  id?: string;
  dob?: string;
  gender?: string;
  address?: string;
  verifiedDocuments?: string[];
  verifiedAt?: string;
}
