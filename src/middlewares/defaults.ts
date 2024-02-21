import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import { handler as timeoutHandler } from 'express-timeout-handler'
import helmet from 'helmet'
import responseTime from 'response-time'

import logger from '@/middlewares/logger'
import requestID from '@/middlewares/request_id'
import { corsOptions } from '@/utils/cors'
import env from '@/utils/env'
import { defaultTimeoutOptions } from '@/utils/timeout'

export const registerDefaultMiddlewares = (app: Express) => {
  if (process.env.APP_ENV === 'production') {
    app.set('trust proxy', true)
    app.disable('x-powered-by')
    app.use(
      compression({
        filter: (request: Request, response: Response) => {
          if (request.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
          }

          // fallback to standard filter function
          return compression.filter(request, response)
        }
      })
    )
  }

  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors(corsOptions))
  app.use(cookieParser(env.COOKIE_SECRET !== '' ? env.COOKIE_SECRET : undefined))
  app.use(responseTime())
  app.use(timeoutHandler(defaultTimeoutOptions))
  app.use(requestID())
  app.use(logger())

  app.options('*', cors(corsOptions))
}
