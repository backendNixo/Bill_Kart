import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema({
    offerAmount: {
        type: Number
    },
    balance: {
        type: Number
    },
    category: {
        type: String
    },
    action: {
        type: String,
        enum: ["debit", "credit"]
    },
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Offer"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    paymentAmount:{
        type: Number
    },
    userData: {
        type: mongoose.Schema.Types.Mixed
    },
    status:{
        type: String,
        enum: ["success", "failed"]
    }
}, { timestamps: true });

export const OperatorLadger = mongoose.model("OperatorLadger", ledgerSchema);