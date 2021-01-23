import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
} from '../controllers/profileTeacherController.js'

router.get('/me', auth, getCurrentProfileTeacher)
router.post('/', auth, createOrUpdateProfileTeacher)

export default router
