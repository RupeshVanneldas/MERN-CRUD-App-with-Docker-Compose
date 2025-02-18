import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050; // Define the server port
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON request body parsing

// Routes
app.use("/record", records); // Mount the record routes

/**
 * Start the Express server.
 */
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
