import { core } from '../..'

export class BookingCase {
  async create(eventId: number, userId: number) {
    const booking = await core.createBooking(eventId, userId)

    if (booking) {
      return { ok: true, message: 'Бронирование успешно выполнено' }
    } else {
      return {
        ok: false,
        message:
          'Бронирование невозможно: уже забронировано, нет мест или событие не найдено'
      }
    }
  }
}
