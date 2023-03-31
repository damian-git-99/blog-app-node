import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Col, Container, Row, Button, Form } from 'react-bootstrap'
import { createPost } from '../api/postApi'
import { errorMessage, successMessage } from '../utils/alerts'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { formats, modules } from './reactQuillConfigs'

export const CreatePost = () => {
  const { userInfo } = useContext(UserContext)
  const navigate = useNavigate()
  if (!userInfo) navigate('/login')
  const initialForm = {
    title: '',
    summary: '',
    content: '',
    category: '',
    timeToRead: '',
    isPublish: false
  }
  const [form, setForm] = useState(initialForm)
  const [files, setFiles] = useState('')
  const { title, summary, content, category, timeToRead, isPublish } = form

  const handleFormChange = (e) => {
    const value = e.target.value
    if (e.target.name === 'isPublish') {
      setForm({ ...form, isPublish: !isPublish })
      return
    }
    setForm({ ...form, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // todo check if fields are not empty
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('category', category)
    data.set('time_to_read', timeToRead)
    data.set('isPublish', isPublish)
    data.set('file', files[0])
    createPost(data)
      .then((_) => {
        successMessage('post created successfully')
        navigate('/')
      })
      .catch((error) => {
        errorMessage(error.message)
      })
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col md={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Control
              name="title"
              className="mb-2 py-3 fs-5 fw-light"
              type="text"
              placeholder="Title..."
              value={title}
              onChange={handleFormChange}
            />
            <Form.Control
              name="summary"
              className="mb-3 py-3 fs-5 fw-light"
              type="summary"
              placeholder="summary..."
              value={summary}
              onChange={handleFormChange}
            />
            <Form.Control
              name="file"
              className="mb-3 fw-light"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />
            <ReactQuill
              value={content}
              formats={formats}
              modules={modules}
              className="mb-3"
              onChange={(e) => setForm({ ...form, content: e })}
            />
            <Form.Control
              name="category"
              className="mb-3 fw-light"
              type="text"
              placeholder="Category..."
              value={category}
              onChange={handleFormChange}
            />
            <Form.Control
              name="timeToRead"
              className="mb-3 fw-light"
              type="number"
              placeholder="time to finish reading the post in minutes..."
              value={timeToRead}
              onChange={handleFormChange}
            />
            <div className="form-check mt-1 mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="isPublish"
                id="flexCheckDefault"
                onChange={handleFormChange}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Publish Post After Creation.
              </label>
            </div>
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary py-3 fs-5 mb-4"
            >
              Create Post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
