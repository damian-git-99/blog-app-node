import React, { useState } from 'react'
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../api/authApi'
import { isThereAnEmptyField } from '../utils/stringValidations'
import { errorMessage, successMessage } from '../utils/alerts'

export const Login = () => {
  const navigate = useNavigate();
  const initialform = {
    email: '',
    password: '',
  }
  const [form, setform] = useState(initialform);
  const { email, password } = form;

  const handleFormChange = (e) => {
    const value = e.target.value;
    setform({ ...form, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isThereAnEmptyField(email, password)){
      errorMessage("No field must be empty");
      return;
    }

    login({ ...form })
      .then(data => {
        setform(initialform);
        successMessage('you have successfully logged in')
        navigate('/');
      })
      .catch(e => {
        errorMessage(e.message);
      })
  };

  return (
    <Container className="mt-5">
      <Row className='justify-content-center align-items-center'>
        <Col md={5} >
          <h3 className='text-center mb-1'>Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Control 
              name='email' 
              className='mb-2 py-3 fs-5 fw-light' 
              type="email" 
              onChange={handleFormChange} placeholder='Email...' value={email} />
            <Form.Control 
              name='password' 
              className='mb-3 py-3 fs-5 fw-light' 
              type="password" 
              onChange={handleFormChange} placeholder='Password...' value={password} />
            <Button type='submit' size='lg' variant='outline-secondary py-3 fs-5 mb-4 w-100'>Login</Button>
          </Form>
          <Link className='text-dark' to="/register">Don't have an account</Link>
      </Col>
      </Row>
    </Container>
  )
}
