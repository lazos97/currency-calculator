import mongoose, { Schema } from 'mongoose'
import { IUser } from '../types/interfaces'
import { UserType } from '../types/enum'

const userSchema = new Schema<IUser>({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  type: {
    type: String,
    enum: {
      values: Object.values(UserType)
    },
    default: UserType.Viewer
  }
})

const User = mongoose.model<IUser>('Users', userSchema)

export default User
