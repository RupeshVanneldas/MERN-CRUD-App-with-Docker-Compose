import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all records
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching records:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single record by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("records");
    const record = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (!record) {
      return res.status(404).json({ error: "Record not found" });
    }
    res.status(200).json(record);
  } catch (err) {
    console.error("Error fetching record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    if (!name || !position || !level) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDocument = { name, position, level };
    const collection = db.collection("records");
    const result = await collection.insertOne(newDocument);

    res.status(201).json({ message: "Record created", recordId: result.insertedId });
  } catch (err) {
    console.error("Error creating record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a record by ID
router.patch("/:id", async (req, res) => {
  try {
    const { name, position, level } = req.body;
    if (!name && !position && !level) {
      return res.status(400).json({ error: "At least one field is required for update" });
    }

    const query = { _id: new ObjectId(req.params.id) };
    const updates = { $set: { name, position, level } };

    const collection = db.collection("records");
    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record updated successfully" });
  } catch (err) {
    console.error("Error updating record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a record by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("records");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error("Error deleting record:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
