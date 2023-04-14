import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { editProfile, userProfile } from '../api/userApi'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { successMessage } from '../utils/alerts'

export const EditProfile = () => {
  const { userInfo, setUserInfo } = useContext(UserContext)
  const { userId } = useParams()
  const navigate = useNavigate()
  const initialform = {
    username: '',
    email: '',
    password: ''
  }
  const [form, setform] = useState(initialform)
  const { username, email, password } = form

  const handleFormChange = (e) => {
    const value = e.target.value
    setform({ ...form, [e.target.name]: value })
  }

  useEffect(() => {
    userProfile()
      .then((data) => {
        setform({ ...form, ...data })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    editProfile(userId, form)
      .then(_ => {
        setUserInfo({ ...userInfo, ...form })
        successMessage('Profile updated successfully')
        navigate('/')
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={5}>
          <h3 className="text-center mb-3">Edit Profile</h3>
          <Form action="" onSubmit={handleSubmit}>
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="email"
              name="email"
              placeholder="Email..."
              value={email}
              onChange={handleFormChange}
              autoComplete="off"
            />
            <Form.Control
              className="mb-2 py-3 fs-5 fw-light"
              type="text"
              name="username"
              placeholder="Username..."
              value={username}
              onChange={handleFormChange}
              autoComplete="off"
            />
            <Form.Control
              className="mb-3 py-3 fs-5 fw-light"
              type="password"
              name="password"
              placeholder="Password..."
              value={password}
              onChange={handleFormChange}
              autoComplete="on"
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
