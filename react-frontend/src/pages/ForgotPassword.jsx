import React, { useState } from 'react'
import { Form, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import { recoverPassword } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { successMessage } from '../utils/alerts'

export const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(undefined)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    setError(undefined)
    recoverPassword(email)
      .then(_ => {
        successMessage('check your email with the instructions to reset your password')
        navigate('/login')
      })
      .catch(e => {
        console.log(e.message)
        setError(e.message)
      })
      .finally(_ => setLoading(false))
  }

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={5} className='p-4'>
        <h4>Forgot Password ?</h4>
        { error && (
          <Alert variant='danger text-center'>{error}</Alert>
        ) }
        { loading && <div className='d-flex justify-content-center'> <Spinner animation="grow" /> </div> }
          <Form onSubmit={handleSubmit} className='mt-4'>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"s
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Button variant="primary mt-3" type="submit" disabled={loading}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
