import { SET_ALERT, CLOSE_ALERT } from '../constants/alertConstants'

export const setAlert = (msg, colorAlert) => (dispatch) => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, colorAlert} ,
  });
};

export const closeAlert = () => (dispatch) =>
  dispatch({
    type: CLOSE_ALERT,
  });
