/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Col, Row, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { errorMessage } from '../utils/alerts'
import { useUserInfo } from '../hooks/useUserInfo'

export const Login = () => {
  const navigate = useNavigate()
  const { state, login } = useUserInfo()
  const { userInfo, login: { error, loading } } = state
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

  const onSubmit = ({ email, password }) => {
    if (!isValidForm) return
    login(email, password)
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-4">Login</h3>
          {!isValidForm && <Alert variant='danger'>All Fields are required</Alert>}
          {loading && <Alert variant='info'>Loading...</Alert>}
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
