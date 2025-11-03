
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {z} from "zod"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { UserModel } from "./db.js"
// import { InputValidation } from "./middleware.js"



dotenv.config()
const app = express()
app.use(express.json())


app.get("/signup",async function(req,res,next){

const ValidateUser = z.object({
    Username : z.string().min(4).max(20),
    Password : z.string().min(4).max(20),
    name : z.string().min(4).max(20),
    age : z.number()


})

const result = ValidateUser.safeParse(req.body)

const duplicateUser  = await UserModel.findOne({
    Username : req.body.Username
})

if(result.success && !duplicateUser){
    next()
}

else if (duplicateUser){
    res.status(404).json({
        error : "DuplicateUser"
    })
}
else
{
    res.json({
        error : result.error
    })
}
},async function(req,res){
const Username  = req.body.Username
const Password  = req.body.Password
const name  = req.body.name
const age  = req.body.age
  
await UserModel.create({
    Username,
    Password,
    name,
    age
})


res.json({
    mess : "you are signed up" 
})

})

app.get("/",function(req,res){
    
})

app.get("/",function(req,res){
    
})

app.get("/",function(req,res){
    
})

app.get("/",function(req,res){
    
})

app.get("/",function(req,res){
    
})

const PORT = process.env.PORT
const mongoUrl = process.env.MONGO_URL!


const connectionEstabilished = async ()=> {
try{
await mongoose.connect(mongoUrl)

}
catch(e){
console.log(`Connection to database failed with this error : ${e}`)
}
}

connectionEstabilished()

app.listen(3000)