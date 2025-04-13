import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    message: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Message", 
      },
    ],
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
