import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const requestID = () => {
  return (request: Request, response: Response, next: NextFunction) => {
    // If the request already has a request ID, use it
    const oldValue = request.get('X-Request-ID')
    const id = oldValue === undefined ? uuidv4() : oldValue

    // set the request id on the request object to be used with logger middleware
    request.id = id

    // set the request id on the response headers
    response.set('X-Request-ID', id)

    next()
  }
}

export default requestID
