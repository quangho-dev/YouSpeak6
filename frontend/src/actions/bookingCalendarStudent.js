import api from '../utils/api'
import { setAlert } from './alert'
import { BOOK_TIME_SUCCESS, BOOK_TIME_ERROR } from './types'
// Book time for learning
export const bookTime = (bookedTime) => async (dispatch) => {
  try {
    const res = await api.post('/booking-calendar-student', bookedTime)

    console.log('values:', bookedTime)

    dispatch(setAlert('Bạn đã đặt lịch học thành công!', 'success'))

    dispatch({
      type: BOOK_TIME_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: BOOK_TIME_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
