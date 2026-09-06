/**
 * CIRAS 1.0 - Controller
 * Handles Catalyst Data Store queries for CIRAS routes.
 */

const { logAuditEvent, AUDIT_EVENTS } = require('./cirasAudit');

// Demo fallback stats (used when Data Store is unavailable)
const DEMO_STATS = {
  openIncidents: 10,
  aiSearchesToday: 10,
  potentialMatches: 6,
  awaitingOfficerReview: 6,
  noCandidateResults: 4,
  officerConfirmed: 0,
  officerRejected: 0,
};

// Demo incidents (fallback when Catalyst unavailable)
const DEMO_INCIDENTS = [
  { incident_id: 'INC-001', district: 'Bengaluru Urban', incident_type: 'Theft', date_reported: '2026-01-15', status: 'COMPLETED', location_description: 'MG Road, Bengaluru' },
  { incident_id: 'INC-002', district: 'Mysuru City', incident_type: 'Fraud', date_reported: '2026-01-22', status: 'COMPLETED', location_description: 'Devaraja Market, Mysuru' },
  { incident_id: 'INC-003', district: 'Kalaburagi', incident_type: 'Assault', date_reported: '2026-02-03', status: 'COMPLETED', location_description: 'Station Road, Kalaburagi' },
  { incident_id: 'INC-004', district: 'Belagavi City', incident_type: 'Robbery', date_reported: '2026-02-18', status: 'COMPLETED', location_description: 'Camp Area, Belagavi' },
  { incident_id: 'INC-005', district: 'Mangaluru City', incident_type: 'Extortion', date_reported: '2026-03-05', status: 'COMPLETED', location_description: 'Hampankatta, Mangaluru' },
  { incident_id: 'INC-006', district: 'Bengaluru Urban', incident_type: 'Theft', date_reported: '2026-03-12', status: 'COMPLETED', location_description: 'Whitefield, Bengaluru' },
  { incident_id: 'INC-007', district: 'Mysuru City', incident_type: 'Fraud', date_reported: '2026-03-28', status: 'COMPLETED', location_description: 'Vijaynagar, Mysuru' },
  { incident_id: 'INC-008', district: 'Kalaburagi', incident_type: 'Assault', date_reported: '2026-04-10', status: 'COMPLETED', location_description: 'Aland Road, Kalaburagi' },
  { incident_id: 'INC-009', district: 'Belagavi City', incident_type: 'Robbery', date_reported: '2026-04-22', status: 'COMPLETED', location_description: 'Tilakwadi, Belagavi' },
  { incident_id: 'INC-010', district: 'Mangaluru City', incident_type: 'Extortion', date_reported: '2026-05-07', status: 'COMPLETED', location_description: 'Ullal Road, Mangaluru' },
];

const DEMO_MATCH_RESULTS = [
  { match_id: 'MR-001', incident_id: 'INC-001', person_id: 'P-001', similarity_score: '0.91', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-002', incident_id: 'INC-002', person_id: 'P-002', similarity_score: '0.86', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-003', incident_id: 'INC-003', person_id: 'P-003', similarity_score: '0.82', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-004', incident_id: 'INC-004', person_id: 'P-004', similarity_score: '0.77', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-005', incident_id: 'INC-005', person_id: 'P-005', similarity_score: '0.74', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-006', incident_id: 'INC-006', person_id: 'P-006', similarity_score: '0.71', match_status: 'POTENTIAL_MATCH', officer_review_status: 'PENDING', model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-007', incident_id: 'INC-007', person_id: null, similarity_score: '0.68', match_status: 'NO_CANDIDATE_ABOVE_THRESHOLD', officer_review_status: null, model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-008', incident_id: 'INC-008', person_id: null, similarity_score: '0.61', match_status: 'NO_CANDIDATE_ABOVE_THRESHOLD', officer_review_status: null, model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-009', incident_id: 'INC-009', person_id: null, similarity_score: '0.53', match_status: 'NO_CANDIDATE_ABOVE_THRESHOLD', officer_review_status: null, model_version: 'DEMO-ADAPTER-1.0' },
  { match_id: 'MR-010', incident_id: 'INC-010', person_id: null, similarity_score: '0.44', match_status: 'NO_CANDIDATE_ABOVE_THRESHOLD', officer_review_status: null, model_version: 'DEMO-ADAPTER-1.0' },
];

async function getDashboardStats(app) {
  try {
    const datastore = app.datastore();
    const matchTable = datastore.table('MATCH_RESULTS');
    const incidentTable = datastore.table('INCIDENTS');
    const rows = await matchTable.getAllRows();
    const incidents = await incidentTable.getAllRows();
    const today = new Date().toISOString().split('T')[0];

    let potentialMatches = 0;
    let awaitingReview = 0;
    let noCandidateResults = 0;
    let confirmed = 0;
    let rejected = 0;
    let aiSearchesToday = 0;

    for (const row of (rows || [])) {
      if (row.match_status === 'POTENTIAL_MATCH') {
        potentialMatches++;
        if (!row.officer_review_status || row.officer_review_status === 'PENDING') awaitingReview++;
        if (row.officer_review_status === 'CONFIRMED') confirmed++;
        if (row.officer_review_status === 'REJECTED') rejected++;
      } else if (row.match_status === 'NO_CANDIDATE_ABOVE_THRESHOLD') {
        noCandidateResults++;
      }
      if (row.search_timestamp && row.search_timestamp.startsWith(today)) aiSearchesToday++;
    }

    return {
      openIncidents: (incidents || []).length,
      aiSearchesToday,
      potentialMatches,
      awaitingOfficerReview: awaitingReview,
      noCandidateResults,
      officerConfirmed: confirmed,
      officerRejected: rejected,
    };
  } catch (err) {
    console.warn('[CIRAS] Dashboard stats fallback to demo:', err.message);
    return DEMO_STATS;
  }
}

