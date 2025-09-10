import mongoose from "mongoose";

const redeemeSchema = new mongoose.Schema({
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transactionId: {
        type: String,
        required: true
    }

}, { timestamps: true });

const Redeeme = mongoose.model("Redeeme", redeemeSchema);

export default Redeeme;