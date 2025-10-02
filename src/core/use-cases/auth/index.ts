import { core } from '../..'
import { compareHash, createHash } from '../../../utils/bcrypt'

export class AuthCase {
  async signIn(email: string, password: string) {
    const user = await core.getUserByEmail(email)

    if (user && compareHash(password, user?.password)) {
      return {
        ok: true,
        user: {
          userId: user.userId,
          name: user.name,
          dateCreate: user.dateCreate
        }
      }
    } else {
      return { ok: false, message: 'Неправильный логин или пароль' }
    }
  }

  async signUp(email: string, password: string) {
    const hasUser = await core.getUserByEmail(email)

    if (hasUser) {
      return {
        ok: false,
        message: 'Пользователь с указанной почтой уже зарегистрирован'
      }
    } else {
      const user = await core.createUser(email, createHash(password))

      return { ok: true, message: 'Пользователь успешно зарегестрирован', user }
    }
  }
}
