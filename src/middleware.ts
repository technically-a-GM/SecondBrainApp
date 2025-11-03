// import {z} from "zod"
// import express from "express"

// export const InputValidation  = (req,res,next)=>{


// const ValidateUser = z.object({
//     Username : z.string().min(4).max(20),
//     Password : z.string().min(4).max(20),
//     name : z.string().min(4).max(20),
//     age : z.number()


// })

// const result = ValidateUser.safeParse(req.body)

// if(result.success){
//     next()
// }
// else
// {
//     res.json({
//         error : result.error
//     })
// }

// }