import mongoose from "mongoose";

export const Diagram =
  mongoose?.models?.Diagram ||
  mongoose.model(
    "Diagram",
    new mongoose.Schema({
      blobUrl: {
        type: String,
        required: true,
      },
      user_id: {
        type: mongoose.Schema.Types.String,
        ref: "User",
      },
      team_id: {
        type: mongoose.Schema.Types.String,
        ref: "Team",
      },
    })
  );
