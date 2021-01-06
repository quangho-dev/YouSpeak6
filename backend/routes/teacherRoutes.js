import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import {
  loginTeacher,
  registerTeacher,
} from '../controllers/teacherController.js'
import { check } from 'express-validator'
import checkRole from '../middleware/checkRole.js'

router
  .route('/login-teacher')
  .post(
    checkRole(['teacher']),
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    loginTeacher
  )

router.post(
  '/register-teacher',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    await registerTeacher(req, 'teacher', res)
  }
)

export default router
