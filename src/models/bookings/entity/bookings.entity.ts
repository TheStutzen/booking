import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  JoinColumn
} from 'typeorm'
import { Events } from '../../events/entity/events.entity'

@Entity({ name: 'bookings' })
@Unique(['event', 'userId'])
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => Events, (event) => event.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Events

  @Column()
  userId: number

  @CreateDateColumn()
  createdAt: Date
}
