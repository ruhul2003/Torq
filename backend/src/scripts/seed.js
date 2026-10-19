import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import Car from "../models/Car.js";
import { seedCars } from "../data/seedCars.js";

async function runSeed() {
  console.log("Connecting to MongoDB Atlas (Database: Torq, Collection: cars)...");
  const conn = await connectDB();
  if (!conn) {
    console.error("❌ Failed to connect to database. Please check your MONGODB_URI in backend/.env");
    process.exit(1);
  }

  try {
    const existing = await Car.countDocuments();
    console.log(`Current vehicles in 'cars' collection: ${existing}`);

    await Car.deleteMany({});
    console.log("Cleared old vehicle documents in 'cars' collection.");

    const inserted = await Car.insertMany(seedCars);
    console.log(`✅ Successfully inserted ${inserted.length} vehicles into database 'Torq' collection 'cars'!`);

    const finalCount = await Car.countDocuments();
    console.log(`Verified total count in 'cars' collection: ${finalCount}`);
  } catch (error) {
    console.error("❌ Seeding error:", error.message);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  }
}

runSeed();
