import {
  BOOK_TIME_SUCCESS,
  BOOK_TIME_ERROR,
  GET_ALL_BOOKED_LESSONS_SUCCESS,
  GET_ALL_BOOKED_LESSONS_ERROR,
  GET_BOOKED_LESSON_SUCCESS,
  GET_BOOKED_LESSON_ERROR,
} from '../actions/types'

const initialState = {
  bookedLessons: [],
  bookedTime: [],
  loading: true,
  error: null,
  bookedLesson: {},
  profileTeacher: {},
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
    case GET_ALL_BOOKED_LESSONS_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLessons: payload,
      }
    case GET_ALL_BOOKED_LESSONS_ERROR:
      return {
        ...state,
        loading: false,
        bookedLessons: [],
        error: payload,
      }
    case GET_BOOKED_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        bookedLesson: payload.bookedLesson,
        profileTeacher: payload.profileTeacher,
      }
    case GET_BOOKED_LESSON_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      }
    default:
      return state
  }
}
