import mongoose from 'mongoose'

const ProfileTeacherSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher',
    },
    typeOfTeacher: {
      type: String,
      required: true,
    },
    isPro: {
      type: String,
    },
    isCommutor: {
      type: String,
    },
    degree: {
      type: String,
      required: true,
    },
    teacherAvatar: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
    },
    homeTown: {
      type: String,
    },
    communicationTool: {
      type: [{ type: String }],
    },
    introduction: {
      type: String,
      required: true,
    },
    introVideo: {
      type: String,
      required: true,
    },
    expImages: {
      type: [{ type: String }],
    },
  },
  { timestamps: true }
)

const ProfileTeacher = mongoose.model('profileTeacher', ProfileTeacherSchema)

export default ProfileTeacher
