// analyticsEngine.js — Prajna-AI

function analyticsEngine(firs = []) {

  const analytics = {
    totalFIRs: firs.length,

    openCases: 0,
    closedCases: 0,
    underInvestigation: 0,
    chargesheeted: 0,
    convicted: 0,

    severity: {
      high: 0,
      medium: 0,
      low: 0,
      critical: 0
    },

    crimeTypes: {},
    districts: {},
    stations: {},

    hotspotStation: "Unknown",
    topCrime: "Unknown",

    summary: "",
    insights: [],
    recommendations: [],
    confidence: 95
  };

  firs.forEach(fir => {

    // --------------------
    // Case Status
    // --------------------
    switch (fir.status) {

      case "open":
        analytics.openCases++;
        break;

      case "closed":
        analytics.closedCases++;
        break;

      case "under_investigation":
        analytics.underInvestigation++;
        break;

      case "chargesheeted":
        analytics.chargesheeted++;
        break;

      case "convicted":
        analytics.convicted++;
        break;
    }

    // --------------------
    // Severity
    // --------------------
    if (fir.severity) {
      analytics.severity[fir.severity] =
        (analytics.severity[fir.severity] || 0) + 1;
    }

    // --------------------
    // Crime Types
    // --------------------
    if (fir.crimeType) {
      analytics.crimeTypes[fir.crimeType] =
        (analytics.crimeTypes[fir.crimeType] || 0) + 1;
    }

    // --------------------
    // Districts
    // --------------------
    if (fir.district) {
      analytics.districts[fir.district] =
        (analytics.districts[fir.district] || 0) + 1;
    }

    // --------------------
    // Police Stations
    // --------------------
    if (fir.policeStation) {
      analytics.stations[fir.policeStation] =
        (analytics.stations[fir.policeStation] || 0) + 1;
    }

  });

  // ============================
  // Most Affected Police Station
  // ============================

  let maxStation = 0;

  for (const station in analytics.stations) {

    if (analytics.stations[station] > maxStation) {
      maxStation = analytics.stations[station];
      analytics.hotspotStation = station;
    }

  }

  // ============================
  // Top Crime Type
  // ============================

  let maxCrime = 0;

  for (const crime in analytics.crimeTypes) {

    if (analytics.crimeTypes[crime] > maxCrime) {
      maxCrime = analytics.crimeTypes[crime];
      analytics.topCrime = crime;
    }

  }

  // ============================
  // Summary
  // ============================

  analytics.summary =
    `Found ${analytics.totalFIRs} FIRs. ` +
    `${analytics.openCases} open, ` +
    `${analytics.closedCases} closed and ` +
    `${analytics.underInvestigation} under investigation.`;

  // ============================
  // Insights
  // ============================

  analytics.insights.push(
    `Most affected police station: ${analytics.hotspotStation}`
  );

  analytics.insights.push(
    `Most common crime: ${analytics.topCrime}`
  );

  analytics.insights.push(
    `High severity cases: ${analytics.severity.high}`
  );

  analytics.insights.push(
    `Critical cases: ${analytics.severity.critical}`
  );

  // ============================
  // Recommendations
  // ============================

  if (analytics.openCases > 10) {

    analytics.recommendations.push(
      "Increase investigation resources for pending cases."
    );

  }

  if (analytics.severity.high > 5 || analytics.severity.critical > 0) {

    analytics.recommendations.push(
      "Deploy additional patrol units in hotspot locations."
    );

  }

  analytics.recommendations.push(
    "Monitor repeat offenders linked to hotspot police stations."
  );

  analytics.recommendations.push(
    "Review crime trends for preventive policing."
  );

  return analytics;

}

module.exports = analyticsEngine;