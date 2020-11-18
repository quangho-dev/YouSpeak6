import { SET_ALERT, CLOSE_ALERT } from './types'

export const setAlert = ({ msg, severity, openAlert }) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, severity, openAlert },
  })
}

export const closeAlert = (dispatch) => {
  dispatch({ type: CLOSE_ALERT })
}
