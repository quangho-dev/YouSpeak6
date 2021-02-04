import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import alert from './alert'
import profileTeacher from './profileTeacher'
import teachersList from './teachersList'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import lesson from './lesson'
import { firebaseReducer } from 'react-redux-firebase'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({
  auth,
  profile,
  alert,
  profileTeacher,
  teachersList,
  lesson,
  firebase: firebaseReducer,
})

export default persistReducer(persistConfig, rootReducer)
