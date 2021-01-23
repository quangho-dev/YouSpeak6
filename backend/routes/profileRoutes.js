import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import setUser from '../middleware/setUser.js'
import authRole from '../middleware/authRole.js'
import {
  getCurrentProfile,
  createOrUpdateProfile,
} from '../controllers/profileController.js'
import { userAuth } from '../utils/authPassport.js'

router.get('/me', userAuth, getCurrentProfile)
router.post('/', userAuth, createOrUpdateProfile)

export default router
