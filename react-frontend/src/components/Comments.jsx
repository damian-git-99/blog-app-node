import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { formatDateOrDaysAgo } from '../utils/date'

const Comment = ({ author, content, date }) => {
  return (
    <ListGroupItem>
      <div className="comment">
        <h5 className="comment-author">{author}</h5>
        <p className="comment-content">{content}</p>
        <p className="comment-date">{formatDateOrDaysAgo(date, 'yyyy MMMM dd hh:mm:ss')}</p>
      </div>
    </ListGroupItem>
  )
}

const Comments = ({ comments = [] }) => {
  comments.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div className="comments">
      <h2>Comments</h2>
      {comments.length === 0
        ? (
        <p>No comments yet.</p>
          )
        : (
        <ListGroup>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              author={comment.user.username}
              content={comment.message}
              date={comment.createdAt}
            />
          ))}
        </ListGroup>
          )}
    </div>
  )
}

export default Comments
