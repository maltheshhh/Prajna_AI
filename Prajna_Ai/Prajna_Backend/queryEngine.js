function detectIntent(query) {
  query = query.toLowerCase();

  if (
    query.includes("trend") ||
    query.includes("trends") ||
    query.includes("statistics")
  ) {
    return "trend_analysis";
  }

  if (query.includes("hotspot")) {
    return "hotspot_analysis";
  }

  if (
    query.includes("suspect") ||
    query.includes("offender")
  ) {
    return "suspect_lookup";
  }

  if (query.includes("network")) {
    return "network_analysis";
  }

  if (
    query.includes("transaction") ||
    query.includes("money")
  ) {
    return "financial_analysis";
  }
  if (
    query.includes("sociological") ||
    query.includes("social") ||
    query.includes("gender") ||
    query.includes("age") ||
    query.includes("demographic")
) {
    return "sociological_analysis";
}

  return "general_query";
}

module.exports = {
  detectIntent
};