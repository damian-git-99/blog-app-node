import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { deletePostById, getMyPosts } from '../api/postApi'
import { confirmDialog, errorMessage, successMessage } from '../utils/alerts'
import { useNavigate } from 'react-router-dom'

export const MyPosts = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState(undefined)
  const [postDelete, setPostDelete] = useState(false)

  useEffect(() => {
    getMyPosts()
      .then((data) => {
        setPosts(data.posts)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [postDelete])

  const deletePost = (postId) => {
    confirmDialog(() => {
      deletePostById(postId)
        .then((_) => {
          setPostDelete(true)
          successMessage('Post successfully deleted')
        })
        .catch((error) => {
          errorMessage(error.message)
        })
    })
  }

  const viewPost = (postId) => {
    navigate(`/post/${postId}`)
  }

  const editPost = (postId) => {
    navigate(`/edit/${postId}`)
  }

  return (
    <Container className="mt-5 animate__animated animate__fadeIn">
      <Row className="justify-content-center align-items-center">
        <Col md={12}>
          <Table responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>preview</th>
                <th>Is Published ?</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td>
                      <i
                        role="button"
                        onClick={() => editPost(post.id)}
                        className="text-primary fa-solid fa-pen"
                      ></i>
                    </td>
                    <td>
                      <i
                        role="button"
                        onClick={() => deletePost(post.id)}
                        className="text-danger fa-solid fa-trash"
                      ></i>
                    </td>
                    <td>
                      <i
                        role="button"
                        onClick={() => viewPost(post.id)}
                        className="text-primary fa-solid fa-magnifying-glass"
                      ></i>
                    </td>
                    <td>
                      <i
                        className={
                          post.isPublish
                            ? 'text-success fa-solid fa-check'
                            : 'text-danger fa-solid fa-xmark'
                        }
                      ></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
