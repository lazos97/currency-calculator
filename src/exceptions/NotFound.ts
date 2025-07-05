import { CustomError } from './CustomError'

export class NotFound extends CustomError {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 404
  }
}
