import express from 'express'
import { fetchComments, fetchSingleComment, addComment, updateComment, removeComment} from '../controller/commentsController.js'

const router = express.Router()

router.get('/',fetchComments)
router.get('/:id',fetchSingleComment)
router.post('/add',addComment)
router.delete('/delete/:id',removeComment)
router.patch('/update/:id', updateComment)
export default router