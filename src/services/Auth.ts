import { ILoginPayload, IUser, IUserToken } from '../types/interfaces'
import { Model } from 'mongoose'
import User from '../models/User'
import { BadRequest } from '../exceptions/BadRequest'
import { checkPassword, hashPassword } from '../helpers/bcrypt'
import { UserType } from '../types/enum'
import { generateToken } from '../helpers/jwt'

export class AuthService {
  private model: Model<IUser>
  constructor() {
    this.model = User
  }

  public async register(payload: IUser) {
    await this.validateUserPayload(payload)

    const userCount = await this.model.countDocuments()
    if (userCount === 0) {
      payload.type = UserType.Editor
    }

    payload.password = await hashPassword(payload.password)
    const user = await this.model.create(payload)

    const tokenPayload = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      type: user.type
    }

    const token = generateToken(tokenPayload)

    return this.returnUserWithoutPassword(user, token)
  }

  public async login(payload: ILoginPayload) {
    const user = await this.model.findOne({ email: payload.email })
    if (!user) {
      throw new BadRequest('Something went wrong with credentials')
    }

    const isTheSame = await checkPassword(payload.password, user.password)
    if (!isTheSame) {
      throw new BadRequest('Something went wrong with credentials')
    }

    const tokenPayload = {
      _id: user._id.toString(),
      email: user.email,
      username: user.username,
      type: user.type
    }

    const token = generateToken(tokenPayload)

    return this.returnUserWithoutPassword(user, token)
  }

  public logout() {
    return 'User Logged out'
  }

  private returnUserWithoutPassword(user: IUser, token: string) {
    const userObject: IUserToken = user.toObject()
    delete userObject.password

    userObject.token = token

    return userObject
  }

  private async validateUserPayload(payload: IUser) {
    if (payload.type) {
      throw new BadRequest('Type is not allowed to be provided!')
    }

    if (!payload.password || !payload.email || !payload.username) {
      throw new BadRequest('Please privide, email, password and username!')
    }

    if (payload.password.length < 3) {
      throw new BadRequest('Password must be bigger than 3 digits!')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(payload.email)) {
      throw new BadRequest('Please provide a valid email address!')
    }

    const existingUser = await this.model.findOne({ email: payload.email })
    if (existingUser) {
      throw new BadRequest('This email is already in use!')
    }
  }
}
