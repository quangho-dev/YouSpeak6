import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import theme from './components/Theme';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingScreen from './screens/LandingScreen';
import Alert from './components/Alert';

const App = () => {
  return (
      <ThemeProvider theme={theme}>
        <Router>
            <Alert />
            <Header />
            <Switch>
              <Route exact path="/" component={LandingScreen} />
            </Switch>
            <Footer />
        </Router>
      </ThemeProvider>
  );
  };
export default App;
