import { type Request , type Response, type NextFunction, response } from "express"
import { z} from "zod"
import { UserModel } from "./db.js"
import jwt from "jsonwebtoken"
import { JWT_USER_SECRET } from "./config.js"

export const InputValidation  = async (req : Request,res : Response, next : NextFunction)=>{


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



if(result.success&& !duplicateUser){
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

}






export const Authentication = async (req : Request, res : Response , next : NextFunction) =>{
const token = req.headers["token"]
try{
     if (!JWT_USER_SECRET) {
  throw new Error("JWT_USER_SECRET is not defined in environment variables");
}

}
catch(e){
  return  res.status(404).json({
        error : e
       })
}
const result = jwt.verify(token as string , JWT_USER_SECRET)
if(result) {
    //@ts-ignore
    req.userID  = result.id
    next()
}

else{
    res.status(404).json({
        error : "Wrong user"
    })
}

}