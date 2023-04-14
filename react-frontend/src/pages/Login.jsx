/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/authApi'
import { errorMessage, successMessage } from '../utils/alerts'
import { UserContext } from '../context/userContext'

export const Login = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  if (userInfo) {
    navigate('/')
  }

  const onSubmit = (data) => {
    const validForm = Object.keys(errors).length === 0
    if (!validForm) return
    login({ ...data })
      .then((data) => {
        setUserInfo({ ...data })
        successMessage('you have successfully logged in')
        navigate('/')
      })
      .catch((e) => {
        errorMessage(e.message)
      })
  }
  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-4">Login</h3>
          {Object.keys(errors).length > 0 && <Alert variant='danger'>All Fields are required</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              name="email"
              className="mb-2 py-3 fs-5 fw-light"
              type="email"
              placeholder="Email..."
              {...register('email', { required: 'Email is required' })}
            />
            <Form.Control
              name="password"
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              placeholder="Password..."
              {...register('password', { required: 'Password is required' })}
            />
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary py-3 fs-5 mb-4 w-100"
            >
              Login
            </Button>
          </Form>
          <Link className="text-dark" to="/register">
            Don't have an account
          </Link>
        </Col>
      </Row>
    </Container>
  )
}
