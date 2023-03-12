import React from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <Container className="mt-5">
      <Row className='vh-100 justify-content-center align-items-center'>
        <Col md={5} >
          <h3 className='text-center mb-3'>Register</h3>
          <Form>
            <Form.Control className='mb-2 py-3 fs-5 fw-light' type="text" placeholder='Email...' />
            <Form.Control className='mb-3 py-3 fs-5 fw-light' type="password" placeholder='Password...' />
            <Form.Control className='mb-3 py-3 fs-5 fw-light' type="password" placeholder='Repeat Password...' />
            <Button size='lg' variant='outline-secondary py-3 fs-5 mb-4 w-100'>Register</Button>
          </Form>
          <Link className='text-dark' to="/login">I have an account</Link>
      </Col>
      </Row>
    </Container>
  )
}
