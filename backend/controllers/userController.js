import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import HttpError from '../models/http-error.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      imageAvatar: user.imageAvatar,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      englishLevel: user.englishLevel,
      dashboardID: user.dashboardID,
      communicationTool: user.communicationTool,
      introduction: user.introduction,
    })
  } else {
    res.status(404)
    throw new Error('Không tìm thấy người dùng')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res, next) => {
  let user
  try {
    user = await User.findById(req.user._id)
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    )
    return next(error)
  }

  user.name = req.body.name || user.name
  user.email = req.body.email || user.email
  user.imageAvatar = req.body.imageAvatar || user.imageAvatar
  user.address = req.body.address || user.address
  user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
  user.gender = req.body.gender || user.gender
  user.englishLevel = req.body.englishLevel || user.englishLevel
  user.communicationTool = req.body.communicationTool || user.communicationTool
  user.introduction = req.body.introduction || user.introduction
  if (req.body.password) {
    user.password = req.body.password
  }

  try {
    await user.save()
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update user.',
      500
    )
    return next(error)
  }

  res.status(200).json({ user: user.toObject({ getters: true }) })
}

export { authUser, registerUser, updateUserProfile, getUserProfile }
