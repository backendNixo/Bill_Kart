import mongoose from "mongoose";

const broadBandSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parameter: {
            opId: {
                type: Number,
            },
            billerId: {
                type: String,
                required: true,
            },
            operatorName: {
                type: String,
                trim: true,
            },
            category: {
                type: String,
                required: true,
            },
            ViewBill: {
                type:String
            },
            BBPSEnabled: {
                type: Boolean,
                default: false,
            },
            Regex: {
                type: String,
            },
            Name: {
                type: String,
                trim: true,
            },
            cn: {
                type: String,
            },
        },
    },
    { timestamps: true }
);

export default mongoose.model("BroadBandOperator", broadBandSchema);
