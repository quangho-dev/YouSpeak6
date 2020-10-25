import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

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
      isAdmin: user.isAdmin,
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
      avatar: user.avatar,
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
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.avatar = req.body.avatar || user.avatar
    user.dashboardID = req.body.dashboardID || user.dashboardID
    user.address = req.body.address || user.address
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
    user.gender = req.body.gender || user.gender
    user.englishLevel = req.body.englishLevel || user.englishLevel
    user.communicationTool = req.body.communicationTool || user.communicationTool
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      avatar: updatedUser.isAdmin,
      address: updatedUser.address,
      dateOfBirth: updatedUser.dateOfBirth,
      gender: updatedUser.gender,
      englishLevel: updatedUser.englishLevel,
      dashboardID: updatedUser.dashboardID,
      communicationTool: updatedUser.communicationTool,
      introduction: updatedUser.introduction,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('Không tìm thấy người dùng')
  }
})

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUserProfile 
}
