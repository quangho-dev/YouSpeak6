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

// Redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './actions/auth'
import { loadTeacher } from './actions/authTeacher'
import setAuthToken from './utils/setAuthToken'

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
    store.dispatch(loadTeacher())
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Message />
          <Switch>
            <Route exact path="/" component={LandingScreen} />
            <Route component={Routes} />
          </Switch>
          {/* <Footer /> */}
        </Router>
      </ThemeProvider>
    </Provider>
  )
}
export default App
