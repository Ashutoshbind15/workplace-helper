import mongoose from "mongoose";

export const NotesJson =
  mongoose?.models?.NotesJson ||
  mongoose.model(
    "NotesJson",
    new mongoose.Schema({
      data: {
        type: JSON,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    })
  );
