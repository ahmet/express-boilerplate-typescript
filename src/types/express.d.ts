import { Logger } from 'winston'

export {}

declare global {
  namespace Express {
    // Inject additional properties on express.Request
    export interface Request {
      id?: string | undefined
      logger?: Logger | undefined
    }
  }
}
