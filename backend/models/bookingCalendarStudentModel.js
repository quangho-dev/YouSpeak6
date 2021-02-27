import mongoose from 'mongoose'

const BookingCalendarStudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  bookedTime: [{ start: Date, end: Date, id: String, title: String }],
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
  },
  duration: Number,
  price: Number,
})

const BookingCalendarStudent = mongoose.model(
  'bookingCalendarStudent',
  BookingCalendarStudentSchema
)

export default BookingCalendarStudent
