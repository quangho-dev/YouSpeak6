import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import ProfileFormScreen from '../../screens/ProfileFormScreen'
import LogInScreen from '../../screens/LogInScreen'
import RegisterScreen from '../../screens/RegisterScreen'

const Routes = (props) => {
  return (
    <section>
      <Switch>
        <Route exact path="/login" component={LogInScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/create-profile"
          component={ProfileFormScreen}
        />
      </Switch>
    </section>
  )
}

export default Routes
