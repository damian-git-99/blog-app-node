import React from 'react'
import { useForm } from 'react-hook-form'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { register as registerUser } from '../api/authApi'
import { errorMessage, successMessage } from '../utils/alerts'
import { useUserInfo } from '../hooks/useUserInfo'

export const Register = () => {
  const navigate = useNavigate()
  const { userInfo } = useUserInfo()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const isValidForm = Object.keys(errors).length === 0

  if (userInfo) {
    navigate('/')
  }

  const onSubmit = (data) => {
    const { password, repeatPassword } = data
    if (!isValidForm) return
    if (password !== repeatPassword) {
      errorMessage('Passwords do not match')
      return
    }
    registerUser({ ...data })
      .then((data) => {
        successMessage('User registration successful')
        navigate('/login')
      })
      .catch((e) => {
        errorMessage(e.message)
      })
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-4">Register</h3>
          {!isValidForm && <Alert variant='danger'>All Fields are required</Alert>}
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
          <Link className="text-dark" to="/login">
            I have an account
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
