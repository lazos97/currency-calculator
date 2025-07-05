import { CustomError } from './CustomError'

export class Forbidden extends CustomError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 403
  }
}
