const { detectIntent } = require("./queryEngine");
const { extractEntities } = require("./entityExtractor");
const { connectDB } = require("./db");

async function getCrimeSummary(query) {
  const db = await connectDB();

  const intent = detectIntent(query);
  const entities = extractEntities(query);

  const filter = {};

  if (entities.district) {
    filter.district = entities.district;
  }

  if (entities.crimeType) {
    filter.crimeType = entities.crimeType;
  }

  const firs = await db
    .collection("firs")
    .find(filter)
    .limit(10)
    .toArray();

  const crime = entities.crimeType || "crime";
  const district = entities.district || "the selected district";

  const stations = [
    ...new Set(firs.map(f => f.policeStation))
  ];

  const summary =
    `There are ${firs.length} ${crime} cases in ${district}.
Police Stations involved: ${
      stations.length
        ? stations.join(", ")
        : "None"
    }`;

  return {
    intent,
    entities,
    totalCases: firs.length,
    summary
  };
}

module.exports = { getCrimeSummary };