import { pool } from "../config/config.js";

const getCommentsDb = async (postId)=>{
    let [data] = await pool.query(`
    SELECT *,firstName,lastName,profile
    FROM Comments
    INNER JOIN Users
    ON Comments.user_id = Users.user_id
    WHERE post_id=?`,[postId])
    return data
}

const getSingleCommentDb = async (id)=>{
    let [[data]] = await pool.query('SELECT * FROM Comments WHERE comment_id = ?', [id])
    return data
}
const addCommentDb = async(post_id,user_id,comment_text)=>{
    await pool.query(`
    INSERT INTO Comments(post_id,user_id,comment_text)
    VALUES (?,?,?)`,[post_id,user_id,comment_text])
}
const deleteComment = async(id)=>{
    await pool.query(`
    DELETE
    FROM Comments
    WHERE comment_id=?`,[id])
}

const editComment = async(id,post_id,user_id,comment_text)=>{
    let [data] = await pool.query(`
    UPDATE Comments
    SET post_id=?,user_id=?,comment_text=?
    WHERE comment_id=?`,[post_id,user_id,comment_text,id])
    return data
}

export {getCommentsDb, getSingleCommentDb, addCommentDb, deleteComment,editComment}