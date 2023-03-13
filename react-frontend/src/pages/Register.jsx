import React, { useState } from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { register } from '../api/authApi'
import { isThereAnEmptyField } from '../utils/stringValidations'
import { errorMessage, successMessage } from '../utils/alerts'

export const Register = () => {
  const initialform = {
    email: '',
    password: '',
    repeatPassword: ''
  }
  const [form, setform] = useState(initialform);
  const { email, password, repeatPassword } = form;

  const handleFormChange = (e) => {
    const value = e.target.value;
    setform({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isThereAnEmptyField(email, password, repeatPassword)){
      errorMessage("No field must be empty");
      return;
    }

    if (password !== repeatPassword) {
      errorMessage("Passwords do not match");
      return;
    }

    register({ ...form })
      .then(data => {
        setform(initialform);
        successMessage("User registration successful");
      })
      .catch(e => {
        errorMessage(e.message);
      })
  };

  return (
    <Container className="mt-5">
      <Row className='justify-content-center align-items-center'>
        <Col md={5} >
          <h3 className='text-center mb-3'>Register</h3>
          <Form action='' onSubmit={handleSubmit} >
            <Form.Control 
              className='mb-2 py-3 fs-5 fw-light' 
              type="email" name='email' placeholder='Email...'
              value={email}
              onChange={handleFormChange}
              autoComplete="off" />
            <Form.Control 
              className='mb-3 py-3 fs-5 fw-light' 
              type="password" name='password' placeholder='Password...' 
              value={password}
              onChange={handleFormChange}
              autoComplete="on" />
            <Form.Control 
              className='mb-3 py-3 fs-5 fw-light' 
              type="password" name='repeatPassword' placeholder='Repeat Password...'
              value={repeatPassword}
              onChange={handleFormChange}
              autoComplete="off" />
            <Button
              type='submit' 
              size='lg' 
              variant='outline-secondary py-3 fs-5 mb-4 w-100'>Register</Button>
          </Form>
          <Link className='text-dark' to="/login">I have an account</Link>
      </Col>
      </Row>
    </Container>
  )
}
