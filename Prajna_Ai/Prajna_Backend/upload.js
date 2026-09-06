const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri = "mongodb+srv://Prajna_admin:PrajnaMongo123@prajna-ai.mheqgry.mongodb.net/?appName=Prajna-Ai";

const client = new MongoClient(uri);

const files = [
  { file: "mockFIRs_1000.json", collection: "firs" },
  { file: "mockSuspects_200.json", collection: "suspects" },
  { file: "mockNetworkGraph.json", collection: "network_graph" },
  { file: "mockHotspotData_220.json", collection: "hotspots" },
  { file: "mockRecidivism_100.json", collection: "recidivism" },
  { file: "mockTransactions_120.json", collection: "transactions" },
  { file: "mockAuditLogs_150.json", collection: "audit_logs" },
  { file: "mockCatalystStatus.json", collection: "catalyst_status" }
];

async function upload() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("ksp_ciras");

    for (const item of files) {
      const data = JSON.parse(
        fs.readFileSync(item.file, "utf8")
      );

      const docs = Array.isArray(data) ? data : [data];

      await db.collection(item.collection).insertMany(docs);

      console.log(`Uploaded ${docs.length} documents to ${item.collection}`);
    }

    console.log("All files uploaded successfully!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

upload();