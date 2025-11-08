import mongoose from "mongoose"
import { required } from "zod/mini";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId
const model = mongoose.model

const UserSchema = new Schema({
    Username : {type : String , required : true },
    Password : {type : String, required : true},
    name : {type : String },
    age : {type : Number}
})


const CourseSchema = new Schema({
    title : String,
    link : String,
    tags : [{type : ObjectId , ref : "tags" }],
    userId : {type : ObjectId , ref : "user" , required : true}
})  


export const UserModel = model("user",UserSchema)
export const ContentModel = model("Content",CourseSchema)