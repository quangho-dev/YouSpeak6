import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {
  getCurrentProfile,
  createOrUpdateProfile,
} from '../controllers/profileController.js'
import { check } from 'express-validator'

router.get('/me', auth, getCurrentProfile)
router.post('/', auth, createOrUpdateProfile)

export default router
