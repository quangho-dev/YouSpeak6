import BookingCalendarTeacher from '../models/bookingCalendarModel.js'

// @route    POST api/booking-calendar-teacher
// @desc     Set available time for teacher
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

// @route    GET api/booking-calendar-teacher/me
// @desc     Get available time of teacher
// @access   Private
const getAvailableTime = async (req, res) => {
  try {
    const availableTime = await BookingCalendarTeacher.findOne({
      user: req.user.id,
    }).populate('user', ['name'])

    if (!availableTime) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(availableTime)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

// @route    GET api/booking-calendar-teacher/:teacherCalendarId
// @desc     Get available time of a specific
// @access   Private
const getAvailableTimeOfATeacher = async (req, res) => {
  try {
    const availableTime = await BookingCalendarTeacher.findOne({
      user: req.params.teacherCalendarId,
    }).populate('user', ['name'])

    if (!availableTime) {
      return res
        .status(400)
        .json({ msg: 'Không có lịch dạy của giáo viên này.' })
    }

    res.json(availableTime)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
}

export { setAvailableTime, getAvailableTime, getAvailableTimeOfATeacher }
