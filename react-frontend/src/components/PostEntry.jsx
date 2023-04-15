import React from 'react'
import { formatISO9075 } from 'date-fns'
import PropTypes from 'prop-types'
import { Alert, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const PostEntry = ({ post }) => {
  const navigate = useNavigate()
  const image = post.image
    ? post.image
    : 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  const handleClick = (e) => {
    e.stopPropagation()
    navigate('/post/' + post._id)
  }

  const handleUserClick = (e, username) => {
    e.stopPropagation()
    navigate(`/${username}`)
  }

  return (
    <Col
      md={12}
      className="mb-4 border-bottom p-4"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <Row>
        <Col md={4}>
          <img className="img img-fluid" src={image} alt="" />
        </Col>
        <Col md={8} className="p-4 p-md-0">
          <h2 className="mt-2 mt-md-0 d-inline">{post.title}</h2>
          <p className="text-muted">
            <span className="fw-bolder"><a className='btn-primary' onClick={(e) => handleUserClick(e, post?.user?.username)}>{post?.user?.username}</a></span>
            { post.createdAt ? <time> {formatISO9075(new Date(post.createdAt))}</time> : ' unknown date' }
          </p>
          <p>{post.summary}</p>
          <p className="bg-secondary d-inline-block px-3 text-white">
            {post.category}
          </p>
          <p
            style={{ marginLeft: '20px' }}
            className="ml-3 bg-secondary d-inline-block px-3 text-white"
          >
            {post.time_to_read} min read
          </p>

        {
          post.isPublish !== undefined && post.isPublish === false
            ? (
            <Alert variant='warning' className="text-center">
              Post is not published
            </Alert>
              )
            : null
        }
        </Col>
      </Row>
    </Col>
  )
}

PostEntry.propTypes = {
  post: PropTypes.object.isRequired
}
