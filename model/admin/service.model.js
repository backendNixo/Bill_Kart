import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
    allowedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
}, { timestamps: true });

const Service = mongoose.model("Service", serviceSchema);

export default Service;