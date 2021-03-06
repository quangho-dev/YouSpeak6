import api from '../utils/api'
import { setAlert } from './alert'

import {
  GET_PROFILE_TEACHER,
  PROFILE_TEACHER_ERROR,
  CLEAR_PROFILE_TEACHER,
  ACCOUNT_DELETED,
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

    dispatch(
      setAlert(
        edit
          ? 'Thông tin giáo viên đã được cập nhật'
          : 'Thông tin giáo viên đã được tạo',
        'success'
      )
    )

    if (!edit) {
      history.push('/teachers/dashboard')
    }
  } catch (err) {
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
