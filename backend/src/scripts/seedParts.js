import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Part from "../models/Part.js";
import { seedParts } from "../data/seedParts.js";

async function runPartsSeed() {
  console.log("Connecting to MongoDB Atlas (Database: Torq, Collection: parts)...");
  const conn = await connectDB();
  if (!conn) {
    console.error("❌ Failed to connect to database. Please check your MONGODB_URI in backend/.env");
    process.exit(1);
  }

  try {
    const existing = await Part.countDocuments();
    console.log(`Current parts in 'parts' collection: ${existing}`);

    await Part.deleteMany({});
    console.log("Cleared old car part records in 'parts' collection.");

    const inserted = await Part.insertMany(seedParts);
    console.log(`✅ Successfully seeded ${inserted.length} authentic OEM car parts into 'parts' collection!`);

    const finalCount = await Part.countDocuments();
    console.log(`Verified total count in 'parts' collection: ${finalCount}`);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  }
}

runPartsSeed();
