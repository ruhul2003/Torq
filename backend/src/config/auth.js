import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME || "Torq";
const mongoUri =
  process.env.MONGODB_URI ||
  `mongodb://localhost:27017/${dbName}`;

const mongoClient = new MongoClient(mongoUri);
const db = mongoClient.db(dbName);

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:5000",
  basePath: "/api/auth",
  secret:
    process.env.BETTER_AUTH_SECRET ||
    "torq_luxury_motors_production_auth_super_secure_key_2026_x99",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
    maxPasswordLength: 128,
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5000",
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "customer",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      vipTier: {
        type: "string",
        defaultValue: "Silver Concierge",
        required: false,
      },
    },
  },
});

export { mongoClient, db };
export default auth;
