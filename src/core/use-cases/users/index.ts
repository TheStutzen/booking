import { core } from '../..'

export class UsersCase {
  async getUser(userId: number) {
    return await core.getUserById(userId)
  }
}
