import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import ProfileFormScreen from '../../screens/ProfileFormScreen'
import LogInScreen from '../../screens/LogInScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import LoginTeacherScreen from '../../screens/teachers/LoginTeacherScreen'
import ForTeacherScreen from '../../screens/teachers/ForTeacherScreen'
import FormRegisterTeacherScreen from '../../screens/teachers/FormRegisterTeacherScreen'
import FormRegisterTeacher from '../../screens/teachers/MultiTeacherRegisterForm/FormRegisterTeacher'

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

        {/* Teacher routes */}
        <Route exact path="/for-teacher" component={ForTeacherScreen} />
        {/* <Route
          exact
          path="/teachers/register"
          component={FormRegisterTeacher}
        /> */}
        <Route exact path="/teachers/login" component={LoginTeacherScreen} />
        <Route
          exact
          path="/teachers/register"
          component={FormRegisterTeacher}
        />
      </Switch>
    </section>
  )
}

export default Routes
