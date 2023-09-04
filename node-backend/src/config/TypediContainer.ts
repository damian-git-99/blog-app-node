/**
 * This file defines and configures a dependency injection (DI) container using the TypeDI library.
 * Classes and services to be used throughout the application are registered in the container, and
 * their dependencies are established.
 */
// Import the classes and services to be registered in the container
import '../auth/jwt/JWTServiceImpl'
import '../auth/passwordEncoder/PasswordEncoderBcrypt'
import '../shared/email/EmailServiceNodeMailer'
import '../shared/image/ImageCloudinaryService'
