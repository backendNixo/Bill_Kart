import mongoose from "mongoose";

const EMISchema = new mongoose.Schema(
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

export default mongoose.model("EMIOperator", EMISchema);
