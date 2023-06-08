import * as dotenv from 'dotenv'
dotenv.config()

const cors_domain = process.env.cors_domain || ''

export const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:5173', cors_domain],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204,
  credentials: true
}
