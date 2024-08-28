import express from 'express'
import { fetchPosts, fetchSinglePost, addPost, removePost, updatePost} from '../controller/postsController.js'

const router = express.Router()

router.get('/',fetchPosts)
router.get('/:id',fetchSinglePost)
router.post('/add',addPost)
router.delete('/delete/:id',removePost)
router.patch('/update/:id', updatePost)
export default router