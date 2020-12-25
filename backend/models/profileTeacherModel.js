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
    degreeImages: {
      type: [{ type: String }],
    },
    teacherAvatar: {
      type: String,
      required: true,
    },
    expImages: {
      type: [{ type: String }],
    },
    dateOfBirth: {
      type: Date,
    },
    hometown: {
      type: String,
    },
    communicationTool: {
      type: { type: String },
    },
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
      type: String,
    },
  },
  { timestamps: true }
)

const ProfileTeacher = mongoose.model('profileTeacher', ProfileTeacherSchema)

export default ProfileTeacher
