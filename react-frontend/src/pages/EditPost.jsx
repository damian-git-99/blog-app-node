/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import { formats, modules } from './reactQuillConfigs'
import { editPost, getPostById, togglePublicationStatus } from '../api/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { successMessage } from '../utils/alerts'

export const EditPost = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const { postId } = useParams()

  const [isPublish, setIsPublish] = useState(false)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')

  useEffect(() => {
    getPostById(postId).then((data) => {
      const { content, time_to_read } = data
      reset({
        ...data,
        timeToRead: time_to_read
      })
      setIsPublish(isPublish)
      setContent(content)
    })
  }, [])

  const onSubmit = (formData) => {
    const { title, summary, category, timeToRead } = formData
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('category', category)
    data.set('time_to_read', timeToRead)
    data.set('file', files[0])
    editPost(postId, data)
      .then((data) => {
        successMessage('Post edited successfully')
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handlePublish = () => {
    togglePublicationStatus(postId)
      .then(data => {
        setIsPublish(!isPublish)
      })
      .catch(error => console.log(error))
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
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
              formats={formats}
              modules={modules}
              className="mb-3"
              value={content}
              onChange={(e) => setContent(e)}
            />
            <Form.Control
              name="category"
              className="mb-3 fw-light"
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
            <Button
              type="submit"
              size="lg"
              variant="outline-secondary"
              className='py-3 fs-5 mb-4 me-1'
            >
              Edit Post
            </Button>
            <Button
              type="button"
              size="lg"
              variant="outline-info"
              className='py-3 fs-5 mb-4'
              onClick={handlePublish}
            >
              {isPublish ? 'Unpublish Post' : 'Publish Post'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
