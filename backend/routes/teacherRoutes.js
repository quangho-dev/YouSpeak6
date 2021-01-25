import express from 'express'
const router = express.Router()
import {
  loginTeacher,
  registerTeacher,
  confirmationGet,
  resendTokenPost,
} from '../controllers/teacherController.js'
import { check } from 'express-validator'

router
  .route('/login-teacher')
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    async (req, res) => {
      await loginTeacher(req, 'teacher', res)
    }
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

router.get('/confirmation/:token', confirmationGet)

router.post('/resend-confirmation-token', resendTokenPost)

export default router
