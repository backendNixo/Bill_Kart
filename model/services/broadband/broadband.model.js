import mongoose from "mongoose";

const broadBandSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parameter: {
            type:mongoose.Schema.Types.Mixed,
            unique:true
        },
    },
    { timestamps: true }
);

export default mongoose.model("BroadBandOperator", broadBandSchema);
