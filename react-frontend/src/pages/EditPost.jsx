/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import { formats, modules } from './reactQuillConfigs'
import { editPost, getPostById } from '../api/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export const EditPost = () => {
  // todo: move this to another component to avoid repeating code
  const { userInfo } = useContext(UserContext)
  const navigate = useNavigate()
  if (!userInfo) navigate('/login')
  // todo ------------------------------

  const { postId } = useParams()

  const initialForm = {
    title: '',
    summary: '',
    content: '',
    category: '',
    timeToRead: ''
  }

  const [form, setForm] = useState(initialForm)
  const { title, summary, content, category, timeToRead } = form

  useEffect(() => {
    getPostById(postId).then((data) => {
      const { title, summary, content, category, time_to_read } = data
      setForm({
        ...form,
        title,
        summary,
        content,
        category,
        timeToRead: time_to_read
      })
    })
  }, [])

  const handleFormChange = (e) => {
    const value = e.target.value
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
    // data.set('file', files[0])
    editPost(postId, data)
      .then((data) => {
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
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
              // onChange={(e) => setFiles(e.target.files)}
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
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary py-3 fs-5 mb-4"
            >
              Edit Post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
