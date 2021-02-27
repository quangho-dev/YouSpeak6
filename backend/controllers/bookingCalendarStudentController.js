import BookingCalendarStudent from '../models/bookingCalendarStudentModel.js'

// @route    POST api/booking-calendar-student
// @desc     Book a time for learning
// @access   Private
const bookTime = async (req, res) => {
  const { bookedTime, teacher, duration, lesson } = req.body

  try {
    const newBookedTime = new BookingCalendarStudent({
      user: req.user.id,
      bookedTime: bookedTime,
      teacher,
      duration,
      lesson,
    })

    const bookedTimeData = await newBookedTime.save()

    res.json(bookedTimeData)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
}

export { bookTime }
