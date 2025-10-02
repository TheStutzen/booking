import Cases from '../../core/use-cases'
import { signSession } from '../../utils/SignSession'

export class AuthController {
  async signIn(req, res) {
    const params = req.body

    const data = await Cases.AuthCase.signIn(params.email, params.password)

    if (!data.ok)
      return res.status(400).json({ ok: data.ok, message: data.message })

    req.session.user = data.user

    const sessionId = req.sessionID

    return res
      .status(201)
      .json({ ok: data.ok, user: data.user, sid: signSession(sessionId) })
  }

  async signUp(req, res) {
    const params = req.body

    const data = await Cases.AuthCase.signUp(params.email, params.password)

    if (!data.ok)
      return res.status(400).json({ ok: data.ok, message: data.message })

    req.session.user = data.user

    const sessionId = req.sessionID

    return res.status(201).json({
      ok: data.ok,
      message: data.message,
      user: data.user,
      sid: signSession(sessionId)
    })
  }

  async logOut(req, res) {
    await req.session.destroy()

    return res.status(200).json({ ok: true, message: 'Успешный выход' })
  }
}
