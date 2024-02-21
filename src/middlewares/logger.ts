import { NextFunction, Request, Response } from 'express'

import logger from '@/utils/logger'

const loggerMiddleware = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    request.logger = logger.child({ request_id: request.get('X-Request-Id') })
    next()
  }
}

export default loggerMiddleware
