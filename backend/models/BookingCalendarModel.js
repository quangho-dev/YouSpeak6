import mongoose from 'mongoose'

const BookingCalendarTeacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  availableTime: [
    {
      startTimeInterval: {
        type: Date,
      },
      endTimeInterval: {
        type: Date,
      },
    },
  ],
})

const BookingCalendarTeacher = mongoose.model(
  'bookingCalendarTeacher',
  BookingCalendarTeacherSchema
)

export default BookingCalendarTeacher
