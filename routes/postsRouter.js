import express from 'express'
import { fetchPosts, fetchSinglePost, addPost, removePost, updatePost} from '../controller/postsController.js'
import { verifyAToken } from '../middleware/authenticate.js'

const router = express.Router()

router.get('/',fetchPosts)
router.get('/:id',fetchSinglePost)
router.post('/add',verifyAToken,addPost)
router.delete('/delete/:id',removePost)
router.patch('/update/:id', updatePost)

export default router