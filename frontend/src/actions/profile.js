import api from '../utils/api'
import { setAlert } from './alert'

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS,
  SET_ALERT,
} from './types'

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get('/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create or update profile
export const createOrUpdateProfile = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const res = await api.post('/profile', formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })

    // if (!edit) {
    //   history.push('/dashboard')
    // }
    // dispatch(setAlert(edit ? {'Profile Updated', 'success'} : {'Profile Created', 'success'}))

    dispatch(
      edit
        ? {
            type: SET_ALERT,
            payload: {
              msg: 'Thông tin người dùng đã cập nhật',
              severity: 'success',
            },
          }
        : {
            type: SET_ALERT,
            payload: {
              msg: 'Thông tin người dùng đã được tạo',
              severity: 'success',
            },
          }
    )

    // if (!edit) {
    //   history.push('/dashboard')
    // }
  } catch (err) {
    const errors = err.response.data.errors

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    // }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile')

      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert('Your account has been permanently deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
