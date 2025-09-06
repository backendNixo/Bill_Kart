import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
userName:{
    type:String
},
password:{
    type:String
},
role:{
    type:String
},
refreshToken:{
    type:String
},
},{timestamps:true});

const User=mongoose.model("User",userSchema);

export default User;