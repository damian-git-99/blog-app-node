import * as dotenv from 'dotenv'
dotenv.config()

const cors_domain = process.env.cors_domain || ''

console.log(cors_domain)

export const corsOptions = {
  origin: '*',
  credentials: true,
  preflightContinue: true,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}
