/**
 * CIRAS 1.0 - Route Definitions
 * Wire these routes into the existing Catalyst Function handler.
 *
 * Usage in handler.js:
 *   const { handleCirasRequest } = require('./ciras/cirasRoutes');
 *   // In request handler:
 *   if (path.startsWith('/ciras/')) return handleCirasRequest(req, res, app, path);
 */

const {
  getDashboardStats,
  getIncidents,
  getIncidentDetail,
  reviewMatch,
  getPersonRecord,
} = require('./cirasController');

async function handleCirasRequest(req, res, app, path) {
  const method = (req.method || 'GET').toUpperCase();

  // Ensure JSON content type for all CIRAS responses
  res.setHeader('Content-Type', 'application/json');

  try {
    // GET /ciras/dashboard
    if (path === '/ciras/dashboard' && method === 'GET') {
      const stats = await getDashboardStats(app);
      return res.status(200).json({ success: true, data: stats });
    }

    // GET /ciras/incidents
    if (path === '/ciras/incidents' && method === 'GET') {
      const filters = { status: req.query.status, district: req.query.district };
      const incidents = await getIncidents(app, filters);
      return res.status(200).json({ success: true, data: incidents, count: incidents.length });
    }

    // GET /ciras/incidents/:incidentId
    const incidentDetailMatch = path.match(/^\/ciras\/incidents\/([\w-]+)$/);
    if (incidentDetailMatch && method === 'GET') {
      const incidentId = incidentDetailMatch[1];
      const detail = await getIncidentDetail(app, incidentId);
      return res.status(200).json({ success: true, data: detail });
    }

    // POST /ciras/matches/:matchId/review
    const reviewMatch_ = path.match(/^\/ciras\/matches\/([\w-]+)\/review$/);
    if (reviewMatch_ && method === 'POST') {
      const matchId = reviewMatch_[1];
      const body = req.body || {};
      const { action, notes } = body;
      const officerId = (req.user && req.user.id) || req.headers['x-officer-id'] || 'UNKNOWN';

      if (!action) {
        return res.status(400).json({ success: false, error: 'action is required (CONFIRMED/REJECTED/FURTHER_REVIEW)' });
      }

      const result = await reviewMatch(app, matchId, action, notes, officerId);
      return res.status(200).json({ success: true, data: result });
    }

    // GET /ciras/persons/:personId
    const personMatch = path.match(/^\/ciras\/persons\/([\w-]+)$/);
    if (personMatch && method === 'GET') {
      const personId = personMatch[1];
      const record = await getPersonRecord(app, personId);
      return res.status(200).json({ success: true, data: record });
    }

    // 404 for unrecognized CIRAS routes
    return res.status(404).json({ success: false, error: `CIRAS route not found: ${method} ${path}` });

  } catch (err) {
    console.error('[CIRAS Routes] Error:', err);
    return res.status(500).json({ success: false, error: err.message || 'Internal CIRAS error' });
  }
}

module.exports = { handleCirasRequest };
