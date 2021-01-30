import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
} from '../controllers/profileTeacherController.js'

router.get('/me', userAuth, getCurrentProfileTeacher)
router.post('/', userAuth, createOrUpdateProfileTeacher)

export default router
