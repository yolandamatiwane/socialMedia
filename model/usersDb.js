import { pool } from "../config/config.js";

const getUsersDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM Users')
    return data
}



export {getUsersDb}