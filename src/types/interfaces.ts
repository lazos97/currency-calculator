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

export interface ILoginPayload {
  email: string
  password: string
}

export interface ICurrency extends Document {
  name: string
  country: string
  code: string
  ratio: number
}

export interface IUserToken extends IUser {
  token: string
}

export interface ITokenPayload {
  email: string
  type: UserType
  username: string
  _id: string
}
