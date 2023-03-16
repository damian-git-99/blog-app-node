import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export const PostEntry = ({ post }) => {
  const navigate = useNavigate();
  const image = post.image ? post.image : 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  const handleClick = () => {
    navigate('/post/' + post._id);
  }
  return (
    <Col md={12} className='mb-4 border-bottom p-4' onClick={handleClick} style={{cursor: 'pointer'}}>
      <Row>
        <Col md={4}>
          <img className='img img-fluid' src={image} alt="" />
        </Col>
        <Col md={8} className='p-4 p-md-0'>
          <h2 className='mt-2 mt-md-0'>{post.title}</h2>
          <p className='text-muted'> <span className='fw-bolder'>{post?.user?.email}</span> 2021-01-07 11:04:13</p>
          <p>{post.summary}</p>
          {/* <div dangerouslySetInnerHTML={{ __html: post.content}} /> */}
          <p className='bg-secondary d-inline-block px-3 text-white'>{post.category}</p>
          <p style={{marginLeft: '20px'}} className='ml-3 bg-secondary d-inline-block px-3 text-white'>{post.time_to_read} min read</p>
        </Col>
      </Row>
    </Col>
  )
}
