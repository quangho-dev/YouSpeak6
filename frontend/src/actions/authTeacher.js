import api from '../utils/api'
import { setAlert } from './alert'
import {
  REGISTER_TEACHER_SUCCESS,
  REGISTER_TEACHER_FAIL,
  TEACHER_LOADED,
  AUTH_TEACHER_ERROR,
  LOGIN_TEACHER_SUCCESS,
  LOGIN_TEACHER_FAIL,
  LOGOUT_TEACHER,
  SET_ALERT,
} from './types'

// Load Teacher
export const loadTeacher = () => async (dispatch) => {
  try {
    const res = await api.get('/auth-teacher')

    dispatch({
      type: TEACHER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_TEACHER_ERROR,
    })
  }
}

// Register Teacher
export const registerTeacher = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/teachers', formData)

    if (res) {
      dispatch({
        type: SET_ALERT,
        payload: {
          msg: 'Đăng ký thành công!',
          severity: 'success',
        },
      })
    }

    dispatch({
      type: REGISTER_TEACHER_SUCCESS,
      payload: res.data,
    })
    dispatch(loadTeacher())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }

    dispatch({
      type: REGISTER_TEACHER_FAIL,
    })
  }
}

// Login Teacher
export const loginTeacher = (email, password) => async (dispatch) => {
  const body = { email, password }

  try {
    const res = await api.post('/auth-teacher', body)

    dispatch({
      type: LOGIN_TEACHER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadTeacher())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }

    dispatch({
      type: LOGIN_TEACHER_FAIL,
    })
  }
}

// Logout
export const logoutTeacher = () => ({ type: LOGOUT_TEACHER })
