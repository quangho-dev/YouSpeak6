import api from '../utils/api'
import { setAlert } from './alert'
import { SET_AVAILABLE_TIME_SUCCESS, SET_AVAILABLE_TIME_ERROR } from './types'
import { loadUser } from './auth'

// Set available time for teaching
export const setAvailableTime = (availableTimeArray) => async (dispatch) => {
  try {
    const res = await api.post('/booking-calendar-teacher', availableTimeArray)

    dispatch(setAlert('Đã đặt thời gian có thể dạy.', 'success'))
    dispatch({
      type: SET_AVAILABLE_TIME_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: SET_AVAILABLE_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
