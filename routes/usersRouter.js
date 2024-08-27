import express from 'express'
import { fetchUsers } from "../controller/usersController.js";

const router = express.Router()
router.get('/',fetchUsers)

export default router