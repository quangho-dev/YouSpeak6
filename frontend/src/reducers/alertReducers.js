import { SET_ALERT, CLOSE_ALERT } from '../constants/alertConstants'

const initialState = { openAlert: false, msg: null, colorAlert: null };

export const alertReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        msg: payload.msg,
        colorAlert: payload.colorAlert,
        openAlert: true,
      };
    case CLOSE_ALERT:
      return { ...state, openAlert: false };
    default:
      return state;
  }
}