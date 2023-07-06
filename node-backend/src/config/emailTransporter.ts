import nodemailer from 'nodemailer'
import * as dotenv from 'dotenv'
dotenv.config()

const options = {
  host: process.env.email_host,
  port: parseInt(process.env.email_port || '0'),
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass
  }
}

export const transporter = nodemailer.createTransport(options)
