import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^[1-9]\d{9}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
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
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);
