import { CorsOptions, CorsOptionsDelegate } from 'cors'

export const corsOptions: CorsOptionsDelegate = (request, callback) => {
  const options: CorsOptions = {
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Request-ID', 'X-Requested-With']
  }

  // returning true reflects Origin in the request header
  // for returning custom/dynamic origins,
  // please refer to: https://github.com/expressjs/cors/?tab=readme-ov-file#configuration-options
  options['origin'] = true

  callback(null, options)
}
