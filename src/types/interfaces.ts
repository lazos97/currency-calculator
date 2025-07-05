import { Document } from 'mongoose'
import { UserType } from './enum'

export interface ICustomError {
  statusCode: number
  message: string
}

export interface IUser extends Document {
  username: string
  email: string
  password: string
  type: UserType
}
