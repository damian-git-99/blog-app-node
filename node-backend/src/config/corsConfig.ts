import * as dotenv from 'dotenv'
dotenv.config()

const cors_domain = process.env.cors_domain || ''

console.log(cors_domain)

export const corsOptions = {
  origin: '*',
  credentials: false,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}
