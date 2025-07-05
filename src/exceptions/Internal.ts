import { CustomError } from './CustomError'

export class Internal extends CustomError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 500
  }
}
