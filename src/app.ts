import express, { Express, Request, Response } from 'express'

import { registerDefaultMiddlewares } from '@/middlewares/defaults'

const app: Express = express()
registerDefaultMiddlewares(app)

app.get('/', (req: Request, res: Response) => {
  res.json({})
})

app.get('/health/readiness', (req: Request, res: Response) => {
  if (req.get('X-Requested-With') !== 'Kubernetes') {
    return res.status(404).send()
  }

  const status = 200 // update the condition accordingly to return dynamic response, 200 = ready, 503 = not ready
  res.status(status).json({ ready: true }) // update response body accordingly
})

// Not found handler
app.use('*', (req: Request, res: Response) => {
  res.status(404).send()
})

export default app
