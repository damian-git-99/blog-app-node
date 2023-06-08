import * as dotenv from 'dotenv'
dotenv.config()

const cors_domain = process.env.cors_domain || ''

console.log(cors_domain)

export const corsOptions = {
  origin: cors_domain,
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}
