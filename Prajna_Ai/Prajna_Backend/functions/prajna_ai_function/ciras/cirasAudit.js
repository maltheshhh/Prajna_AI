/**
 * CIRAS 1.0 - Audit Event Logger
 * Records CIRAS face search events to Catalyst Data Store.
 */

const AUDIT_EVENTS = {
  SEARCH_PERFORMED: 'SEARCH_PERFORMED',
  MATCH_REVIEWED: 'MATCH_REVIEWED',
  MATCH_CONFIRMED: 'MATCH_CONFIRMED',
  MATCH_REJECTED: 'MATCH_REJECTED',
  FURTHER_REVIEW_REQUESTED: 'FURTHER_REVIEW_REQUESTED',
};

async function logAuditEvent(datastore, {
  eventType,
  incidentId,
  matchId,
  officerId,
  details,
}) {
  try {
    const table = datastore.table('AUDIT_LOG');
    const entry = {
      event_type: eventType,
      incident_id: incidentId || '',
      match_id: matchId || '',
      officer_id: officerId || 'SYSTEM',
      details: JSON.stringify(details || {}),
      timestamp: new Date().toISOString(),
    };
    await table.insertRow(entry);
    return true;
  } catch (err) {
    // Audit logging is non-critical - log warning but don't fail the main operation
    console.warn('[CIRAS Audit] Failed to log event:', eventType, err.message);
    return false;
  }
}

module.exports = { logAuditEvent, AUDIT_EVENTS };
