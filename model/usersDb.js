import { pool } from "../config/config.js";


const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM Users')
    return data
}

const getUserDb = async (id)=>{
    let [[data]] = await pool.query(`
    SELECT *
    FROM Users
    WHERE user_id = ?`,[id])
    return data
}

const logInDb= async(email)=>{
    let [[data]] = await pool.query(`
    SELECT *
    FROM Users
    WHERE email = ?`,[email])
    return data?data:''
}

const addUserDb = async(firstName,lastName,age,username,email,password)=>{
    await pool.query(`
        INSERT INTO Users(firstName,lastName,age,username,email,password)
        VALUES(?,?,?,?,?,?)`,[firstName,lastName,age,username,email,password]
    )
}

const editUserDb = async(id,firstName,lastName,age,username,email,password)=>{
    let [data] = await pool.query(`
    UPDATE Users
    SET firstName=?,lastName=?,age=?,username=?,email=?,password=?
    WHERE user_id=?`,[firstName,lastName,age,username,email,password,id])
    return data
}

const deleteUserDb = async(id)=>{
    await pool.query(`
        DELETE
        FROM Users
        WHERE user_id=?`,[id])
}


export {getUsersDb, getUserDb, logInDb,addUserDb, editUserDb, deleteUserDb}