import mongoose from "mongoose";

let isConnected = false;

/**
 * Connect to MongoDB with robust connection pooling and event listeners.
 */
export async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri =
    process.env.MONGODB_URI ||
    "mongodb+srv://torquser:torqpass123@cluster0.mongodb.net/torq_luxury?retryWrites=true&w=majority" ||
    "mongodb://localhost:27017/torq_luxury";

  try {
    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    isConnected = true;
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`[MongoDB] Active Database: ${conn.connection.name}`);

    return conn.connection;
  } catch (error) {
    console.error("[MongoDB] Connection failure:", error.message);
    // Do not crash the entire process during offline development or mock tests
    return null;
  }
}

mongoose.connection.on("disconnected", () => {
  isConnected = false;
  console.warn("[MongoDB] Lost connection to database cluster.");
});

mongoose.connection.on("reconnected", () => {
  isConnected = true;
  console.log("[MongoDB] Connection re-established.");
});

process.on("SIGINT", async () => {
  if (isConnected) {
    await mongoose.connection.close();
    console.log("[MongoDB] Closed connection on process termination.");
  }
  process.exit(0);
});

export default connectDB;
