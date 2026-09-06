function extractEntities(query) {
  query = query.toLowerCase();

  const entities = {
    district: null,
    crimeType: null
  };

  // District
  if (query.includes("shivamogga")) {
    entities.district = "Shivamogga";
  }

  // Crime Type
  if (
    query.includes("vehicle theft") ||
    query.includes("auto theft") ||
    query.includes("bike theft")
  ) {
    entities.crimeType = "Theft";
  }

  return entities;
}

module.exports = {
  extractEntities
};