import Models from '../models'

export class Core {
  async getUserByEmail(email: string) {
    return await Models.UsersModel.getByEmail(email)
  }

  async createUser(email: string, password: string) {
    return await Models.UsersModel.create({ email, password })
  }

  async getUserById(userId: number) {
    return await Models.UsersModel.getById(userId)
  }

  async getEventById(id: number) {
    return await Models.EventsModel.getById(id)
  }

  async updateEvent(id: number, data: any) {
    return await Models.EventsModel.update(id, data)
  }

  async getBookingByUserIdAndEventId(userId: number, eventId: number) {
    return await Models.BookingsModel.getByUserIdAndEventId(userId, eventId)
  }

  async createBooking(eventId: number, userId: number) {
    const event = await this.getEventById(eventId)

    if (event && event.totalSeats > 0) {
      const checkBooking = await this.getBookingByUserIdAndEventId(
        userId,
        eventId
      )

      if (checkBooking) return false

      const booking = await Models.BookingsModel.create({ event, userId })

      if (booking) {
        await this.updateEvent(eventId, { totalSeats: event.totalSeats - 1 })

        return true
      }
    }
    return false
  }
}
