import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import boardRoutes from './routes/board.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 5000

app.use('/api/auth', authRoutes)
app.use('/api/board', boardRoutes)

app.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server running on port ${PORT}`)
})
