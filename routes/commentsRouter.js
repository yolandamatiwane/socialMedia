import express from 'express'
import { fetchComments, fetchSingleComment, addComment, updateComment, removeComment} from '../controller/commentsController.js'
import { verifyAToken  } from '../middleware/authenticate.js'
const router = express.Router()

router.get('/:id',verifyAToken,fetchSingleComment)
router.get('/:postId/comments',verifyAToken,fetchComments)
router.post('/comment',verifyAToken,addComment)
router.delete('/delete/:id',verifyAToken,removeComment)
router.patch('/:postId/comments/:id',verifyAToken, updateComment)
export default router