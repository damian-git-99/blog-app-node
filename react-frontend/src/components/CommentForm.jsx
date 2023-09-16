import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const CommentForm = () => {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') {
      return
    }
    const newComment = {
      content,
      date: new Date().toLocaleString()
    }
    // call api
    setContent('')
  }

  return (
    <div className="comment-form">
      <h2>Add a Comment</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Label>Your Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CommentForm
