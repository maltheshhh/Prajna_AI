const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const uri = "mongodb+srv://Prajna_admin:PrajnaMongo123@prajna-ai.mheqgry.mongodb.net/?appName=Prajna-Ai";

let client;
let db;

// In-memory mock database loader
function createInMemoryDb() {
  const backendDir = path.resolve(__dirname, "../../");
  const loadJson = (filename) => {
    try {
      const p = path.join(backendDir, filename);
      if (fs.existsSync(p)) {
        return JSON.parse(fs.readFileSync(p, "utf8"));
      }
    } catch (e) {
      console.warn(`Could not load ${filename}:`, e.message);
    }
    return [];
  };

  const collections = {
    firs: loadJson("mockFIRs_1000.json"),
    suspects: loadJson("mockSuspects_200.json"),
    network_graph: loadJson("mockNetworkGraph.json"),
    hotspots: loadJson("mockHotspotData_220.json"),
    recidivism: loadJson("mockRecidivism_100.json"),
    transactions: loadJson("mockTransactions_120.json"),
    audit_logs: loadJson("mockAuditLogs_150.json"),
    catalyst_status: loadJson("mockCatalystStatus.json"),
  };

  return {
    collection(name) {
      const data = collections[name] || [];
      const records = Array.isArray(data) ? data : (data.nodes ? [data] : []);

      return {
        find(filter = {}) {
          let results = records.filter(item => {
            for (const key of Object.keys(filter)) {
              if (key === "dateOfRegistration" && typeof filter[key] === "object") {
                const itemDate = new Date(item.dateOfRegistration || item.registrationDate || 0);
                if (filter[key].$gte && itemDate < new Date(filter[key].$gte)) return false;
                if (filter[key].$lt && itemDate >= new Date(filter[key].$lt)) return false;
                continue;
              }
              if (filter[key] instanceof RegExp) {
                if (!filter[key].test(String(item[key] || ""))) return false;
              } else if (typeof filter[key] === "string") {
                if (String(item[key] || "").toLowerCase() !== filter[key].toLowerCase()) {
                  return false;
                }
              } else if (filter[key] !== undefined && item[key] !== filter[key]) {
                return false;
              }
            }
            return true;
          });

          return {
            limit(n) {
              return {
                toArray: async () => results.slice(0, n),
              };
            },
            toArray: async () => results,
          };
        },
        async insertMany(docs) {
          if (Array.isArray(collections[name])) {
            collections[name].push(...docs);
          }
          return { insertedCount: docs.length };
        }
      };
    },
    async command(cmd) {
      return { ok: 1 };
    }
  };
}

async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(uri, {
      tls: true,
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    });

    await client.connect();
    console.log("[Prajna DB] Connected to MongoDB Atlas Cluster.");
    db = client.db("ksp_ciras");
    await db.command({ ping: 1 });
    console.log("[Prajna DB] Atlas Ping Successful.");
    return db;
  } catch (err) {
    console.warn("[Prajna DB] Atlas connection not reachable, using resilient local dataset fallback:", err.message);
    db = createInMemoryDb();
    return db;
  }
}

module.exports = { connectDB };