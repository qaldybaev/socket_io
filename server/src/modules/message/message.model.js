import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    type: {
      type: String,
      enum: ["message", "join_message"],
      default: "message",
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "messages",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Message", MessageSchema);
