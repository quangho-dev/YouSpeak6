import User from '../models/userModel.js'
import { validationResult } from 'express-validator'
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
    }

    user = new User({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    await user.save()

    const payload = {
      user: {
        id: user.id,
      },
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '5 days' },
      (err, token) => {
        if (err) throw err
        res.json({ token })
      }
    )
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export { registerUser }
