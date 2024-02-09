import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { formatDateOrDaysAgo } from '../utils/date'
import { PostCategories } from '../pages'
import './PostEntry.css'

export const PostEntry = ({ post }) => {
  return (
    <div className="mb-4 border-bottom p-4">
      <Row >
        <Col md={3} className='container-img'>
          {post.image && (
            <img className="post-image" src={post.image} alt="" />
          )}
        </Col>
        <Col md={9} className="p-4 p-md-2">
          <h2 className="mt-2 mt-md-0 d-inline">{post.title}</h2>

          <p className='text-muted'>Posted by <Link className='btn-primary' to={`/${post?.user?.username}`}>{post?.user?.username}</Link> on <time> {formatDateOrDaysAgo(post.createdAt)}</time></p>
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

          <div>
          <Link to={'/post/' + post.id} className="btn btn-primary">Read More</Link>

          </div>
        </Col>
      </Row>
    </div>
  )
}

PostEntry.propTypes = {
  post: PropTypes.object.isRequired
}
