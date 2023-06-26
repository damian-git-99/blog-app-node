import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'kamryn66@ethereal.email',
    pass: 'qZgtFjwAvZ63PKqbDf'
  }
})
