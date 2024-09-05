import { getPostsDb, getSinglePostDb, addPostDb, deletePost, editPost, getSingleUserPostDb} from "../model/postsDb.js";
import { logInDb } from "../model/usersDb.js";

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
const fetchSingleUserPost = async(req,res)=>{
    // try {
        let user = await logInDb(req.user)
        console.log(user.user_id)
        res.status(202).json(await getSingleUserPostDb(user.user_id))
    // } catch (err) {
    //     res.status(404).json({err:"There is an issue with displaying single post"})
    // }
}

const addPost = async (req,res)=>{
    let {content,url} = req.body
    let user = await logInDb(req.user)

    try {
        await addPostDb(user.user_id,content,url)
        res.status(202).json({message:"Added post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is a issue with adding post"})
    }
}
// deleting post in admin 
const removePost = async(req,res)=>{
    try {
        await deletePost(req.params.id)
        res.status(202).json({message:"Post has been removed"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with removing this post"})
    }
}

// deleting posts only if login userId == post.user_id
const removePostLog = async(req,res)=>{
    let post = await getSinglePostDb(req.params.id)
    let user = await logInDb(req.user)
    try {
        if(user.user_id == post.user_id){
            await deletePost(req.params.id)
            res.status(202).json({message:"Post has been removed"})
        }
        else{
            res.status(404).json({err:"You are not authorized to remove this post"})
        }
    } catch (err) {
        res.status(404).json({err:"There is an issue with removing this post"})
    }
}
// updating posts in the Admin
const updatePost = async (req,res)=>{
    let {user_id,content,url} = req.body
    try {
        let post = await getSinglePostDb(req.params.id)

        user_id? user_id=user_id : user_id = post.user_id
        content? content=content : content = post.content
        url? url=url : url = post.url
    
        await editPost(req.params.id,user_id,content,url)
        res.status(202).json({message:"Updated post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with updating post"})
        throw err
    }
}
// updating posts that match your userId
const updatePostLog = async (req,res)=>{
    let {content,url} = req.body
    let user = await logInDb(req.user)
    try {
        let post = await getSinglePostDb(req.params.id)

        if (user.user_id !== post.user_id) {
             res.status(403).json({ err: "You are not authorized to edit this post" });
        }

        content? content=content : content = post.content
        url? url=url : url = post.url
    
        await editPost(req.params.id,user.user_id,content,url)
        res.status(202).json({message:"Updated post successfully"})
    } catch (err) {
        res.status(404).json({err:"There is an issue with updating post"})
        // throw err
    }
}

export {fetchPosts, fetchSinglePost, addPost,removePost, updatePost,fetchSingleUserPost, updatePostLog, removePostLog}