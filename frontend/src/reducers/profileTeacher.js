import {
  GET_PROFILE_TEACHER,
  PROFILE_TEACHER_ERROR,
  CLEAR_PROFILE_TEACHER,
  UPDATE_PROFILE_TEACHER,
} from '../actions/types'

const initialState = {
  profileTeacher: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_PROFILE_TEACHER:
    case UPDATE_PROFILE_TEACHER:
      return {
        ...state,
        profileTeacher: payload,
        loading: false,
      }
    case PROFILE_TEACHER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profileTeacher: null,
      }
    case CLEAR_PROFILE_TEACHER:
      return {
        ...state,
        profileTeacher: null,
      }
    default:
      return state
  }
}
