import { NextFunction, Request, Response } from 'express'
import { Forbidden } from '../exceptions/Forbidden'

export const isNotLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    throw new Forbidden('You are already logged in!')
  }

  next()
}
