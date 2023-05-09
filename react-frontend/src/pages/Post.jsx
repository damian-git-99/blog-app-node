/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { formatISO9075 } from 'date-fns'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePostById, getPostById } from '../api/postApi'
import { UserContext } from '../context/userContext'
import { confirmDialog, errorMessage, successMessage } from '../utils/alerts'

export const Post = () => {
  const { postId } = useParams()
  const [post, setPost] = useState(undefined)

  useEffect(() => {
    getPostById(postId)
      .then(data => {
        setPost(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        {post && (
          <div>
            <Col md={12}>
              <PostHeader post={post} postId={postId} />
            </Col>
            <Col md={12} className="mt-5">
              <PostContent post={post} />
            </Col>
          </div>
        )}
      </Row>
    </Container>
  )
}

const PostHeader = ({ post, postId }) => {
  const navigate = useNavigate()
  const { userInfo } = useContext(UserContext)

  const deletePost = () => {
    confirmDialog(() => {
      deletePostById(postId)
        .then((_) => {
          successMessage('Post successfully deleted')
          navigate(`/${userInfo.username}`)
        })
        .catch((error) => {
          errorMessage(error.message)
        })
    })
  }

  const editPost = () => {
    navigate(`/edit/${postId}`)
  }

  return (
    <div>
      <h1 className="text-center mb-5 fw-bold fs-1">{post.title}</h1>
      {
        (userInfo && userInfo.username && userInfo.username === post.user.username) &&
          (
          <div>
            <Button onClick={editPost} variant='primary mb-3'>Edit Post</Button>
            <Button onClick={deletePost} variant='danger mb-3 mx-1'>Delete post</Button>
          </div>
          )
      }
      {post.isPublish === false && (
        <Alert variant="warning text-center">Post is not published</Alert>
      )}
      <p className="fw-bold"><Link to={`/${post?.user?.username}`}>{post?.user?.username}</Link> - { post.createdAt ? <time>{formatISO9075(new Date(post.createdAt))}</time> : ' unknown date' } </p>
      <p className="fw-light">
        {post.time_to_read} min read - category: {post.category}
      </p>
      {post.image !== '' && (
        <img className="img-header img-fluid" src={post.image} alt="" />
      )}
    </div>
  )
}

const PostContent = ({ post }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: post.content }}
      className="text-justify fs-4 fw-light"
    ></div>
  )
}
