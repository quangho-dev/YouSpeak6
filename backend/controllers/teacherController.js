import Teacher from '../models/teacherModel.js'
import { validationResult } from 'express-validator'
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// @desc    Register a new teacher
// @route   POST /api/teachers
// @access  Public
const registerTeacher = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  try {
    let teacher = await Teacher.findOne({ email })

    if (teacher) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Tài khoản giáo viên này đã tồn tại.' }] })
    }

    teacher = new Teacher({
      name,
      email,
      password,
    })

    const salt = await bcrypt.genSalt(10)

    teacher.password = await bcrypt.hash(password, salt)

    await teacher.save()

    const payload = {
      teacher: {
        id: teacher.id,
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

// @route    POST api/teachers/login-teacher
// @desc     Login teacher and get token
// @access   Public
const loginTeacher = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body

  try {
    let user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
    }

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

export { registerTeacher, loginTeacher }
