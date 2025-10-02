import * as request from 'supertest'
import * as express from 'express'
import * as session from 'express-session'
import * as cookieParser from 'cookie-parser'
import { mariaDbDataSource } from '../src/db'
import { Routes } from '../src/adapters/api'
import { createSessionConfig } from '../src/libs/cookie/sessiondb.config'

describe('Chat (e2e)', () => {
  let app: express.Application
  let agent: any

  beforeAll(async () => {
    await mariaDbDataSource
      .initialize()
      .then(() => console.info('✅ Connected to MariaDb'))
      .catch((err) => console.error(err))

    app = express()
    app.use(express.json())
    app.use(cookieParser())
    app.use(session(createSessionConfig()))

    new Routes(app)

    agent = request.agent(app)
  })

  afterAll(async () => {
    await mariaDbDataSource.destroy()
  })

  describe('Auth', () => {
    it('signUp', async () => {
      return await agent
        .post('/auth/signUp')
        .send({ email: 'test@bk.ru', password: '12345' })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: true,
            message: 'Пользователь успешно зарегестрирован',
            user: expect.objectContaining({
              userId: 1
            })
          })
        })
    })

    it('signUp not possible (email address exists)', async () => {
      return await agent
        .post('/auth/signUp')
        .send({ email: 'test@bk.ru', password: '12345' })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: false,
            message: 'Пользователь с указанной почтой уже зарегистрирован'
          })
        })
    })

    it('logOut', async () => {
      return await agent
        .get('/auth/logOut')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: true,
            message: 'Успешный выход'
          })
        })
    })

    it('signIn not possible (user not exist)', async () => {
      return await agent
        .post('/auth/signIn')
        .send({ email: 'admin@bk.ru', password: '12345' })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: false,
            message: 'Неправильный логин или пароль'
          })
        })
    })

    it('signIn', async () => {
      return await agent
        .post('/auth/signIn')
        .send({ email: 'test@bk.ru', password: '12345' })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: true,
            user: expect.objectContaining({
              userId: 1
            })
          })
        })
    })
  })

  describe('Bookings', () => {
    it('booking reserve', async () => {
      return await agent
        .post('/api/bookings/reserve')
        .send({ event_id: 1 })
        .expect(201)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: true,
            message: 'Бронирование успешно выполнено'
          })
        })
    })

    it('booking reserve not possible (reserve has arleady been made)', async () => {
      return await agent
        .post('/api/bookings/reserve')
        .send({ event_id: 1 })
        .expect(400)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: false,
            message:
              'Бронирование невозможно: уже забронировано, нет мест или событие не найдено'
          })
        })
    })

    it('signOut', async () => {
      return await agent
        .get('/auth/logOut')
        .expect(200)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: true,
            message: 'Успешный выход'
          })
        })
    })

    it('booking reserve', async () => {
      return await agent
        .post('/api/bookings/reserve')
        .send({ event_id: 1 })
        .expect(401)
        .then((res) => {
          expect(res.body).toMatchObject({
            ok: false,
            message: 'Unauthorized'
          })
        })
    })
  })
})
