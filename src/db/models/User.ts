import mongoose from "mongoose";

export interface UserInput {
  emailVerified: boolean;
  email: string;
  password_hash: string;
}

export interface UserDoc extends UserInput, mongoose.Document {}

export const User =
  mongoose?.models?.User ||
  mongoose.model<UserDoc>(
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
