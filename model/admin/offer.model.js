import mongoose from "mongoose";

const offerSchema = new mongoose.Schema({
    maxAmount: {
        type: Number,
        required: true
    },
    minAmount: {
        type: Number,
        required: true
    },
    offerType: {
        type: String,
        enum: ["percentage", "flat"],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    offerName: {
        type: String,
        required: true,
        unique:true
    },
    offerAmount: {
        type: Number,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    offerFor:{
        type:String,
        enum:['new-user','all','old-user'],
        required:true
    }
}, { timestamps: true });

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;