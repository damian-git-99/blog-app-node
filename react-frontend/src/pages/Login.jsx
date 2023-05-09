/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/authApi'
import { errorMessage, successMessage } from '../utils/alerts'
import { UserContext } from '../context/userContext'

export const Login = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const isValidForm = Object.keys(errors).length === 0

  if (userInfo) {
    navigate('/')
  }

  const onSubmit = (data) => {
    if (!isValidForm) return
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
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-4">Login</h3>
          {!isValidForm && <Alert variant='danger'>All Fields are required</Alert>}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              name="email"
              className="mb-2 py-3 fs-5 fw-light"
              type="email"
              placeholder="Email..."
              {...register('email', { required: true })}
            />
            <Form.Control
              name="password"
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              placeholder="Password..."
              {...register('password', { required: true })}
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
