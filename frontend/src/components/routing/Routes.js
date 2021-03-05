import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Dashboard from '../../screens/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import TeacherPrivateRoute from '../routing/TeacherPrivateRoute'
import ProfileFormScreen from '../../screens/ProfileFormScreen'
import LogInScreen from '../../screens/LogInScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import ForTeacherScreen from '../../screens/teachers/ForTeacherScreen'
import TeacherRegisterForm from '../../screens/teachers/TeacherRegisterForm/TeacherRegisterForm'
import DashboardTeacher from '../../screens/teachers/DashboardTeacher'
import LoginTeacher from '../../screens/teachers/LoginTeacher'
import ProfileTeacher from '../../screens/teachers/ProfileTeacherForm/ProfileTeacher'
import AlertMessage from '../layout/AlertMessage'
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen'
import { useSelector } from 'react-redux'
import ResetPasswordScreen from '../../screens/ResetPasswordScreen'
import ConfirmationSuccessScreen from '../../screens/ConfirmationSuccessScreen'
import TeacherConfirmationSuccessScreen from '../../screens/TeacherConfirmationSuccessScreen'
import RequestResendConfirmationTokenScreen from '../../screens/RequestResendConfirmationTokenScreen'
import RequestTeacherResendConfirmationTokenScreen from '../../screens/teachers/RequestTeacherResendConfirmationTokenScreen'
import TeachersListScreen from '../../screens/TeachersList/TeachersListScreen'
import NotFound from '../layout/NotFound'
import Lessons from '../lessons/Lessons'
import AddALesson from '../lessons/AddALesson/AddALesson'
import EditALesson from '../lessons/EditALesson/EditALesson'
import ReuploadLessonDocuments from '../lessons/EditALesson/ReuploadLessonDocuments'
import BookLearningTime from '../students/BookLearningTime/BookLearningTime'
import Test from '../Test'
import SchedulingCalendar from '../teachers/BookingCalendar/SchedulingCalendar'
import LessonsManager from '../students/LessonsManager/LessonsManager'
import BookedLesson from '../students/bookedLesson/BookedLesson'
import BookedLessonsManager from '../teachers/bookedLessonsManager/BookedLessonsManager'
import BookedLessonInfo from '../teachers/bookedLessonInfo/BookedLessonInfo'

const Routes = (props) => {
  const alerts = useSelector((state) => state.alert)

  return (
    <section>
      {alerts && <AlertMessage />}
      <Switch>
        <Route exact path="/login" component={LogInScreen} />
        <Route exact path="/register-user" component={RegisterScreen} />
        <Route exact path="/forgot" component={ForgotPasswordScreen} />
        <Route exact path="/reset/:token" component={ResetPasswordScreen} />
        <Route
          exact
          path="/api/users/confirmation/:token"
          component={ConfirmationSuccessScreen}
        />
        <Route
          exact
          path="/users/request-resend-confirmation-token"
          component={RequestResendConfirmationTokenScreen}
        />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute
          exact
          path="/create-profile"
          component={ProfileFormScreen}
        />
        <PrivateRoute
          exact
          path="/book-learning-time/:teacherCalendarId"
          component={BookLearningTime}
        />

        <PrivateRoute
          exact
          path="/teachers/english"
          component={TeachersListScreen}
        />

        <PrivateRoute
          exact
          path="/students/lessons-manager"
          component={LessonsManager}
        />

        <PrivateRoute
          exact
          path="/students/bookedLesson/:bookedLessonId"
          component={BookedLesson}
        />

        {/* Teacher routes */}
        <Route exact path="/for-teacher" component={ForTeacherScreen} />
        <Route exact path="/teachers/login" component={LoginTeacher} />
        <Route
          exact
          path="/teachers/register-teacher"
          component={TeacherRegisterForm}
        />
        <Route
          exact
          path="/teachers/confirmation/:token"
          component={TeacherConfirmationSuccessScreen}
        />
        <Route
          exact
          path="/teachers/request-resend-confirmation-token"
          component={RequestTeacherResendConfirmationTokenScreen}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/create-profile"
          component={ProfileTeacher}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/dashboard"
          component={DashboardTeacher}
        />

        <TeacherPrivateRoute
          exact
          path="/teachers/lessons"
          component={Lessons}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/add-a-lesson"
          component={AddALesson}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/lessons/edit/:id"
          component={EditALesson}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/lessons/re-upload-documents/:id"
          component={ReuploadLessonDocuments}
        />
        <TeacherPrivateRoute
          exact
          path="/booking-calendar-teacher"
          component={SchedulingCalendar}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/booked-lessons-manager"
          component={BookedLessonsManager}
        />
        <TeacherPrivateRoute
          exact
          path="/teachers/bookedLesson/:bookedLessonId"
          component={BookedLessonInfo}
        />
        <Route path="/test" component={Test} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
