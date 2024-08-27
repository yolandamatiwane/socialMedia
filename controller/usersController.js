import { getUsersDb } from "../model/usersDb.js";


const fetchUsers = async(req,res)=>{
    try{
        res.json(await getUsersDb())
    } catch(err){
        res.json({message:"There was a problem with getting users"})
    }
}

export {fetchUsers}