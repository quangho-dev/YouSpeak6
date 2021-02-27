import express from 'express'
const router = express.Router()
import { userAuth } from '../utils/authPassport.js'
import { bookTime } from '../controllers/bookingCalendarStudentController.js'

router.post('/', userAuth, bookTime)

export default router
