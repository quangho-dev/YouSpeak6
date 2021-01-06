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
import store from './store'
import { LOGOUT } from './actions/types'
import { loadUser } from './actions/auth'
import Container from '@material-ui/core/Container'
import AlertMessage from './components/layout/AlertMessage'

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
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Container>
            <Route exact path="/" component={LandingScreen} />
            <Route component={Routes} />
          </Container>
          {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
export default App
