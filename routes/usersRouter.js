import express from 'express'
import {checkUser,verifyAToken} from '../middleware/authenticate.js'
import { fetchUsers,fetchUser,addUser,logIN,updateUser,removeUser,fetchUserReq} from "../controller/usersController.js";

const router = express.Router()

router.post('/login',checkUser,logIN)

router.get('/',fetchUsers)
router.get('/user',verifyAToken,fetchUserReq)
router.get('/:id',fetchUser)
router.post('/register',addUser)
router.patch('/update/:id',updateUser)
router.delete('/delete/:id',removeUser)


export default router