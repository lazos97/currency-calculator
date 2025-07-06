import { NextFunction, Request, Response } from 'express'
import { AuthService } from '../services/Auth'

export class AuthController {
  private service: AuthService
  constructor() {
    this.service = new AuthService()
  }

  public register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.service.register(req.body)
      res.status(201).json({
        message: 'User register successfully',
        user: user
      })
    } catch (err) {
      next(err)
    }
  }

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = await this.service.login(req.body)
      res.status(200).json({
        message: 'User succesfully logged in',
        user
      })
    } catch (err) {
      next(err)
    }
  }

  public logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      const results = this.service.logout()
      res.status(200).json({
        message: results
      })
    } catch (err) {
      next(err)
    }
  }
}
