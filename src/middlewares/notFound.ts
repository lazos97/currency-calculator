import { NextFunction, Request, RequestHandler, Response } from 'express'

export const notFoundMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: 'Path/route not found!' })
}
