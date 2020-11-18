import { SET_ALERT, CLOSE_ALERT } from '../actions/types'

const initialState = { openAlert: false, msg: null, severity: '' }

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        msg: payload.msg,
        severity: payload.severity,
        openAlert: true,
      }
    case CLOSE_ALERT:
      return {
        ...state,
        msg: null,
        severity: '',
        openAlert: false,
      }
    default:
      return state
  }
}
