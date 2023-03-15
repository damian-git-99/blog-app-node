import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { deletePostById, getMyPosts } from '../api/postApi';
import { confirmDialog, errorMessage, successMessage } from '../utils/alerts';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export const MyPosts = () => {
  // todo: move this to another component to avoid repeating code
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  if (!userInfo) navigate('/login')
  // todo ------------------------------

  const [posts, setPosts] = useState(null)
  const [postDelete, setPostDelete] = useState(false)

  useEffect(() => {
    getMyPosts()
      .then(data => {
        setPosts(data.posts)
      })
      .catch(e => {
        console.error(e)
      })
  }, [postDelete]);

  const deletePost = (postId) => {
    confirmDialog(() => {
      deletePostById(postId)
        .then(_ => {
          setPostDelete(true);
          successMessage("Post successfully deleted")
        })
        .catch(error => {
          errorMessage(error.message)
        })
    })
  }

  return (
    <Container className="mt-5">
      <Row className='justify-content-center align-items-center'>
        <Col md={12}>
          <Table responsive>
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Edit</th>
                <th>Delete</th>
                <th>Is Published ?</th>
              </tr>
            </thead>
            <tbody>
              {posts && (
                posts.map(post => (
                  <tr>
                    <td>{post.title}</td>
                    <td>{post.category}</td>
                    <td><i className="text-primary fa-solid fa-pen"></i></td>
                    <td><i onClick={() => deletePost(post._id)} className="text-danger fa-solid fa-trash"></i></td>
                    <td><i 
                      className={ post.isPublish ? 'text-success fa-solid fa-check': 'text-danger fa-solid fa-xmark'}>
                      </i>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
