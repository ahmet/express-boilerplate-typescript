import { createServer, Server } from 'node:http'

import { NextFunction, Request, Response } from 'express'

import app from '@/app'
import env from '@/utils/env'

// Graceful Shutdown indicator
let acceptingConnections = true
let server: Server

// Express app
try {
  // Graceful Shutdown middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (!acceptingConnections) {
      res.status(503).send('Server is shutting down')
    } else {
      next()
    }
  })

  app.get('/health/liveness', (req: Request, res: Response) => {
    const status = acceptingConnections ? 200 : 503
    res.status(status).json({ alive: acceptingConnections })
  })

  // HTTP server
  server = createServer(app)
} catch (error) {
  process.exit(1)
}

// Start listening
server.listen(env.PORT || 3000).on('error', (err) => {
  console.log(err)
  process.exit(1)
})

// Graceful Shutdown signal handler
const gracefulShutdownHandler = (signal: NodeJS.Signals) => {
  acceptingConnections = false

  console.log(signal)

  setTimeout(() => {
    // stop the server from accepting new connections
    server.close(() => {
      // once the server is not accepting connections, exit
      process.exit()
    })
  }, 0)
}

// The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
process.on('SIGINT', gracefulShutdownHandler)
// The SIGTERM signal is sent to a process to request its termination.
process.on('SIGTERM', gracefulShutdownHandler)
// Nodemon sends SIGUSR2 to a process when it restarts.
process.once('SIGUSR2', gracefulShutdownHandler)
