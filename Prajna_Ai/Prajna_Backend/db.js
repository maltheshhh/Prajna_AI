const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  try {
    if (db) {
      return db;
    }
// database url 
    const uri =  process.env.MONGODB_URI;

    client = new MongoClient(uri);

    await client.connect();

    db = client.db("ksp_ciras");

    console.log("✅ MongoDB Connected Successfully!");

    return db;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw error;
  }
}

module.exports = { connectDB };
