import path from 'path'
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import consola from 'consola'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import uploadVideoRoutes from './routes/uploadVideoRoutes.js'
import uploadExpImagesRoutes from './routes/uploadExpImagesRoutes.js'
import profileTeacherRoutes from './routes/profileTeacherRoutes.js'
import uploadDegreeImagesRoutes from './routes/uploadDegreeImagesRoutes.js'
import uploadTeacherAvatarRoutes from './routes/uploadTeacherAvatarRoutes.js'
import config from 'config'
import teacherRoutes from './routes/teacherRoutes.js'
import { passportMiddleware } from './middleware/passport.js'
import passport from 'passport'
import forgotPasswordRoute from './routes/forgotPasswordRoute.js'
import resetPasswordRoute from './routes/resetPasswordRoute.js'
import uploadLessonDocumentsRoute from './routes/uploadLessonDocumentsRoute.js'

const mongoURI = config.get('mongoURI')
const PORT = config.get('PORT')

const { connect } = mongoose
const { success, error } = consola

const app = express()

app.use(express.json())

app.use(morgan('tiny'))

app.use(passport.initialize())

passportMiddleware(passport)

app.use('/api/users', userRoutes)

app.use('/api/forgot', forgotPasswordRoute)

app.use('/api/reset', resetPasswordRoute)

app.use('/api/teachers', teacherRoutes)

app.use('/api/auth', authRoutes)

app.use('/api/upload', uploadRoutes)
app.use('/api/upload-teacher-avatar', uploadTeacherAvatarRoutes)
app.use('/api/uploadVideo', uploadVideoRoutes)
app.use('/api/uploadDegreeImages', uploadDegreeImagesRoutes)
app.use('/api/uploadExpImages', uploadExpImagesRoutes)
app.use('/api/upload-lesson-documents', uploadLessonDocumentsRoute)

app.use('/api/profile', profileRoutes)

app.use('/api/profileTeacher', profileTeacherRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message,
    },
  })
})

const startApp = async () => {
  try {
    // Connection With DB
    await connect(mongoURI, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    success({
      message: `Successfully connected with the Database \n${mongoURI}`,
      badge: true,
    })

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    )
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true,
    })
    startApp()
  }
}

startApp()
