export class Internal extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 500
  }
}

export class CustomAPIError extends Error {
  statusCode: number
  msg: string
  constructor(msg: string, status: number) {
    super(msg)
    this.statusCode = status
  }
}
