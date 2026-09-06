async function executeQuery(db, entities) {
  const filter = {};

  if (entities.district) {
    filter.district = entities.district;
  }

  if (entities.crimeType) {
    filter.crimeType = entities.crimeType;
  }

  console.log("Filter:", filter);

  const firs = await db
    .collection("firs")
    .find(filter)
    .limit(50)
    .toArray();

  console.log("FIR Count:", firs.length);

  return {
    filter,
    count: firs.length,
    data: firs
  };
}

module.exports = executeQuery;