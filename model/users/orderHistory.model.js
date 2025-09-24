import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userData:{
        type:mongoose.Schema.Types.Mixed
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    paymentStatus:{
        type:String,
        default:"progress",
        enum:["progress","success","failed"]
    }
},{timestamps:true});

export const OrderHistory=mongoose.model("OrderHistory",orderSchema);