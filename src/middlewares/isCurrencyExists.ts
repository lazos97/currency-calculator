import { NextFunction, Request, Response } from 'express'
import Currency from '../models/Currency'
import { NotFound } from '../exceptions/NotFound'

export const isCurrencyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const currency = await Currency.findById(req.params.id)
  if (!currency) {
    throw new NotFound('Currency does not exists!')
  }

  next()
}
