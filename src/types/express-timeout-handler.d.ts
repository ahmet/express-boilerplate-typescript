/// <reference types="express" />

declare module 'express-timeout-handler' {
  namespace e {
    interface TimeoutOptions {
      timeout?: number | undefined
      onTimeout?: (request: express.Request, response: express.Response, next: express.NextFunction) => void | undefined
      disable?: [string] | undefined
    }

    export function set(timeout: number): express.RequestHandler
    export function handler(opts?: TimeoutOptions): express.RequestHandler
  }

  export = e
}
