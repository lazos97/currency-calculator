import express from 'express'
import { connectToDatabase } from './db/connection'
import dotenv from 'dotenv'
import { Internal } from './exceptions/Internal'
import authRouter from './routes/auth'
import currencyRoutes from './routes/currency'
import helmet from 'helmet'
import { errorHandler } from './middlewares/errorHandler'
import { notFoundMiddleware } from './middlewares/notFound'
import rateLimit from 'express-rate-limit'

dotenv.config()

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 3000
  })
)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/currencies', currencyRoutes)

app.use(notFoundMiddleware)
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
