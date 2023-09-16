import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { createComment } from '../api/postApi'

const CommentForm = ({ postId, setCommentCreated }) => {
  const [content, setContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (content.trim() === '') {
      return
    }
    const newComment = {
      message: content
    }
    createComment(postId, newComment)
      .then((_) => {
        // update posts array in parent component
        setCommentCreated(content)
      })
      .catch((err) => console.log(err))
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
