import { AuthCase } from './auth'
import { BookingCase } from './bookings'
import { UsersCase } from './users'

export default {
  AuthCase: new AuthCase(),
  UsersCase: new UsersCase(),
  BookingCase: new BookingCase()
}
