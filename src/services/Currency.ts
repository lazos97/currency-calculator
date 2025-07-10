import { ICurrency } from '../types/interfaces'
import { Model } from 'mongoose'
import { BadRequest } from '../exceptions/BadRequest'
import Currency from '../models/Currency'
import { NotFound } from '../exceptions/NotFound'

export class CurrencyService {
  private model: Model<ICurrency>

  constructor() {
    this.model = Currency
  }

  public async createCurrency(payload: ICurrency) {
    if (
      !payload.name ||
      !payload.country ||
      !payload.code ||
      !payload.ratio
    ) {
      throw new BadRequest('Please provide name, country, code, ratio')
    }

    const existing = await this.model.findOne({ code: payload.code })
    if (existing) {
      throw new BadRequest('Currency with this code already exists')
    }

    const currency = await this.model.create(payload)
    return currency
  }

  public async getAllCurrencies() {
    return this.model.find()
  }

  public async getCurrencyById(id: string) {
    const currency = await this.model.findById(id)
    return currency
  }

  public async updateCurrency(id: string, payload: ICurrency) {
    const currency = await this.model.findById(id)

    if (payload.code) {
      const existingCurrency = await this.model.findOne({
        code: payload.code
      })

      if (existingCurrency && existingCurrency._id.toString() !== id) {
        throw new BadRequest('This code already exists')
      }
    }

    if (payload.ratio) {
      if (currency.code === 'USD' && payload.ratio !== 1) {
        throw new BadRequest('Base currency must be 1 at ratio!')
      }
    }

    const updatedCurrency = await this.model.findByIdAndUpdate(
      id,
      payload,
      {
        new: true
      }
    )

    return updatedCurrency
  }

  public async deleteCurrency(id: string) {
    const currency = await this.model.findByIdAndDelete(id)
    return currency
  }

  public async convert(fromCode: string, toCode: string, amount: number) {
    if (fromCode === toCode) {
      throw new BadRequest('Currencies are the same')
    }

    if (amount < 0.1) {
      throw new BadRequest('Amount has to be bigger than 0.1')
    }

    const currencyFrom = await this.model.findOne({ code: fromCode })
    const currencyTo = await this.model.findOne({ code: toCode })

    if (!currencyFrom || !currencyTo) {
      throw new NotFound('One or both currencies does not exists!')
    }

    return (currencyTo.ratio / currencyFrom.ratio) * amount
  }
}
