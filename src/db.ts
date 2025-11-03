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


export const UserModel = model("user",UserSchema)