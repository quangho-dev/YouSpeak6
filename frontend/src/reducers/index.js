import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alert from './alert'
import authTeacher from './authTeacher'

export default combineReducers({
  auth,
  profile,
  alert,
  authTeacher,
})
