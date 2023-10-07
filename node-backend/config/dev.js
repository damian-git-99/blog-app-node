const config = {
  port: process.env.port,
  jwt_secret: process.env.JWT_SECRET,
  cors_domain: process.env.cors_domain,
  frontend_domain: process.env.frontend_domain,
  backend_domain: process.env.backend_domain,
  google_client_id: process.env.google_client_id,
  database: {
    uri: process.env.MONGO_URI
  },
  cloudinary: {
    cloud_name: process.env.cloudinary_cloud_name,
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.cloudinary_api_secret
  },
  email: {
    host: process.env.email_host,
    port: process.env.email_port,
    user: process.env.email_user,
    password: process.env.email_pass
  },
}

console.log(config)

module.exports = config;

