import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Unauthorized } from '../exceptions/Unauthorized'
import { Internal } from '../exceptions/Internal'

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Unauthorized('No token provided')
    }

    const token = authHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
      throw new Internal('JWT_SECRET is not defined')
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)

    next()
  } catch (error) {
    next(new Unauthorized('Invalid or expired token'))
  }
}
