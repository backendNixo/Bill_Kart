import mongoose, { mongo } from "mongoose";

const notificationSchema=new mongoose.Schema({
header:{
    type:String,
    required:true
},
body:{
    type:String,
    required:true
},
notificationFor:{
    type:String,
    enum:["all","selected"],
    required:true
},
adminId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Admin",
    required:true
},
isSeen:{
    type:Boolean,
    default:false
},
selectedUsers:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
]
},{timestamps:true});

const Notification=mongoose.model("Notification",notificationSchema);

export default Notification;