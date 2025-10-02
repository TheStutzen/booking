import { mariaDbDataSource } from '../../db'
import { Sessions } from './entity/sessions.entity'
import {
  ISessionDelete,
  ISessionParams,
  ISessionRead
} from './interface/sessions.interface'

export class SessionsModel {
  sessionRepository = mariaDbDataSource.getRepository(Sessions)

  async sessionCreate(params: ISessionParams): Promise<Sessions> {
    try {
      const options: any = {
        ...params
      }

      const session = await this.sessionRepository.save(options)

      return session
    } catch (error) {
      console.error({ method: 'sessionCreate', error })
    }
  }

  async sessionRead(params: ISessionRead): Promise<Sessions> {
    try {
      const { sid } = params

      return await this.sessionRepository
        .createQueryBuilder('session')
        .where('sid = :sid', { sid })
        .getOne()
    } catch (error) {
      console.error({ method: 'sessionRead', error })
    }
  }

  async sessionUpdate({ sid, ...params }: ISessionParams): Promise<any> {
    try {
      const { affected } = await this.sessionRepository.update(sid, params)

      return affected
    } catch (error) {
      console.error({ method: 'sessionUpdate', error })
    }
  }

  async sessionDelete(params: ISessionDelete): Promise<any> {
    try {
      const { sid } = params

      const { affected } = await this.sessionRepository.delete({ sid: sid })

      return affected
    } catch (error) {
      console.error({ method: 'sessionDelete', error })
    }
  }
}
