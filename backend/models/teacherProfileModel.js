import mongoose from 'mongoose'

const TeacherProfileSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teacher',
    },
    typeOfTeacher: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
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
  },
  { timestamps: true }
)

const TeacherProfile = mongoose.model('teacherProfile', TeacherProfileSchema)

export default TeacherProfile
