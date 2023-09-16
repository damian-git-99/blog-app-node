import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

const Comment = ({ author, content, date }) => {
  return (
    <ListGroupItem>
      <div className="comment">
        <h5 className="comment-author">{author}</h5>
        <p className="comment-content">{content}</p>
        <p className="comment-date">{date}</p>
      </div>
    </ListGroupItem>
  )
}

const Comments = ({ comments = [] }) => {
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
              key={comment.id}
              author={comment.author}
              content={comment.content}
              date={comment.date}
            />
          ))}
        </ListGroup>
          )}
    </div>
  )
}

export default Comments
