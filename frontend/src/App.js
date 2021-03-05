import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import theme from './components/Theme'
import GlobalStyle from './globalStyles'
import Header from './components/Header'
// import Footer from './components/Footer'
import Routes from './components/routing/Routes'
import LandingScreen from './screens/LandingScreen'
import setAuthToken from './utils/setAuthToken'
import store from './store'
import { LOGOUT } from './actions/types'
import { loadUser } from './actions/auth'
import { ConfirmProvider } from 'material-ui-confirm'
import moment from 'moment'
import 'moment/locale/vi'
// Redux
import { Provider } from 'react-redux'

moment.locale('vi')

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
        <ConfirmProvider>
          <Router>
            <GlobalStyle />
            <Header />
            <Route exact path="/" component={LandingScreen} />
            <Route component={Routes} />
          </Router>
          {/* <Footer /> */}
        </ConfirmProvider>
      </ThemeProvider>
    </Provider>
  )
}
export default App
