import { EmailService } from './EmailService'
import { transporter } from '../config/emailTransporter'
import { logger } from '../config/logger'
import { Service } from 'typedi'

@Service('emailService')
class EmailServiceNodeMailer implements EmailService {
  async sendEmail(to: string, subject: string, body: string): Promise<any> {
    try {
      await transporter.sendMail({
        from: 'My App <info@my-app.com>',
        to: to,
        subject: subject,
        html: body
      })
      logger.info(`Email sent successfully PasswordReset: ${to}`)
    } catch (error) {
      logger.error(error)
      throw new Error('Server Error: Failed to send email')
    }
  }
}
