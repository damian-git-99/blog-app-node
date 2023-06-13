import * as dotenv from 'dotenv'
dotenv.config()

const cors_domain = process.env.cors_domain || 'http://localhost:5173'

export const corsOptions = {
  origin: cors_domain,
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}
