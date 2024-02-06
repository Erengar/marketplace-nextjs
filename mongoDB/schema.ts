import { Schema } from "mongoose";
import mongoose from "mongoose";

export const userSchema = new Schema({
    username:String,
    password:{type:String,required:true, minLength:8, maxLength: 30},
    email:{type:String,unique:true, required:true},
    phone:String,
    location:{
        country:String,
        city:String,
        addres:String,
        zip:String
    }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);