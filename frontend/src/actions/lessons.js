import {
  GET_LESSONS,
  LESSON_ERROR,
  UPDATE_LESSON,
  CREATE_LESSON,
} from './types'
import api from '../utils/api'
import { setAlert } from './alert'

// get all lessons of current teacher
export const getLessons = () => async (dispatch) => {
  try {
    const res = await api.get('/teachers/lessons/me')

    dispatch({
      type: GET_LESSONS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    })
  }
}

export const createALesson = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/teachers/lessons', formData)

    dispatch({
      type: CREATE_LESSON,
      payload: res.data,
    })

    dispatch(setAlert('Bài học đã được tạo', 'success'))
  } catch (err) {
    dispatch({
      type: LESSON_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
