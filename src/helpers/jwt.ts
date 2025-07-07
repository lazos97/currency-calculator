import jwt from 'jsonwebtoken'
import { ITokenPayload } from '../types/interfaces'
import { Internal } from '../exceptions/Internal'

export const generateToken = (payload: ITokenPayload) => {
  if (!process.env.JWT_SECRET) {
    throw new Internal('JWT_SECRET is not defined')
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME || '1d'
  })
}
