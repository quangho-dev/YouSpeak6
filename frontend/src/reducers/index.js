import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alert from './alert'
import authTeacher from './authTeacher'
import profileTeacher from './profileTeacher'

export default combineReducers({
  auth,
  profile,
  alert,
  authTeacher,
  profileTeacher,
})
