import { Schema } from "mongoose";

export const userSchema = new Schema({
    name:String,
    email:{type:String,unique:true, required:true},
    password:{type:String,required:true, minLength:8, maxLength: 30},
    phone:String,
    location:{
        country:String,
        city:String,
        addres:String,
        zip:String
    }
})