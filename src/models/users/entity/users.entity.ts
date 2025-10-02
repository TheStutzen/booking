import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  userId: number

  @Column({ type: 'varchar', length: 256 })
  password: string

  @Column({ type: 'varchar', length: 256, nullable: true })
  name: string

  @Column({ unique: true })
  email: string

  @CreateDateColumn()
  dateCreate: Date

  @UpdateDateColumn()
  dateUpdate: Date
}
