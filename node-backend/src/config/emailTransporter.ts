import nodemailer from 'nodemailer'
import config from 'config'

interface config {
  host: string
  port: number
  user: string
  password: string
}

const emailConfig = config.get<config>('email')

const options = {
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.password
  }
}

export const transporter = nodemailer.createTransport(options)
