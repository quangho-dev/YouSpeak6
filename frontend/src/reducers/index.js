import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alert from './alert'
import profileTeacher from './profileTeacher'
import teachersList from './teachersList'
import lesson from './lesson'
import { firebaseReducer } from 'react-redux-firebase'

export default combineReducers({
  auth,
  profile,
  alert,
  profileTeacher,
  teachersList,
  lesson,
  firebase: firebaseReducer,
})
