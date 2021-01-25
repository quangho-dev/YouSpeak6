import api from '../utils/api'
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_ALERT,
  TEACHER_LOADED,
} from './types'

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

// Register User
export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/register-user', formData)

    dispatch(setAlert(res.data.msg, 'success', 10000))

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

// Register Teacher
export const registerTeacher = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/teachers/register-teacher', formData)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(setAlert(res.data.msg, 'success', 10000))

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

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password }

  try {
    const res = await api.post('/users/login-user', body)

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
export const logout = () => ({ type: LOGOUT })

export const resendConfirmationToken = (email) => async (dispatch) => {
  try {
    const res = await api.post('/users/resend-confirmation-token', { email })

    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }
  }
}
