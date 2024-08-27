import mongoose from "mongoose";

import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { connectDB } from "@/db";

export const getAdapter = async () => {
  await connectDB();

  const adapter = new MongodbAdapter(
    mongoose.connection.collection("sessions"),
    mongoose.connection.collection("users")
  );

  return adapter;
};
