require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const noteRoutes = require('./routes/noteRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 5000

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
)
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Notes API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/notes', noteRoutes)
app.use('/', authRoutes)
app.use('/notes', noteRoutes)

app.use(errorHandler)

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()
