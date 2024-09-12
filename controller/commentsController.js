import {getCommentsDb, getSingleCommentDb, addCommentDb, deleteComment,editComment} from '../model/commentsDb.js'
import { logInDb } from "../model/usersDb.js";

const fetchComments = async (req,res)=>{
    let postId = req.params.postId
    // console.log(postId);
    try{
        let comments = await getCommentsDb(postId)
        res.status(200).json(comments)
    }catch(err){
        console.log(err);
        res.status(500).json({err:"An error occured while fetching comments."})
    }
}

const fetchSingleComment = async(req,res)=>{
    try {
        let comment = await getSingleCommentDb(req.params.id)
        if(!comment){
            return res.status(404).json({err:"Comment not found."})
        }
        res.status(200).json(comment)
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"There is an issue with displaying single post"})
    }
}

const addComment = async (req,res)=>{
    let {post_id,comment_text} = req.body
    try {
        let user = await logInDb(req.user)
        await addCommentDb(post_id,user.user_id,comment_text)
        res.status(201).json({message:"Added Comment successfully"})
    } catch (err) {
        res.status(500).json({err:"There was an error with adding Comment"})
    }
}

const removeComment = async(req,res)=>{
    try {
        let deleted = await deleteComment(req.params.id)
        if(deleted === 0){
            return res.status(404).json({err:"Comment not found"})
        }
        res.status(200).json({message:"Comment has been removed"})
    } catch (err) {
        console.log(err);
        res.status(500).json({err:"There is an issue with removing this Comment"})
    }
}

const updateComment = async (req,res)=>{
    let {post_id,comment_text} = req.body
    try {
        let user = await logInDb(req.user)
        let post = await getSingleCommentDb(req.params.id)
        if (!post) {
            return res.status(404).json({ error: "Comment not found." });
        }

        post_id? post_id=post_id : post_id = post.post_id
        comment_text? comment_text=comment_text : comment_text = post.comment_text
    
        await editComment(req.params.id,post_id,user.user_id,comment_text)
        res.status(200).json({message:"Updated post successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({err:"There is an issue with updating post"})
    }
    

}

export {fetchComments, fetchSingleComment, addComment, updateComment, removeComment}

