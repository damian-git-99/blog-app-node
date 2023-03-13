import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <Container className="mt-5">
      <Row className='justify-content-center align-items-center'>
        <Col md={5} >
          <h3 className='text-center mb-1'>Login</h3>
          <Form>
            <Form.Control className='mb-2 py-3 fs-5 fw-light' type="text" placeholder='Email...' />
            <Form.Control className='mb-3 py-3 fs-5 fw-light' type="password" placeholder='Password...' />
            <Button size='lg' variant='outline-secondary py-3 fs-5 mb-4 w-100'>Login</Button>
          </Form>
          <Link className='text-dark' to="/register">Don't have an account</Link>
      </Col>
      </Row>
    </Container>
  )
}
