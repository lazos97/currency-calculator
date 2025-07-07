import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ITokenPayload } from '../types/interfaces'
import { UserType } from '../types/enum'
import { Forbidden } from '../exceptions/Forbidden'

export const authorizedEditor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  const user = jwt.verify(token, process.env.JWT_SECRET) as ITokenPayload

  if (user.type !== UserType.Editor) {
    throw new Forbidden('Access denied!')
  }

  next()
}
