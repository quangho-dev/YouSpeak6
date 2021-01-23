import api from '../utils/api'
import { setAlert } from './alert'

export const sendForgotPassword = (email) => async (dispatch) => {
  try {
    const res = await api.post('/forgot', { email })

    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    const error = err.response.data.error

    dispatch(setAlert(error, 'error'))
  }
}

export const resetPassword = ({ password, token }) => async (dispatch) => {
  try {
    const res = await api.post(`/reset/${token}`, { password })

    dispatch(setAlert(res.data.msg, 'success'))
  } catch (err) {
    const error = err.response.data.msg

    dispatch(setAlert(error, 'error'))
  }
}
