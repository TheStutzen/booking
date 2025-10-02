import { core } from '../../../core'
import { customSessionStore } from '../../../libs/cookie'

export class Guard {
  async checkSession(req: any): Promise<boolean> {
    const { sessionID, session } = req

    if (!sessionID || !session?.cookie?._expires) {
      return false
    }

    const now = Date.now()
    const expires = new Date(session.cookie._expires).getTime()

    const destroyAndReject = async () => {
      await customSessionStore.destroy(sessionID)
      return false
    }

    if (now >= expires) {
      return await destroyAndReject()
    }

    if (!session.user) {
      return false
    }

    const checkUser = await core.getUserById(session.user.userId)

    if (checkUser) {
      return true
    } else {
      return false
    }
  }
}
