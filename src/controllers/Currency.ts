import { Request, Response, NextFunction } from 'express'
import { CurrencyService } from '../services/Currency'

export class CurrencyController {
  private service: CurrencyService
  constructor() {
    this.service = new CurrencyService()
  }
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currency = await this.service.createCurrency(req.body)
      res
        .status(201)
        .json({ message: 'Currency succefully created', data: currency })
    } catch (err) {
      next(err)
    }
  }

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currencies = await this.service.getAllCurrencies()
      res.status(200).json({
        message: 'Succefully fetched currencies',
        data: currencies
      })
    } catch (err) {
      next(err)
    }
  }

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currency = await this.service.getCurrencyById(req.params.id)
      res
        .status(200)
        .json({ message: 'Succefully fetched currency', data: currency })
    } catch (err) {
      next(err)
    }
  }

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const currency = await this.service.updateCurrency(
        req.params.id,
        req.body
      )
      res
        .status(200)
        .json({ message: 'Succefully updated currency', data: currency })
    } catch (err) {
      next(err)
    }
  }

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.deleteCurrency(req.params.id)
      res.status(204).send()
    } catch (err) {
      next(err)
    }
  }

  public convert = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.service.convert(
        req.query.from.toString(),
        req.query.to.toString(),
        Number(req.query.amount)
      )

      res.status(200).json({
        message: 'Currency converted succesfully',
        from: req.query.from.toString(),
        to: req.query.to.toString(),
        amount: req.query.amount,
        result
      })
    } catch (err) {
      next(err)
    }
  }
}
