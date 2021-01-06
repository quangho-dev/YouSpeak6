import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import ProfileFormScreen from '../../screens/ProfileFormScreen'
import LogInScreen from '../../screens/LogInScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import ForTeacherScreen from '../../screens/teachers/ForTeacherScreen'
import TeacherRegisterForm from '../../screens/teachers/TeacherRegisterForm/TeacherRegisterForm'
import DashboardTeacher from '../../screens/teachers/DashboardTeacher'
import LoginTeacher from '../../screens/teachers/LoginTeacher'
import ProfileTeacher from '../../screens/teachers/ProfileTeacherForm/ProfileTeacher'
import AlertMessage from '../layout/AlertMessage'
import { useDispatch, useSelector } from 'react-redux'

const Routes = (props) => {
  const alerts = useSelector((state) => state.alert)

  return (
    <section>
      {alerts && <AlertMessage />}
      <Switch>
        <Route exact path="/login" component={LogInScreen} />
        <Route exact path="/register-user" component={RegisterScreen} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/create-profile"
          component={ProfileFormScreen}
        />

        {/* Teacher routes */}
        <Route exact path="/for-teacher" component={ForTeacherScreen} />
        <Route exact path="/teachers/login" component={LoginTeacher} />
        <Route
          exact
          path="/teachers/register-teacher"
          component={TeacherRegisterForm}
        />
        <PrivateRoute
          exact
          path="/teachers/create-profile"
          component={ProfileTeacher}
        />
        <PrivateRoute
          exact
          path="/teachers/dashboard"
          component={DashboardTeacher}
        />
      </Switch>
    </section>
  )
}

export default Routes
