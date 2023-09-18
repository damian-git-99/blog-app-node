import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(process.env.google_client_id)

export const googleVerify = async (idToken: string) => {
  const response = await client.verifyIdToken({
    idToken,
    audience: process.env.google_client_id
  })

  const payload = response.getPayload()

  console.log(payload)

  if (!payload) {
    throw new Error('Invalid token')
  }

  const { name, email } = payload
  return { name, email }
}
