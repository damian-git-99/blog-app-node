import React, { useEffect } from 'react'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { useForm } from 'react-hook-form'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { errorMessage } from '../utils/alerts'
import { useUserInfo } from '../hooks/useUserInfo'
import { googleSignInRequest } from '../api/authApi'

export const Register = () => {
  const navigate = useNavigate()
  const { state, register: registerUser, loginWithData } = useUserInfo()
  const { userInfo, register: { error, loading } } = state
  const { register, handleSubmit, formState: { errors } } = useForm()
  const isValidForm = Object.keys(errors).length === 0
  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
    if (error) {
      errorMessage(error)
    }
  }, [userInfo, error])

  const onSubmit = (data) => {
    const { password, repeatPassword } = data
    if (!isValidForm) return
    if (password !== repeatPassword) {
      errorMessage('Passwords do not match')
      return
    }
    registerUser({ ...data })
  }

  const onGoogleSignin = async (credentialResponse) => {
    const userData = await googleSignInRequest(credentialResponse.credential)
    loginWithData(userData)
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-4">Register</h3>
          {!isValidForm && <Alert variant='danger'>All Fields are required</Alert>}
          {loading && <Alert variant='info'>Loading...</Alert>}
          <Form action="" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="email"
              name="email"
              placeholder="Email..."
              {...register('email', { required: true })}
            />
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="text"
              name="username"
              placeholder="Username..."
              {...register('username', { required: true })}
            />
            <Form.Control
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              name="password"
              placeholder="Password..."
              {...register('password', { required: true })}
            />
            <Form.Control
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              name="repeatPassword"
              placeholder="Repeat Password..."
              {...register('repeatPassword', { required: true })}
            />
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary py-3 fs-5 mb-4 w-100"
            >
              Register
            </Button>
          </Form>
          <div className='d-flex justify-content-between mb-5'>
            <Link className="text-dark" to="/login">
              I have an account
            </Link>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_google_client_id}>
                <GoogleLogin
                  onSuccess={onGoogleSignin}
                  onError={() => {
                    console.log('Login Failed')
                  }}
                />
            </GoogleOAuthProvider>
          </div>

        </Col>
      </Row>
    </Container>
  )
}
