import express from 'express'
const router = express.Router()
import auth from '../middleware/auth.js'
import { authUser, getUserByToken } from '../controllers/authController.js'
import { check } from 'express-validator'
import checkRole from '../middleware/checkRole.js'

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, getUserByToken)

// Login user
router
  .route('/login-user')
  .get(auth, checkRole(['user']), getUserByToken)
  .post(
    checkRole(['user']),
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    authUser
  )

export default router
