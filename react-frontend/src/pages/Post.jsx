import React, { useEffect, useState } from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/postApi';

export const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null)

  useEffect(() => {
    getPostById(postId)
      .then(data => {
        setPost(data);
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);
  
  return (
    <Container className="mt-5">
      <Row className='justify-content-center'>
        {post && (
          <Row className='col-9 justify-content-center'>
            <h1 className='text-center mb-5 fw-bold fs-1'>{post.title}</h1>
            <Col md={12}>
              { post.isPublish == false && (
                <Alert variant='info text-center'>Post is not published</Alert>
              )}
              <p className='fw-bold'>Damian - 16/05/2022</p>
              <p className='fw-light'>{post.time_to_read} min read - category: {post.category}</p>
              { post.image != '' && (
                <img className='img-header img-fluid' src={post.image} alt="" />
              )}
            </Col>
            <Col md={12} className='mt-5'>
              <div dangerouslySetInnerHTML={{ __html: post.content}} className='text-justify fs-4 fw-light'>
              </div>
            </Col>
        </Row>
        )}
      </Row>
    </Container>
  )
}