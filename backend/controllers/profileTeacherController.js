import ProfileTeacher from '../models/profileTeacherModel.js'
import User from '../models/userModel.js'

// @route    GET api/profileTeacher/me
// @desc     Get current teacher profile
// @access   Private
const getCurrentProfileTeacher = async (req, res) => {
  try {
    const profileTeacher = await ProfileTeacher.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!profileTeacher) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this teacher' })
    }

    res.json(profileTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    POST api/profileTeacher
// @desc     Create or update teacher profile
// @access   Private
const createOrUpdateProfileTeacher = async (req, res) => {
  const {
    typeOfTeacher,
    degreeImages,
    teacherAvatar,
    dateOfBirth,
    hometown,
    communicationTool,
    introduction,
    video,
    expImages,
    thumbnail,
    videoDuration,
  } = req.body

  const profileTeacherFields = {
    user: req.user.id,
    typeOfTeacher,
    degreeImages,
    teacherAvatar,
    dateOfBirth,
    hometown,
    communicationTool,
    introduction,
    video,
    expImages,
    thumbnail,
    videoDuration,
  }

  try {
    // Using upsert option (creates new doc if no match is found):
    let profileTeacher = await ProfileTeacher.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileTeacherFields },
      { new: true, upsert: true }
    )

    res.json(profileTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export { getCurrentProfileTeacher, createOrUpdateProfileTeacher }
