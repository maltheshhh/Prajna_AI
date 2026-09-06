import { AuditLogEntry } from '@/types';

export const mockAuditLogs: AuditLogEntry[] = [
  {
    id: 'AUD-001',
    userId: 'USR-001',
    userName: 'SI Rajesh Kumar',
    userRole: 'investigator',
    action: 'LOGIN',
    details: 'User authenticated successfully via biometric scan',
    timestamp: '2026-06-20T08:30:00Z',
    ipAddress: '10.14.23.45',
    sessionId: 'SESS-9923a1',
    responseTime: 120
  },
  {
    id: 'AUD-002',
    userId: 'USR-001',
    userName: 'SI Rajesh Kumar',
    userRole: 'investigator',
    action: 'QUERY',
    details: 'Queried database for suspect: Raju K.',
    timestamp: '2026-06-20T08:35:12Z',
    ipAddress: '10.14.23.45',
    sessionId: 'SESS-9923a1',
    responseTime: 180
  },
  {
    id: 'AUD-003',
    userId: 'USR-001',
    userName: 'SI Rajesh Kumar',
    userRole: 'investigator',
    action: 'VIEW_NETWORK',
    details: 'Rendered relationship network graph for Raju K.',
    timestamp: '2026-06-20T08:36:04Z',
    ipAddress: '10.14.23.45',
    sessionId: 'SESS-9923a1',
    responseTime: 210
  },
  {
    id: 'AUD-004',
    userId: 'USR-001',
    userName: 'SI Rajesh Kumar',
    userRole: 'investigator',
    action: 'FACE_SEARCH',
    details: 'Performed facial search upload (Mode B - suspect match: Raju K.)',
    timestamp: '2026-06-20T09:12:45Z',
    ipAddress: '10.14.23.45',
    sessionId: 'SESS-9923a1',
    responseTime: 840
  },
  {
    id: 'AUD-005',
    userId: 'USR-002',
    userName: 'Inspector Kavitha M.',
    userRole: 'analyst',
    action: 'QUERY',
    details: 'Analyzed state-wide crime trends for 2025 Q4',
    timestamp: '2026-06-20T10:15:30Z',
    ipAddress: '10.14.12.87',
    sessionId: 'SESS-8877b2',
    responseTime: 450
  },
  {
    id: 'AUD-006',
    userId: 'USR-002',
    userName: 'Inspector Kavitha M.',
    userRole: 'analyst',
    action: 'EXPORT_PDF',
    details: 'Exported quarterly crime analytics report for Kalaburagi division',
    timestamp: '2026-06-20T10:30:15Z',
    ipAddress: '10.14.12.87',
    sessionId: 'SESS-8877b2',
    responseTime: 1980
  }
];

// Add 34 more programmatically to complete 40 entries
const officers = [
  { id: 'USR-001', name: 'SI Rajesh Kumar', role: 'investigator' },
  { id: 'USR-002', name: 'Inspector Kavitha M.', role: 'analyst' },
  { id: 'USR-003', name: 'ASP Sharma R.', role: 'supervisor' },
  { id: 'USR-004', name: 'DG Praveen Sood', role: 'policymaker' }
];

const actionsList = [
  'QUERY', 'VIEW_FIR', 'GENERATE_SUMMARY', 'VIEW_SUSPECT', 'DOWNLOAD_REPORT',
  'ROLE_CHANGE', 'FACE_SEARCH', 'LOGIN', 'LOGOUT', 'VIEW_NETWORK'
];

const detailsPool = [
  'Queried NoSQL database for FIR records in district Mysuru',
  'Viewed FIR register entry for 0120/2026',
  'Generated AI summary using QuickML for FIR 0034/2026',
  'Accessed suspect profile details for Venkatesh M.',
  'Downloaded comprehensive district hotspot analysis',
  'Modified session authentication role for demonstration',
  'Submitted face recognition query against mugshot database',
  'Established secure SSL connection to Catalyst AppSail',
  'Closed active browser session and cleared security tokens',
  'Generated financial link network for structured transactions'
];

for (let i = 7; i <= 40; i++) {
  const officer = officers[i % officers.length];
  const action = actionsList[i % actionsList.length];
  const detail = detailsPool[i % detailsPool.length];
  
  mockAuditLogs.push({
    id: `AUD-0${i < 10 ? '0' : ''}${i}`,
    userId: officer.id,
    userName: officer.name,
    userRole: officer.role as any,
    action: action,
    details: detail,
    timestamp: new Date(Date.now() - (i * 4 * 60 * 60 * 1000)).toISOString(),
    ipAddress: `10.14.23.${45 + (i % 20)}`,
    sessionId: `SESS-${992000 + i}`,
    responseTime: Math.floor(Math.random() * 500) + 50
  });
}
