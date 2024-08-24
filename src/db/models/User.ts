import mongoose from "mongoose";

export const User =
  mongoose?.models?.User ||
  mongoose.model(
    "User",
    new mongoose.Schema(
      {
        _id: {
          type: String,
          required: true,
        },
        password_hash: {
          type: String,
        },
        emailVerified: {
          type: Boolean,
          default: false,
        },
        email: {
          type: String,
        },
      },
      { _id: false }
    )
  );
