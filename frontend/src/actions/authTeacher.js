import api from '../utils/api'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  TEACHER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ALERT,
} from './types'
import { loadUser } from './auth'

// Register Teacher
export const registerTeacher = (formData) => async (dispatch) => {
  const { name, email, password } = formData

  try {
    const res = await api.post('/teachers/register-teacher', {
      name,
      email,
      password,
    })

    if (res) {
      dispatch(setAlert(res.data.msg, 'success'))
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }

    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

// Login Teacher
export const loginTeacher = (email, password) => async (dispatch) => {
  const body = { email, password }

  try {
    const res = await api.post('/teachers/login-teacher', body)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

// Logout
export const logoutTeacher = () => ({ type: LOGOUT })

// resend confirmation token
export const resendConfirmationToken = (email) => async (dispatch) => {
  try {
    const res = await api.post('/teachers/resend-confirmation-token', { email })

    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }
  }
}
