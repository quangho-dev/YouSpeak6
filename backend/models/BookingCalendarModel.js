import mongoose from 'mongoose'

const BookingCalendarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  availableTime: [Date],
  bookedTime: [Date],
})

const BookingCalendar = mongoose.model('bookingCalendar', BookingCalendarSchema)

export default BookingCalendar
