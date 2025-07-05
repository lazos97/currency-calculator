import express from 'express'
import { connectToDatabase } from './db/connection'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

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
    console.error('Failed to start API:', error)
  }
}

startAPI()
