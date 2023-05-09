import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Col, Container, Row, Button, Form, Alert } from 'react-bootstrap'
import { createPost } from '../api/postApi'
import { errorMessage, successMessage } from '../utils/alerts'
import { useNavigate } from 'react-router-dom'
import { formats, modules } from './reactQuillConfigs'

export const CreatePost = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const [files, setFiles] = useState('')
  const [isPublish, setIsPublish] = useState(false)
  const [content, setContent] = useState('')

  const onSubmit = (formData) => {
    const { title, summary, category, timeToRead } = formData
    const validForm = Object.keys(errors).length === 0
    if (!validForm || !content || content === '') return
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
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <h3 className="text-center mb-4">Create Post</h3>
        {Object.keys(errors).length > 0 && <Alert variant='danger'>All Fields are required</Alert>}
        <Col md={10}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Control
              name="title"
              className="mb-2 py-3 fs-5 fw-light"
              type="text"
              placeholder="Title..."
              {...register('title', { required: true })}
            />
            <Form.Control
              name="summary"
              className="mb-3 py-3 fs-5 fw-light"
              type="summary"
              placeholder="summary..."
              {...register('summary', { required: true })}
            />
            <Form.Control
              name="file"
              className="mb-3 fw-light"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />
            <ReactQuill
              style={{ height: '200px' }}
              value={content}
              formats={formats}
              modules={modules}
              className="mb-3"
              onChange={(e) => setContent(e)}
            />
            <Form.Control
              name="category"
              className="mb-3 fw-light mt-5"
              type="text"
              placeholder="Category..."
              {...register('category', { required: true })}
            />
            <Form.Control
              name="timeToRead"
              className="mb-3 fw-light"
              type="number"
              placeholder="time to finish reading the post in minutes..."
              {...register('timeToRead', { required: true })}
            />
            <div className="form-check mt-1 mb-1">
              <input
                className="form-check-input"
                type="checkbox"
                name="isPublish"
                id="flexCheckDefault"
                onChange={() => setIsPublish(!isPublish)}
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
