import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { editProfile, userProfile } from '../api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { successMessage } from '../utils/alerts'

export const EditProfile = () => {
  const { register, handleSubmit, reset } = useForm()
  const { userId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    userProfile()
      .then((data) => {
        reset(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const onSubmit = (data) => {
    editProfile(userId, data)
      .then(_ => {
        successMessage('Profile updated successfully')
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-3">Edit Profile</h3>
          <Form action="" onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="email"
              name="email"
              placeholder="Email..."
              {...register('email')}
            />
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="text"
              name="username"
              placeholder="Username..."
              {...register('username')}
            />
            <Form.Control
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              name="password"
              placeholder="Password..."
              {...register('password')}
            />
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary py-3 fs-5 mb-4 w-100"
            >
              Edit Profile
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
