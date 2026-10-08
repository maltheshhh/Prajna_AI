const { MongoClient } = require("mongodb");
const fs = require("fs");

const uri =  process.env.MONGODB_URI;

const client = new MongoClient(uri);

async function upload() {
    try {
        await client.connect();

        const db = client.db("ksp_ciras");
        const collection = db.collection("firs");

        const data = JSON.parse(
            fs.readFileSync("./mockFIRs_1000.json", "utf8")
        );

        await collection.deleteMany({});
        console.log("Old FIRs deleted.");

        const result = await collection.insertMany(data);

        console.log(`${result.insertedCount} FIRs uploaded successfully.`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

upload();
