import api from '../utils/api'
import { setAlert } from './alert'
import {
  BOOK_TIME_SUCCESS,
  BOOK_TIME_ERROR,
  CANCEL_BOOKED_LESSON_SUCCESS,
  CANCEL_BOOKED_LESSON_ERROR,
  GET_ALL_BOOKED_LESSONS_SUCCESS,
  GET_ALL_BOOKED_LESSONS_ERROR,
  GET_BOOKED_LESSON_SUCCESS,
  GET_BOOKED_LESSON_ERROR,
} from './types'

// Book time for learning
export const bookTime = (bookedTime) => async (dispatch) => {
  try {
    await api.post('/booking-calendar-student', bookedTime)

    dispatch(setAlert('Bạn đã đặt lịch học thành công!', 'success'))

    dispatch({
      type: BOOK_TIME_SUCCESS,
      payload: { id1: bookedTime.id1, id2: bookedTime.id2 },
    })
  } catch (err) {
    dispatch({
      type: BOOK_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Cancel a booked lesson
export const cancelBookedLesson = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.delete(
      `/booking-calendar-student/cancel-booked-lesson/${bookedLessonId}`
    )

    dispatch(setAlert('Đã hủy bài học', 'info'))

    dispatch({
      type: CANCEL_BOOKED_LESSON_SUCCESS,
      payload: { res, bookedLessonId },
    })
  } catch (err) {
    dispatch({
      type: CANCEL_BOOKED_LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get all booked lessons
export const getBookedLessons = () => async (dispatch) => {
  try {
    const res = await api.get('/booking-calendar-student/bookedLessons')

    dispatch({
      type: GET_ALL_BOOKED_LESSONS_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_ALL_BOOKED_LESSONS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get booked lesson by id
export const getBookedLessonById = (bookedLessonId) => async (dispatch) => {
  try {
    const res = await api.get(`/booking-calendar-student/${bookedLessonId}`)

    dispatch({
      type: GET_BOOKED_LESSON_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: GET_BOOKED_LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
