import { Request, Response } from 'express'
import { AuthService } from '../services/Auth'

export class AuthController {
  private service: AuthService
  constructor() {
    this.service = new AuthService()
  }

  public register = (req: Request, res: Response) => {
    const results = this.service.register()
    res.status(200).json({
      message: results
    })
  }

  public login = (req: Request, res: Response) => {
    const results = this.service.login()
    res.status(200).json({
      message: results
    })
  }

  public logout = (req: Request, res: Response) => {
    const results = this.service.logout()
    res.status(200).json({
      message: results
    })
  }
}
