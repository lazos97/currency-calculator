import mongoose, { Schema } from 'mongoose'
import { ICurrency } from '../types/interfaces'

const currencySchema = new Schema<ICurrency>({
  name: {
    type: String
  },
  country: {
    type: String
  },
  code: {
    type: String
  },
  ratio: {
    type: Number
  }
})

const Currency = mongoose.model<ICurrency>('Currencies', currencySchema)

export default Currency
