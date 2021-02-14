import {
  GET_LESSONS,
  CREATE_LESSON,
  LESSON_ERROR,
  GET_LESSON,
  REMOVE_LESSON,
  UPDATE_LESSON,
} from '../actions/types'

const initialState = {
  lessons: [],
  lesson: null,
  loading: true,
  error: null,
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
    case GET_LESSON:
    case UPDATE_LESSON:
      return {
        ...state,
        lesson: payload,
        loading: false,
      }
    case REMOVE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter((lesson) => lesson._id !== payload),
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
