/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { NextFunction, Request, Response } from 'express'
import joi, { Schema } from 'joi'

export const validateRequestBody = (schema: Schema) => (request: Request, response: Response, next: NextFunction) => {
  // Validate the request body against the schema
  const { value, error } = joi.compile(schema).validate(request.body)

  if (error) {
    const errMessage = error.details.map((detail) => detail.message).join(', ')
    return response.status(400).json({ message: errMessage })
  }

  request.body = value
  return next()
}
