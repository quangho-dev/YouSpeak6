import {
  SET_AVAILABLE_TIME_SUCCESS,
  SET_AVAILABLE_TIME_ERROR,
} from '../actions/types'

const initialState = {
  availableTime: [],
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_AVAILABLE_TIME_SUCCESS:
      return {
        ...state,
        availableTime: payload,
      }
    case SET_AVAILABLE_TIME_ERROR:
      return {
        ...state,
        error: payload,
      }
    default:
      return state
  }
}
