import mongoose from "mongoose";

const WaterSuplySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parameter: {
            opId: {
                type: Number,
                required: true,
            },
            billerId: {
                type: String,
                required: true,
            },
            operatorName: {
                type: String,
                required: true,
                trim: true,
            },
            category: {
                type: String,
                required: true,
            },
            viewBill: {
                type: Boolean,
                default: false,
            },
            bbpsEnabled: {
                type: Boolean,
                default: false,
            },
            regex: {
                type: String,
            },
            name: {
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

export default mongoose.model("WaterSuplyOperator", WaterSuplySchema);
