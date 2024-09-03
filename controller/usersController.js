import { hash } from "bcrypt";
import { getUsersDb, getUserDb ,addUserDb, logInDb, editUserDb, deleteUserDb,getUserProfile} from "../model/usersDb.js";


const fetchUsers = async(req,res)=>{
    try{
        res.status(202).json(await getUsersDb())
    } catch(err){
        res.status(404).json({err:"There was an issue with fetching posts"})
    }
    
}

const fetchUser = async (req,res)=>{
    try {
        res.status(202).json(await getUserDb(req.params.id))
    } catch (err) {
        res.status(404).json({err:"There was an issue with fetching"})
    }
}
const fetchUserReq = async (req,res)=>{
    try {
        let user = await logInDb(req.user)
        // console.log(user.user_id)
        res.status(202).json(await getUserProfile(user.user_id))
    } catch (err) {
        res.status(404).json({err:"There was an issue with fetching"})
    }
}

const logIN = (req,res)=>{
   try {
        res.status(202).json({
            message:"User logged in successfully",
            token:req.body.token
        })
   } catch (err) {
    res.status(404).json({err:"There was an issue with logging in"})
   }
}

const addUser = async(req,res)=>{
    let {firstName,lastName,age,username,email,password,role,profile,background,gender} = req.body
    try{
        if (!firstName || !lastName || !age || !username || !email || !password || !gender) {
            return res.status(400).json({err:"Missing required fields" });
        }
        else{
            let oldEmail = (await logInDb(email)).email


            if(email == oldEmail){
            return res.status(400).json({message:"Email already exists"})
            }
            hash(password,12,async (err,hashedP)=>{
                if(err){
                    console.log(err)
                }
                await addUserDb(firstName,lastName,age,username,email,hashedP,role,profile,background,gender)
            })
            res.json({message:"User added successfully"})
                }
    } catch(err){
        res.status(404).json({err:"There was an issue with your registration"})
    }
    
}

const updateUser = async (req,res)=>{
    let {firstName,lastName,age,username,email,password,role,profile,background,gender} = req.body

    try {
        let user = await getUserDb(req.params.id)

        firstName? firstName=firstName : firstName=user.firstName
        lastName? lastName=lastName : lastName=user.lastName
        age? age=age : age=user.age
        username? username=username : username=user.username
        email? email=email : email=user.email
        role? role=role : role=user.role
        profile? profile=profile : profile=user.profile
        background? background=background : background=user.background
        gender? gender=gender : gender=user.gender
        if(password){
            hash(password,12,async (err,hashedP)=>{
                if(err){
                    console.log(hashedP)
                }
            })
            password = hashedP
            await editUserDb(req.params.id,firstName,lastName,age,username,email,hashedP,role,profile,background,gender)
        }else{
            password = user.password
            await editUserDb(req.params.id,firstName,lastName,age,username,email,password,role,profile,background,gender)
        }
        res.status(202).json({message:"User updated successfully"})
        
    } catch (err) {
        res.status(404).json({err:"There is an issue with updating user"})
    }
    

}
const removeUser = async(req,res)=>{
    try {
        await deleteUserDb(req.params.id)
        res.json({message:"User has been successfully removed"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with deleting data"})
    }
}


export {fetchUsers,fetchUser,addUser, logIN,updateUser,removeUser,fetchUserReq}