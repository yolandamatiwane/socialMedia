import { getPostsDb, getSinglePostDb, addPostDb, deletePost, editPost} from "../model/postsDb.js";

const fetchPosts = async (req,res)=>{
    try {
        res.status(202).json(await getPostsDb())
    } catch (err) {
        res.status(404).json({err:"There is an issue with displaying posts"})
    }
}

const fetchSinglePost = async(req,res)=>{
    try {
        res.status(202).json(await getSinglePostDb(req.params.id))
    } catch (err) {
        res.status(404).json({err:"There is an issue with displaying single post"})
    }
}

const addPost = async (req,res)=>{
    let {user_id,content} = req.body
    try {
        await addPostDb(user_id,content)
        res.status(202).json({message:"Added post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is a issue with adding post"})
    }
}

const removePost = async(req,res)=>{
    try {
        await deletePost(req.params.id)
        res.status(202).json({message:"Post has been removed"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with removing this post"})
    }
}

const updatePost = async (req,res)=>{
    let {user_id,content} = req.body
    try {
        let post = await getSinglePostDb(req.params.id)

        user_id? user_id=user_id : user_id = post.user_id
        content? content=content : content = post.content
    
        await editPost(req.params.id,user_id,content)
        res.status(202).json({message:"Updated post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with updating post"})
    }
    

}

export {fetchPosts, fetchSinglePost, addPost,removePost, updatePost}