import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import videoRoutes from './routes/videoRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8800

app.use(cookieParser())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/videos', videoRoutes)
app.use('/api/comments', commentRoutes)

const connect = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to database')
  }).catch(error => { throw error })
}

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use((err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || "Something went wrong!"
  return res.status(status).json({
    success: false,
    status,
    message
  })
})

app.listen(port, () => {
  connect()
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})