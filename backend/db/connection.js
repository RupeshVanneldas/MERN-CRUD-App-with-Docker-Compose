import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://mongodb:27017"; // Use Docker container name
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
    db = client.db("employees"); // Set the database reference
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit the app if DB connection fails
  }
}

await connectDB(); // Ensure DB connection before exporting

export default db;
