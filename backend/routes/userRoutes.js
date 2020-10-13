import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser)

export default router
