import api from '../utils/api'
import { setAlert } from './alert'

import {
  GET_PROFILE_TEACHER,
  GET_PROFILES,
  PROFILE_TEACHER_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE_TEACHER,
  ACCOUNT_DELETED,
  GET_REPOS,
  NO_REPOS,
  SET_ALERT,
} from './types'

// Get current teachers profile
export const getCurrentProfileTeacher = () => async (dispatch) => {
  try {
    const res = await api.get('/profileTeacher/me')

    dispatch({
      type: GET_PROFILE_TEACHER,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Create or update profile
export const createOrUpdateProfileTeacher = (
  formData,
  history,
  edit = false
) => async (dispatch) => {
  try {
    const res = await api.post('/profileTeacher', formData)

    dispatch({
      type: GET_PROFILE_TEACHER,
      payload: res.data,
    })

    // dispatch(setAlert(edit ? {'Profile Updated', 'success'} : {'Profile Created', 'success'}))

    dispatch(
      edit
        ? {
            type: SET_ALERT,
            payload: {
              msg: 'Thông tin giáo viên đã cập nhật',
              severity: 'success',
            },
          }
        : {
            type: SET_ALERT,
            payload: {
              msg: 'Thông tin giáo viên đã được tạo',
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
      type: PROFILE_TEACHER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/profile')

      dispatch({ type: CLEAR_PROFILE_TEACHER })
      dispatch({ type: ACCOUNT_DELETED })

      dispatch(setAlert('Your account has been permanently deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_TEACHER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
