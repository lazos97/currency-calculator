import { Request, Response, NextFunction } from 'express'
import { ICustomError } from '../types/interfaces'

export const errorHandler = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error: ICustomError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong, please try again'
  }

  console.log(err.message)
  console.log(err)

  res.status(error.statusCode).json({
    message: error.message
  })
}
