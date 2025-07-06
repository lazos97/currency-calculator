import bcrypt from 'bcrypt'

const saltRounds = 10

export const hashPassword = async (plainPassword: string) =>
  bcrypt.hash(plainPassword, saltRounds)

export const checkPassword = async (
  plainPassword: string,
  hashedPassword: string
) => bcrypt.compare(plainPassword, hashedPassword)
