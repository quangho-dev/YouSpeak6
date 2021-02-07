import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import setAuthToken from './utils/setAuthToken'
<<<<<<< HEAD
import { persistStore } from 'redux-persist'
import firebase from 'firebase/app'
import 'firebase/auth'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer,
} from 'react-redux-firebase'
=======
>>>>>>> applyFireBaseAuth

const initialState = {}

const middleware = [thunk]

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
let currentState = store.getState()

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState
  currentState = store.getState()
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token
    setAuthToken(token)
  }
})

export default store