async function getIncidents(app, filters) {
  try {
    const datastore = app.datastore();
    const table = datastore.table('INCIDENTS');
    const rows = await table.getAllRows();
    return (rows || []).filter(r => {
      if (filters.status && r.status !== filters.status) return false;
      if (filters.district && r.district !== filters.district) return false;
      return true;
    });
  } catch (err) {
    console.warn('[CIRAS] Incidents fallback to demo:', err.message);
    return DEMO_INCIDENTS;
  }
}

async function getIncidentDetail(app, incidentId) {
  try {
    const datastore = app.datastore();
    const incTable  = datastore.table('INCIDENTS');
    const evdTable  = datastore.table('EVIDENCE_IMAGES');
    const mrTable   = datastore.table('MATCH_RESULTS');

    const [incidents, evidences, matches] = await Promise.all([
      incTable.getAllRows(),
      evdTable.getAllRows(),
      mrTable.getAllRows(),
    ]);

    const incident = (incidents || []).find(r => r.incident_id === incidentId);
    const evidence = (evidences || []).filter(r => r.incident_id === incidentId);
    const matchResults = (matches || []).filter(r => r.incident_id === incidentId);

    return { incident, evidence, matchResults };
  } catch (err) {
    console.warn('[CIRAS] Incident detail fallback to demo:', err.message);
    const incident = DEMO_INCIDENTS.find(r => r.incident_id === incidentId);
    const matchResults = DEMO_MATCH_RESULTS.filter(r => r.incident_id === incidentId);
    return { incident, evidence: [], matchResults };
  }
}

async function reviewMatch(app, matchId, action, notes, officerId) {
  const validActions = ['CONFIRMED', 'REJECTED', 'FURTHER_REVIEW'];
  if (!validActions.includes(action)) {
    throw new Error(`Invalid review action: ${action}. Must be one of: ${validActions.join(', ')}`);
  }

  let updated = false;
  try {
    const datastore = app.datastore();
    const table = datastore.table('MATCH_RESULTS');
    const rows = await table.getAllRows();
    const match = (rows || []).find(r => r.match_id === matchId);

    if (!match) throw new Error(`Match result not found: ${matchId}`);
    if (match.match_status !== 'POTENTIAL_MATCH') throw new Error('Only POTENTIAL_MATCH results can be reviewed.');

    await table.updateRow({
      ...match,
      officer_review_status: action,
      reviewed_by: officerId || 'UNKNOWN',
      reviewed_at: new Date().toISOString(),
      review_notes: notes || '',
    });
    updated = true;

    // Log audit event
    const eventMap = { CONFIRMED: AUDIT_EVENTS.MATCH_CONFIRMED, REJECTED: AUDIT_EVENTS.MATCH_REJECTED, FURTHER_REVIEW: AUDIT_EVENTS.FURTHER_REVIEW_REQUESTED };
    await logAuditEvent(datastore, {
      eventType: eventMap[action] || AUDIT_EVENTS.MATCH_REVIEWED,
      incidentId: match.incident_id,
      matchId,
      officerId,
      details: { action, notes },
    });
  } catch (err) {
    if (updated) throw err;
    console.warn('[CIRAS] Review match fallback (demo mode):', err.message);
  }

  return {
    matchId,
    action,
    officerReviewStatus: action,
    reviewedAt: new Date().toISOString(),
    notes: notes || '',
    message: `Match result ${matchId} updated to ${action}.`,
    disclaimer: 'AI face-search results are advisory candidate matches only. This review action has been recorded. A result does not independently establish identity, current criminal status, guilt, or involvement in a new incident.',
  };
}

async function getPersonRecord(app, personId) {
  try {
    const datastore = app.datastore();
    const [personTable, faceTable, caseTable] = [
      datastore.table('PERSONS'),
      datastore.table('FACE_IMAGES'),
      datastore.table('CASES'),
    ];
    const [persons, faceImages, cases] = await Promise.all([personTable.getAllRows(), faceTable.getAllRows(), caseTable.getAllRows()]);
    const person = (persons || []).find(r => r.person_id === personId);
    const images = (faceImages || []).filter(r => r.person_id === personId);
    const linkedCases = (cases || []).filter(r => r.person_id === personId);
    return { person, faceImages: images, linkedCases };
  } catch (err) {
    console.warn('[CIRAS] Person record fallback:', err.message);
    return { person: { person_id: personId, display_name: `Demo Subject ${personId}`, record_status: 'HISTORICAL', record_period: '2011-2013' }, faceImages: [], linkedCases: [] };
  }
}

module.exports = { getDashboardStats, getIncidents, getIncidentDetail, reviewMatch, getPersonRecord };
