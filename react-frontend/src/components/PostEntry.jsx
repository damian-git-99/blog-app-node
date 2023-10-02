import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { formatDateOrDaysAgo } from '../utils/date'
import { PostCategories } from '../pages'

export const PostEntry = ({ post }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.stopPropagation()
    navigate('/post/' + post.id)
  }

  const handleUserClick = (e, username) => {
    e.stopPropagation()
    navigate(`/${username}`)
  }

  return (
    <div
      className="mb-4 border-bottom p-4"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Row className="justify-content-center">
        <Col md={3}>
          {post.image && (
            <img className="img img-fluid" src={post.image} alt="" />
          )}
        </Col>
        <Col md={8} className="p-4 p-md-2">
          <h2 className="mt-2 mt-md-0 d-inline">{post.title}</h2>
          <p className="text-muted">
            <span className="fw-bolder">
              <a
                className="btn-primary"
                onClick={(e) => handleUserClick(e, post?.user?.username)}
              >
                {post?.user?.username}
              </a>
            </span>
            {post.createdAt
              ? (
              <time> {formatDateOrDaysAgo(post.createdAt)}</time>
                )
              : (
                  ' unknown date'
                )}
          </p>
          <p>{post.summary}</p>
          <PostCategories post={post} />
          <p
            className="bg-secondary d-inline-block px-3 text-white"
          >
            {post.time_to_read} min read
          </p>

          {post.isPublish !== undefined && post.isPublish === false
            ? (
            <Alert variant="warning" className="text-center">
              Post is not published
            </Alert>
              )
            : null}
        </Col>
      </Row>
    </div>
  )
}

PostEntry.propTypes = {
  post: PropTypes.object.isRequired
}
