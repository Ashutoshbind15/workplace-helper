import mongoose from "mongoose";
import { title } from "process";

export const Project =
  mongoose?.models?.Project ||
  mongoose.model(
    "Project",
    new mongoose.Schema({
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      teamid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
      members: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    })
  );
