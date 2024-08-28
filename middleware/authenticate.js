import { compare } from "bcrypt";
import { logInDb } from "../model/usersDb.js";
import jwt from 'jsonwebtoken'
import {config} from 'dotenv'
config()


const checkUser = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email||!password){
        return res.send("Missing required fields")
    }
    let hashedPassword = (await logInDb(email)).password
    console.log(hashedPassword)
    let result = await compare(password,hashedPassword)

    if(result){
        let token = jwt.sign({
            email,
            password
        },
        process.env.SECRET_KEY,
        {
            expiresIn:'1h'
        })
        req.body.token = token
        next()
    } else{
        res.send("Invalid email or password")
    }
}

export {checkUser}