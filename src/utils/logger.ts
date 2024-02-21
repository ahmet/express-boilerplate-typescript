import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  defaultMeta: { node_env: process.env.NODE_ENV, app_env: process.env.APP_ENV },
  transports: [new transports.Console()]
})

export default logger
