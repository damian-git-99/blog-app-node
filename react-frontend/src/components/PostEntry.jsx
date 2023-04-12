import React, { useContext } from 'react'
import { formatISO9075 } from 'date-fns'
import PropTypes from 'prop-types'
import { Alert, Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'

export const PostEntry = ({ post }) => {
  const { userInfo } = useContext(UserContext)
  const navigate = useNavigate()
  const image = post.image
    ? post.image
    : 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  const handleClick = () => {
    navigate('/post/' + post._id)
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
          <h2 className="mt-2 mt-md-0">{post.title}</h2>
          <p className="text-muted">
            {' '}
            <span className="fw-bolder">{post?.user?.email}</span>
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
          post.isPublish && post.isPublish === true
            ? (
            <Alert variant='warning' className="text-center">
              Post is not published
            </Alert>
              )
            : null
        }
        {
          userInfo && userInfo.username && userInfo.username === post.user.username
            ? (
            <Row>
              <Col xs={'3'} >
                <Alert variant='info' className='text-center'>OWNER</Alert>
              </Col>
            </Row>
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
