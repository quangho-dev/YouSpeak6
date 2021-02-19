import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import { setAvailableTime } from '../controllers/bookingCalendarTeacherController.js'

router.post('/', userAuth, setAvailableTime)

export default router
