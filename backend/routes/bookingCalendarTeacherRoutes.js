import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import {
  setAvailableTime,
  getAvailableTime,
  getAvailableTimeOfATeacher,
} from '../controllers/bookingCalendarTeacherController.js'
import checkObjectId from '../middleware/checkObjectId.js'

router.post('/', userAuth, setAvailableTime)

router.get('/me', userAuth, getAvailableTime)

router.get(
  '/:teacherCalendarId',
  checkObjectId('teacherCalendarId'),
  userAuth,
  getAvailableTimeOfATeacher
)

export default router
