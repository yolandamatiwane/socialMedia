import express from 'express'
import { fetchPosts, fetchSinglePost, addPost, removePost, updatePost} from '../controller/postsController.js'
import { verifyAToken } from '../middleware/authenticate.js'

const router = express.Router()

router.get('/',verifyAToken,fetchPosts)
router.get('/:id',verifyAToken,fetchSinglePost)
router.post('/add',verifyAToken,addPost)
router.delete('/delete/:id',verifyAToken,removePost)
router.patch('/update/:id',verifyAToken,updatePost)
export default router