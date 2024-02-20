import { cleanEnv, port, str } from 'envalid'

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str({ default: 'development', choices: ['development', 'test', 'production', 'staging'] }),
    PORT: port({ default: 3000 })
  })
}

export default validateEnv
