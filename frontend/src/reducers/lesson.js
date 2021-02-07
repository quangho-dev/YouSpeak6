import { GET_LESSONS, CREATE_LESSON, LESSON_ERROR } from '../actions/types'

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  error: {},
}

const lessonReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case GET_LESSONS:
      return {
        ...state,
        lessons: payload,
        loading: false,
      }
    case CREATE_LESSON:
      return {
        ...state,
        lessons: [payload, ...state.lessons],
        loading: false,
      }
    case LESSON_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default lessonReducer
