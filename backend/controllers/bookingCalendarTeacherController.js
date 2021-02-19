import BookingCalendarTeacher from '../models/bookingCalendarModel.js'

// @route    POST api/booking-calendar-teacher
// @desc     Get set available time for teacher
// @access   Private
const setAvailableTime = async (req, res) => {
  const { availableTime } = req.body

  const availableTimeFields = {
    availableTime,
  }

  try {
    const bookingCalendarTeacher = await BookingCalendarTeacher.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { $set: availableTimeFields },
      { new: true, upsert: true }
    )

    if (!bookingCalendarTeacher) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(bookingCalendarTeacher)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export { setAvailableTime }
