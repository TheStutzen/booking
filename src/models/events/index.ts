import { mariaDbDataSource } from '../../db'
import { Events } from './entity/events.entity'

export class EventsModel {
  private eventsRepository = mariaDbDataSource.getRepository(Events)

  async create(event: any) {
    return await this.eventsRepository.save(event)
  }

  async getById(id: number): Promise<Events> {
    return await this.eventsRepository
      .createQueryBuilder('events')
      .where('events.id = :id', { id })
      .getOne()
  }

  async getByName(name: string) {
    return await this.eventsRepository
      .createQueryBuilder('events')
      .where('events.name = :name', { name })
      .getOne()
  }

  async update(id: number, event: Partial<Events>) {
    return await this.eventsRepository.update(id, event)
  }
}
