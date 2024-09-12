import express from 'express'
import { fetchPosts, fetchSinglePost, addPost, removePost, updatePost,fetchSingleUserPost, updatePostLog,removePostLog} from '../controller/postsController.js'
import { verifyAToken } from '../middleware/authenticate.js'

const router = express.Router()

router.get('/',verifyAToken,fetchPosts)
router.get('/post',verifyAToken,fetchSingleUserPost)
router.get('/:id',verifyAToken,fetchSinglePost)
router.post('/',verifyAToken,addPost)
router.delete('/post/:id',verifyAToken,removePost)
router.delete('/delete/log/:id',verifyAToken,removePostLog)
router.patch('/post/:id',verifyAToken,updatePost)
router.patch('/update/log/:id',verifyAToken,updatePostLog)
export default router