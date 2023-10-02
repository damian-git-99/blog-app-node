/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import ReactQuill from 'react-quill'
import { editPost, getPostById, togglePublicationStatus } from '../api/postApi'
import { useNavigate, useParams } from 'react-router-dom'
import { successMessage } from '../utils/alerts'
import { formats, modules } from '../config/reactQuillConfigs'

export const EditPost = () => {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const { postId } = useParams()

  const [isPublish, setIsPublish] = useState(false)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getPostById(postId).then((data) => {
      const { content, time_to_read, isPublish } = data
      reset({
        ...data,
        timeToRead: time_to_read
      })
      setIsPublish(isPublish)
      setContent(content)
      setCategories(data.categories)
    })
  }, [])

  const handleAddCategory = () => {
    setCategories([...categories, ''])
  }

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...categories]
    updatedCategories[index] = value
    setCategories(updatedCategories)
  }

  const handleRemoveCategory = (index) => {
    const updatedCategories = [...categories]
    updatedCategories.splice(index, 1)
    setCategories(updatedCategories)
  }

  const onSubmit = (formData) => {
    const { title, summary, timeToRead } = formData
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('time_to_read', timeToRead)
    data.set('file', files[0])
    data.set('categories', JSON.stringify(categories))
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
            {/* <Form.Control
              name="category"
              className="mb-3 fw-light"
              type="text"
              placeholder="Category..."
              {...register('category', { required: true })}
            /> */}
            <div className='mt-5 d-flex'>
              <Button
                  className='align-self-start me-5'
                  type="button"
                  size="sm"
                  variant="outline-secondary py-2 fs-5 mb-2"
                  onClick={handleAddCategory}
                >
                Add Category
              </Button>
              <div className='flex-grow-1'>
                {categories.map((category, index) => (
                   <div key={index} className="d-flex align-items-center">
                   <Form.Control
                     name={`category-${index}`}
                     className="mb-3 fw-light mt-2 flex-grow-1"
                     type="text"
                     placeholder="Category..."
                     value={category}
                     onChange={(e) => handleCategoryChange(index, e.target.value)}
                   />
                   <Button
                     type="button"
                     size="sm"
                     variant="outline-danger"
                     className="ms-3 mb-2"
                     onClick={() => handleRemoveCategory(index)}
                   >
                     X
                   </Button>
                 </div>
                ))}
              </div>
            </div>
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
