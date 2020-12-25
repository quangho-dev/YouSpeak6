import ProfileTeacher from '../models/profileTeacherModel.js'
import Teacher from '../models/teacherModel.js'

// @route    GET api/me
// @desc     Get current teacher profile
// @access   Private
const getCurrentProfileTeacher = async (req, res) => {
  try {
    const profileTeacher = await ProfileTeacher.findOne({
      teacher: req.teacher.id,
    }).populate('teacher', ['name'])

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

// @route    POST api/profile
// @desc     Create or update teacher profile
// @access   Private
const createOrUpdateProfileTeacher = async (req, res) => {
  console.log('this is req.user:', req.body)
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
    teacher: req.teacher.id,
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
      { teacher: req.teacher.id },
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
