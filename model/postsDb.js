import { pool } from "../config/config.js";

const getPostsDb = async ()=>{
    let [data] = await pool.query('SELECT * FROM Posts')
    return data
}

const getSinglePostDb = async (id)=>{
    let [[data]] = await pool.query('SELECT * FROM Posts WHERE post_id = ?', [id])
    return data
}
const getSingleUserPostDb = async (id)=>{
    let [data] = await pool.query('SELECT * FROM Posts WHERE user_id = ?', [id])
    return data
}
const addPostDb = async(user_id,content,url)=>{
    await pool.query(`
    INSERT INTO Posts(user_id,content,url)
    VALUES (?,?,?)`,[user_id,content,url])
}
const deletePost = async(id)=>{
    await pool.query(`
    DELETE
    FROM Posts
    WHERE post_id=?`,[id])
}

const editPost = async(id,user_id,content,url)=>{
    let [data] = await pool.query(`
    UPDATE Posts
    SET user_id=?,content=?,url=?
    WHERE post_id=?`,[user_id,content,url,id])
    return data
}

export {getPostsDb, getSinglePostDb, addPostDb, deletePost, editPost,getSingleUserPostDb}