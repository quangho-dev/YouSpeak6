import { BOOK_TIME_SUCCESS, BOOK_TIME_ERROR } from '../actions/types'

const initialState = {
  bookedTime: [],
  loading: true,
  error: null,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case BOOK_TIME_SUCCESS:
      return {
        ...state,
        loading: true,
        bookedTime: payload,
      }

    case BOOK_TIME_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }

    default:
      return state
  }
}
