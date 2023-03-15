import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { getMyPosts } from '../api/postApi';

export const MyPosts = () => {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    getMyPosts()
      .then(data => {
        setPosts(data.posts)
      })
      .catch(e => {
        console.error(e)
      })
  }, []);

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
                    <td><i className="text-danger fa-solid fa-trash"></i></td>
                    <td>{post.isPublish ? 
                        (<i className="text-success fa-solid fa-check"></i>) 
                        : (<i className="text-danger fa-solid fa-xmark "></i>)}</td>
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
