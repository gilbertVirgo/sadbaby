import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  try {
    console.log("Connecting to:", process.env.MONGO_URI.replace(/:[^:]*@/, ":****@"));
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected successfully!");
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
  }
}

test();
