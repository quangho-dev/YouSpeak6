import express from 'express'
const router = express.Router()
import { registerUser, loginUser } from '../controllers/userController.js'
import { check } from 'express-validator'
import auth from '../middleware/auth.js'
import checkRole from '../middleware/checkRole.js'

router.post(
  '/register-user',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    await registerUser(req, 'user', res)
  }
)

router
  .route('/login-user')
  .post(
    checkRole(['user']),
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    loginUser
  )

export default router
