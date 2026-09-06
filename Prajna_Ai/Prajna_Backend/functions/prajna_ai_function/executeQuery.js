// executeQuery.js — Prajna-AI

async function executeQuery(db, entities) {
  const filter = {};

  // =============================
  // District
  // =============================
  if (entities.district) {
    filter.district = entities.district;
  }

  // =============================
  // Crime Type
  // =============================
  if (entities.crimeType) {
    filter.crimeType = entities.crimeType;
  }

  // =============================
  // Case Status
  // =============================
  if (entities.status) {
    filter.status = entities.status;
  }

  // =============================
  // FIR Number
  // =============================
  if (entities.firNumber) {
    filter.firNumber = entities.firNumber;
  }

  // =============================
  // Police Station
  // =============================
  if (entities.policeStation) {
    filter.policeStation = entities.policeStation;
  }

  // =============================
  // Severity
  // =============================
  if (entities.severity) {
    filter.severity = entities.severity;
  }

  // =============================
  // Registration Year
  // =============================
  if (entities.year) {
    filter.dateOfRegistration = {
      $gte: `${entities.year}-01-01T00:00:00.000Z`,
      $lt: `${entities.year + 1}-01-01T00:00:00.000Z`
    };
  }

  console.log("====================================");
  console.log("Generated Mongo Filter:");
  console.log(JSON.stringify(filter, null, 2));
  console.log("====================================");

  const firs = await db
    .collection("firs")
    .find(filter)
    .limit(100)
    .toArray();

  console.log(`Records Found: ${firs.length}`);

  return {
    success: true,
    filter,
    count: firs.length,
    data: firs
  };
}

module.exports = executeQuery;