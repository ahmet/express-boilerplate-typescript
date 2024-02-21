import { cleanEnv, num, port, str } from 'envalid'

export const validatedENV = cleanEnv(process.env, {
  NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production'] }),
  APP_ENV: str({ default: 'development', choices: ['development', 'production'] }),
  PORT: port({ default: 3000 }),
  COOKIE_SECRET: str({ default: '' }),
  REQUEST_TIMEOUT_MS: num({ default: 30000 })
})

export default validatedENV
