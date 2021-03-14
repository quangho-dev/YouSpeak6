import Profile from '../models/profileModel.js'
import User from '../models/userModel.js'

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
const createOrUpdateProfile = async (req, res) => {
  const {
    address,
    imageAvatar,
    dateOfBirth,
    gender,
    englishLevel,
    skypeId,
    introduction,
    phoneNumber,
  } = req.body

  const profileFields = {
    user: req.user.id,
    address,
    imageAvatar,
    dateOfBirth,
    gender,
    englishLevel,
    skypeId,
    introduction,
    phoneNumber,
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, upsert: true }
    )

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export { getCurrentProfile, createOrUpdateProfile }
