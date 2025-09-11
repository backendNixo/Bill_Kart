import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], },
  refreshToken: { type: String },
  content: { type: String },
},{timestamps:true});

export default mongoose.model("User", userSchema);
