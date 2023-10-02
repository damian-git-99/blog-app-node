/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deletePostById, getPostById } from '../api/postApi'
import { confirmDialog, errorMessage, successMessage } from '../utils/alerts'
import { useUserInfo } from '../hooks/useUserInfo'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import { addFavoritePost, deleteFavoritePost, isPostMarkedAsFavorite } from '../api/userApi'
import { formatDateOrDaysAgo } from '../utils/date'
import Comments from '../components/Comments'
import CommentForm from '../components/CommentForm'

export const Post = () => {
  const { state } = useUserInfo()
  const { userInfo } = state
  const { postId } = useParams()
  const [post, setPost] = useState(undefined)
  const [commentCreated, setCommentCreated] = useState('')

  useEffect(() => {
    getPostById(postId)
      .then(data => {
        setPost(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [commentCreated])

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center">
        {post && (
          <>
            <Col md={10}>
              <PostHeader post={post} postId={postId} />
            </Col>
            <Col md={10} className="mt-5">
              <PostContent post={post} />
            </Col>
            <Col md={10} className="mt-5">
              <PostCategories post={post} />
            </Col>
            { userInfo && (
              <Col md={10} className="mt-5">
                <CommentForm postId={postId} setCommentCreated={setCommentCreated} />
              </Col>
            ) }
            <Col md={10} className="mt-5 mb-5">
              <Comments comments={post?.comments} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  )
}

const PostHeader = ({ post, postId }) => {
  const navigate = useNavigate()
  const [isFavorite, setIsFavorite] = useState(false)
  const { state } = useUserInfo()
  const { userInfo } = state

  useEffect(() => {
    if (userInfo && userInfo.email) {
      isPostMarkedAsFavorite(postId)
        .then(data => {
          const { isMarkedAsFavorite } = data
          setIsFavorite(isMarkedAsFavorite)
        })
    }
  }, [postId])

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      { isFavorite ? 'Unmark as favorite' : 'Mark as favorite' }
    </Tooltip>
  )

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

  const markPostAsFavorite = () => {
    if (isFavorite) deleteFavoritePost(postId)
    else addFavoritePost(postId)
    setIsFavorite(!isFavorite)
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
      <Row className='justify-content-between'>
        <Col md={6}>
          {post.isPublish === false && (
            <Alert variant="warning text-center">Post is not published</Alert>
          )}
          <p className="fw-bold">
            <Link to={`/${post?.user?.username}`}>{post?.user?.username}</Link> - { post.createdAt ? <time>{formatDateOrDaysAgo(post.createdAt, 'yyyy MMMM dd hh:mm')}</time> : ' unknown date' }
          </p>
          <p className="fw-light">
            {post.time_to_read} min read
          </p>
        </Col>

        <Col md={1} className="d-block d-md-flex justify-content-end">
          { userInfo && <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <a onClick={markPostAsFavorite}>
                { isFavorite && <i className="bi bi-star-fill fs-4 text-warning text-right"></i> }
                { !isFavorite && <i className="bi bi-star fs-4 text-warning text-right"></i> }
              </a>
            </OverlayTrigger>
          }
        </Col>
      </Row>

      {post.image && (
        <img className="img-header img-fluid" src={post.image} alt="" />
      )}
    </div>
  )
}

export const PostCategories = ({ post }) => {
  if (!post.categories) return null
  const categories = post.categories
  return (
    categories.map((category, index) => (
      <span key={index} className="badge bg-secondary fs-6 me-2 mb-2">{category}</span>
    ))
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
