
import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import {z} from "zod"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { ContentModel, UserModel } from "./db.js"
import { Authentication, InputValidation } from "./middleware.js"
import { JWT_USER_SECRET } from "./config.js"





dotenv.config()
const app = express()
app.use(express.json())


app.get("/signup",InputValidation,async function(req,res){
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

app.get("/signin",async function(req,res){
    const {Username , Password } = req.body
    const UserFound = await UserModel.findOne({
        Username
    })
    if(!UserFound){
        return res.status(404).json({
            error : "User not found"
        })

    }
    try{
        if (!JWT_USER_SECRET) {
  throw new Error("JWT_USER_SECRET is not defined in environment variables");
}
    const token = jwt.sign({
     id : UserFound._id
    },JWT_USER_SECRET)
    res.json({
        token : token
    })
    }
    catch(e){
       res.status(404).json({
        error : "Inavlid Credentials"
       })
    }
})

app.post("/content",Authentication,async function(req,res){
    //@ts-ignore
    const userId = req.userID
    const link = req.body.link
    const type = req.body.type
    await ContentModel.create({
        link,
        type,
        userId,
        tags : []
    })

    res.json({
        mess : "Content created"
    })
    

})

app.get("/content",Authentication,async function(req,res){
    //@ts-ignore
    const userId = req.userID
      const content  = await ContentModel.find({
        userId
    }).populate("userId","Username")
    res.json({
        content 
    })
})

app.delete("/content",Authentication,async function(req,res){
    const contentId = req.body.contentId
    //@ts-ignore
    const userId = req.userID
    await ContentModel.deleteMany({
        userId,
        _id : contentId
    })
    res.json({
        mess : "content deleted"
    })
})

app.get("/",function(req,res){
    
})

const PORT = process.env.PORT
const mongoUrl = process.env.MONGO_URL!


const connectionEstabilished = async ()=> {
try{
await mongoose.connect(mongoUrl)
app.listen(PORT)
}
catch(e){
console.log(`Connection to database failed with this error : ${e}`)
}
}

connectionEstabilished()

