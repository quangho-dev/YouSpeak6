import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import uploadRoutes from './routes/uploadRoutes.js'
import userRoutes from './routes/userRoutes.js'
import HttpError from './models/http-error.js'
import authRoutes from './routes/authRoutes.js'
import authTeacherRoutes from './routes/authTeacherRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import teachersRoutes from './routes/teachersRoutes.js'
import uploadVideoRoutes from './routes/uploadVideoRoutes.js'
import uploadExpImagesRoutes from './routes/uploadExpImagesRoutes.js'
import profileTeacherRoutes from './routes/profileTeacherRoutes.js'
import uploadDegreeImagesRoutes from './routes/uploadDegreeImagesRoutes.js'
import uploadTeacherAvatarRoutes from './routes/uploadTeacherAvatarRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/auth-teacher', authTeacherRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/upload-teacher-avatar', uploadTeacherAvatarRoutes)
app.use('/api/uploadVideo', uploadVideoRoutes)
app.use('/api/uploadDegreeImages', uploadDegreeImagesRoutes)
app.use('/api/expImages', uploadExpImagesRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/profileTeacher', profileTeacherRoutes)
app.use('/api/teachers', teachersRoutes)

// app.use((req, res, next) => {
//   const error = new HttpError('Could not find this route.', 404)
//   throw error
// })

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
