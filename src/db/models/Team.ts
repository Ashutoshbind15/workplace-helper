import mongoose from "mongoose";

export interface TeamInput {
  title: string;
  description: string;
  members: {
    user: string;
    role: "admin" | "manager" | "member";
  }[];
}

export interface TeamDoc extends TeamInput, mongoose.Document {}

export const Team =
  mongoose?.models?.Team ||
  mongoose.model<TeamDoc>(
    "Team",
    new mongoose.Schema({
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      members: [
        {
          user: {
            type: mongoose.Schema.Types.String,
            ref: "User",
          },
          role: {
            type: String,
            enum: ["admin", "manager", "member"],
            default: "member",
          },
        },
      ],
    })
  );
