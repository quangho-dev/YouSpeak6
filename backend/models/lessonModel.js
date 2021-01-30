import mongoose from 'mongoose'
import { stringify } from 'uuid'

const LessonSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  lessonName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  periods: [
    {
      thirtyMinutes: {
        price: Number,
      },
      fortyFiveMinutes: { price: Number },
      oneHour: {
        price: Number,
      },
    },
  ],
  documents: [
    {
      fileName: String,
      filePath: String,
    },
  ],
})

const Lesson = mongoose.model('lesson', LessonSchema)

export default Lesson
