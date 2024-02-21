import request from 'supertest'

import app from '@/app'

describe('express app', () => {
  beforeAll(async () => {})
  afterAll(async () => {})

  test('should respond with readiness probe', async () => {
    const res = await request(app).get('/health/readiness').set('X-Request-Origin', 'Kubernetes')
    expect(res.headers['content-type']).toEqual('application/json; charset=utf-8')
    expect(res.statusCode).toEqual(200)
  })

  test('should NOT respond with readiness probe if request origin is not set', async () => {
    const res = await request(app).get('/health/readiness')
    expect(res.statusCode).toEqual(404)
  })
})
