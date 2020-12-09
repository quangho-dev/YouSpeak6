import express from 'express'
const router = express.Router()
import authTeacher from '../middleware/authTeacher.js'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
} from '../controllers/profileTeacherController.js'
import { check } from 'express-validator'

router.get('/me', authTeacher, getCurrentProfileTeacher)
router.post('/', authTeacher, createOrUpdateProfileTeacher)

export default router
