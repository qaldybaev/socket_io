import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", UserSchema);
