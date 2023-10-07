import config from 'config'
import { logger } from './logger'

const cors_domain =
  (config.get('cors_domain') as string) || 'http://localhost:5173'

export const corsOptions = {
  origin: cors_domain,
  credentials: true,
  methods: ['POST', 'PUT', 'GET', 'DELETE']
}

logger.info('CORS configuration loaded: ' + cors_domain)
