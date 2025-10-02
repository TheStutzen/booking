import Controllers from '../../controllers'
import { guard } from './guards'

export class Routes {
  constructor(app: any) {
    app.use(async (req, res, next) => {
      if (req.path.startsWith('/auth')) {
        return next()
      }

      if (req.sessionID && req.session && req.session.user) {
        const isValid = await guard.checkSession(req)

        if (!isValid) {
          return res.status(401).json({ ok: false, message: 'Unauthorized' })
        }

        return next()
      }

      return res.status(401).json({ ok: false, message: 'Unauthorized' })
    })

    this.registerRoutes(app)
  }

  registerRoutes(app: any) {
    app.post('/auth/signIn', async (req: any, res: any) => {
      try {
        await Controllers.AuthController.signIn(req, res)
      } catch (err) {
        console.error(err)
        res.status(500).json({ ok: false, message: 'Internal Server Error' })
      }
    })

    app.post('/auth/signUp', async (req: any, res: any) => {
      try {
        return await Controllers.AuthController.signUp(req, res)
      } catch (err) {
        console.error(err)
        res.status(500).json({ ok: false, message: 'Internal Server Error' })
      }
    })

    app.get('/auth/logOut', async (req: any, res: any) => {
      try {
        return await Controllers.AuthController.logOut(req, res)
      } catch (err) {
        console.error(err)
        res.status(500).json({ ok: false, message: 'Internal Server Error' })
      }
    })

    app.post('/api/bookings/reserve', async (req: any, res: any) => {
      try {
        return await Controllers.BookingController.create(req, res)
      } catch (err) {
        console.error(err)
        res.status(500).json({ ok: false, message: 'Internal Server Error' })
      }
    })
  }
}
