import mongoose from "mongoose";

const otpSchema=new mongoose.Schema({
     mobileNumber: {
        type: String
    },
    otp:{
        type: Number
    },
    isverified:{
        type: Boolean,
        default: false
    },
    expiresAt:{
        type:Date,
        default:() => Date.now() + 15 * 60 * 1000,
        expires:0
    }
},{timestamps:true})

const OTP=mongoose.model("OTP",otpSchema);
export default OTP;