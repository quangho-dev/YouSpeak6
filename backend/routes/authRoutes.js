import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import { authUser, getUserByToken } from '../controllers/authController.js'
import { check } from 'express-validator'

router
  .route('/')
  .get(auth, getUserByToken)
  .post(
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    authUser
  )

export default router
