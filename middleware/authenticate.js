import { compare } from "bcrypt";
import { logInDb } from "../model/usersDb.js";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()


const checkUser = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email||!password){
        return res.status(400).json({err:"Missing required fields"})
    }
    try {
        let user = await logInDb(email)
        // console.log(user)
        if(!user){
           return res.status(400).json({message:"invalid email"})
        }

        let hashedPassword = user.password
        let role = user.role
        let user_id = user.user_id

        let result = await compare(password,hashedPassword)
    
        if(result){
            let token = jwt.sign({email:email,user_id:user_id,role:role},process.env.SECRET_KEY,{expiresIn:'1h'})
            console.log(email)
            req.body.token = token
            // res.status(202).json({token})
            next()
        } else{
            res.status(400).json({err:"Invalid email or password"})
        }
    } catch (err) {
        res.status(500).json({ err: "Internal server error" })
    }
}

const verifyAToken = (req,res,next)=>{
    let {cookie} = req.headers
    // console.log(cookie);
    
    // checks if token exists first
    let token = cookie && cookie.split("=")[1] // if there is a cookie, then we can split it
    let secToken = token.split(';')[0]
    // console.log(token)
    // if(!token){
    //     return res.status(401).json({message:"Unauthorized"})
    // }
    jwt.verify(secToken,process.env.SECRET_KEY,(err,decoded)=>{
        if(err){
            res.json({message:'Token is invalid'})
            // throw err 
        }
        // req.body.username = decoded.username
        req.user = decoded.email
         console.log(req.user)
        next()
    })
}
export {checkUser,verifyAToken}