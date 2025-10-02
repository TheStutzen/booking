import { mariaDbDataSource } from '../../db'
import { Bookings } from './entity/bookings.entity'

export class BookingsModel {
  private bookingsRepository = mariaDbDataSource.getRepository(Bookings)

  async create(booking: Partial<Bookings>) {
    return await this.bookingsRepository.save(booking)
  }

  async getByEventId(eventId: number): Promise<Bookings[]> {
    return await this.bookingsRepository
      .createQueryBuilder('bookings')
      .where('bookings.eventId = :eventId', { eventId })
      .getMany()
  }

  async getByUserId(userId: number): Promise<Bookings[]> {
    return await this.bookingsRepository
      .createQueryBuilder('bookings')
      .where('bookings.userId = :userId', { userId })
      .getMany()
  }

  async getByUserIdAndEventId(
    userId: number,
    eventId: number
  ): Promise<Bookings> {
    return await this.bookingsRepository
      .createQueryBuilder('bookings')
      .where('bookings.eventId = :eventId', { eventId })
      .andWhere('bookings.userId = :userId', { userId })
      .getOne()
  }
}
