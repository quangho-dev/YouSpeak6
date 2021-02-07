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
        isChosen: Boolean,
        price: Number,
      },
    },
    { fortyFiveMinutes: { isChosen: Boolean, price: Number } },
    {
      oneHour: {
        isChosen: Boolean,
        price: Number,
      },
    },
  ],
  documents: [
    {
      documentName: String,
      fileDocument: String,
    },
  ],
})

const Lesson = mongoose.model('lesson', LessonSchema)

export default Lesson
