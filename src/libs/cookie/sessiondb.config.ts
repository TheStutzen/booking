import { SessionOptions } from 'express-session'
import { customSessionStore } from '.'

export function createSessionConfig(): SessionOptions {
  const sessionStore = customSessionStore

  return {
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    saveUninitialized: false,
    resave: true,
    proxy: true,
    store: sessionStore,
    cookie:
      process.env.NODE_ENV === 'development'
        ? {
            path: '/',
            httpOnly: false,
            maxAge: 2592000000,
            domain: process.env.COOKIE_DOMAIN
          }
        : {
            path: '/',
            httpOnly: false,
            maxAge: 2592000000,
            domain: process.env.COOKIE_DOMAIN
          }
  }
}
