import { mariaDbDataSource } from '../../db'
import { Users } from './entity/users.entity'

export class UsersModel {
  private usersRepository = mariaDbDataSource.getRepository(Users)

  async create(params: any) {
    return await this.usersRepository.save(params)
  }

  async getById(userId: number) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('users.userId = :userId', { userId })
      .getOne()
  }

  async getByEmail(email: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where('users.email = :email', { email })
      .getOne()
  }

  async update(id: number, params: any) {
    return await this.usersRepository.update(id, params)
  }
}
