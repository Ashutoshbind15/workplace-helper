import mongoose from "mongoose";

import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { connectDB } from "@/db";

await connectDB();

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
