import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Theme'
import Header from './components/Header'
import Footer from './components/Footer'
// import Message from './components/Message'
import Routes from './components/routing/Routes'
import LandingScreen from './screens/LandingScreen'
import Message from './components/Message'
import setAuthToken from './utils/setAuthToken'
import { store, persistor } from './store'
import { LOGOUT } from './actions/types'
import { loadUser } from './actions/auth'
import { PersistGate } from 'redux-persist/integration/react'

// Redux
import { Provider } from 'react-redux'

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }
    store.dispatch(loadUser())

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT })
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Router>
            <Header />
            <Route exact path="/" component={LandingScreen} />
            <Route component={Routes} />
          </Router>
          {/* <Footer /> */}
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
export default App
