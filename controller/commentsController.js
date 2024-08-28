import {getCommentsDb, getSingleCommentDb, addCommentDb, deleteComment,editComment} from '../model/commentsDb.js'

const fetchComments = async (req,res)=>{
    try {
        res.status(202).json(await getCommentsDb())
    } catch (err) {
        res.status(404).json({err:"There is an issue with displaying posts"})
    }
}

const fetchSingleComment = async(req,res)=>{
    try {
        res.status(202).json(await getSingleCommentDb(req.params.id))
    } catch (err) {
        res.status(404).json({err:"There is an issue with displaying single post"})
    }
}

const addComment = async (req,res)=>{
    let {post_id,user_id,comment_text} = req.body
    try {
        await addCommentDb(post_id,user_id,comment_text)
        res.status(202).json({message:"Added Comment successfully"})
    } catch (err) {
        res.status(404).json({err:"There is a issue with adding Comment"})
    }
}

const removeComment = async(req,res)=>{
    try {
        await deleteComment(req.params.id)
        res.status(202).json({message:"Comment has been removed"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with removing this Comment"})
    }
}

const updateComment = async (req,res)=>{
    let {post_id,user_id,comment_text} = req.body
    try {
        let post = await getSingleCommentDb(req.params.id)

        post_id? post_id=post_id : post_id = post.post_id
        user_id? user_id=user_id : user_id = post.user_id
        comment_text? comment_text=comment_text : comment_text = post.comment_text
    
        await editComment(req.params.id,post_id,user_id,comment_text)
        res.status(202).json({message:"Updated post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with updating post"})
    }
    

}

export {fetchComments, fetchSingleComment, addComment, updateComment, removeComment}

