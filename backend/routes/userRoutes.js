import express from 'express'
const router = express.Router()
import { registerUser } from '../controllers/userController.js'
import { check } from 'express-validator'

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  registerUser
)

export default router
