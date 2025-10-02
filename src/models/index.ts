import { BookingsModel } from './bookings'
import { EventsModel } from './events'
import { SessionsModel } from './sessions'
import { UsersModel } from './users'

export default {
  BookingsModel: new BookingsModel(),
  EventsModel: new EventsModel(),
  SessionsModel: new SessionsModel(),
  UsersModel: new UsersModel()
}
