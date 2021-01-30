import mongoose from 'mongoose'

const ProfileTeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    typeOfTeacher: {
      type: String,
      required: true,
    },
    degreeImages: {
      type: [String],
    },
    teacherAvatar: {
      type: String,
      required: true,
    },
    expImages: {
      type: [String],
    },
    dateOfBirth: {
      type: Date,
    },
    hometown: {
      type: String,
    },
    communicationTool: [String],
    introduction: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    videoDuration: {
      type: Number,
    },
    lesson: {
      type: Number,
      default: 0,
    },
    trialRate: {
      type: Number,
    },
    hourlyRateFrom: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

const ProfileTeacher = mongoose.model('profileTeacher', ProfileTeacherSchema)

export default ProfileTeacher
