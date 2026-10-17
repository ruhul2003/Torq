import express from "express";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth.js";
import { connectDB } from "./config/db.js";
import { corsMiddleware } from "./middleware/cors.js";
import { requestLogger } from "./middleware/logger.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and Logging
app.use(corsMiddleware);
app.use(requestLogger);

// Better Auth Mount: Handles /api/auth/sign-in/email, /api/auth/sign-up/email, /api/auth/session, etc.
app.all("/api/auth/*", toNodeHandler(auth));

// Express Body Parsing for standard API routes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Welcome / Root Banner
app.get("/", (req, res) => {
  res.status(200).json({
    brand: "TORQ Luxury Motors",
    tagline: "Ultra-Performance Vehicle Architecture & Hire Concierge",
    api: "/api",
    auth: "/api/auth",
    documentation: "/api/health",
  });
});

// Primary Business Logic Routes
app.use("/api", apiRoutes);

// Fallback & Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

// Bootstrap Server & Database
async function startServer() {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 TORQ Luxury Motors Server Active`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`🔐 Better Auth Endpoint: http://localhost:${PORT}/api/auth`);
    console.log(`🏎️  Car Hire API: http://localhost:${PORT}/api/cars`);
    console.log(`====================================================`);
  });
}

startServer();

export default app;
