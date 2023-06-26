import nodemailer from 'nodemailer'
import { transporter } from '../config/emailTransporter'

export const sendPasswordReset = async (email: string, url: string) => {
  try {
    const info = await transporter.sendMail({
      from: 'My App <info@my-app.com>',
      to: email,
      subject: 'Password Reset',
      html: `
      <div>
        <b>Please click below link to reset your password</b>
      </div>
      <div>
        <a href="${url}">Reset</a>
      </div>
      `
    })
    console.log(info)
  } catch (error) {
    throw new Error('Server Error: Failed to send email')
  }
}
