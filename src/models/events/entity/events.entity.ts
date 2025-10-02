import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Bookings } from '../../bookings/entity/bookings.entity'

@Entity({ name: 'events' })
export class Events {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 256 })
  name: string

  @Column({ type: 'int' })
  totalSeats: number

  @OneToMany(() => Bookings, (booking) => booking.event)
  bookings: Bookings[]
}
