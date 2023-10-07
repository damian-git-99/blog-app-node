const config = {
  port: '3000',
  jwt_secret: 'secret_password',
  cors_domain: process.env.cors_domain,
  frontend_domain: process.env.frontend_domain,
  backend_domain: process.env.backend_domain,
  google_client_id: '',
  database: {
    uri: ''
  },
  cloudinary: {
    cloud_name: '',
    api_key: '',
    api_secret: ''
  },
  email: {
    host: '',
    port: '',
    user: '',
    password: ''
  },
}

console.log(config)

module.exports = config;

