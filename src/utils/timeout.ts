import { Request, Response } from 'express'

import env from '@/utils/env'

export const defaultTimeoutOptions = {
  timeout: env.REQUEST_TIMEOUT_MS,
  onTimeout: (request: Request, response: Response) => {
    response.status(408).json({ message: 'Request timed out' })
  }
}
