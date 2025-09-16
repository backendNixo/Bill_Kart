import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  mobileNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], },
  refreshToken: { type: String },
  content: { type: String },
  status: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  isSetupDone: {
    type: Boolean,
     default: false 
    }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
