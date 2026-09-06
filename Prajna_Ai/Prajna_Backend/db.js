const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
  try {
    if (db) {
      return db;
    }

    const uri = "mongodb+srv://Prajna_admin:PrajnaMongo123@prajna-ai.mheqgry.mongodb.net/?appName=Prajna-Ai";

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