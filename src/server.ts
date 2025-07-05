import express from 'express'
import { connectToDatabase } from './db/connection'
import dotenv from 'dotenv'
import { Internal } from './exceptions/Internal'
import { errorHandler } from './middlewares/errorHandler'

import authRouter from './routes/auth'

dotenv.config()

const app = express()

app.use('/api/v1/auth', authRouter)

app.use(errorHandler)

const startAPI = async () => {
  try {
    const mongoUri = process.env.MONGO_URI as string

    await connectToDatabase(mongoUri)
    console.log('Database connected')

    const port = process.env.PORT || 3000
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    throw new Internal('Something went wrong!')
  }
}

startAPI()
