import React from 'react'
import { Col, Row } from 'react-bootstrap'

export const PostEntry = () => {
  return (
    <Col md={12} className='mb-4'>
      <Row>
        <Col md={5}>
          <img className='img img-fluid' src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGNlbGwlMjBwaG9uZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        </Col>
        <Col md={7} className='p-4 p-md-0'>
          <h2 className='mt-2 mt-md-0'>Quickly change the weight (boldness)</h2>
          <p className='text-muted'> <span className='fw-bolder'>Author: Damian</span> 2021-01-07 11:04:13</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, non aliquid, neque amet aperiam facere laboriosam consectetur ad velit dolorem nostrum inventore incidunt necessitatibus sit ullam iusto ex quia labore?</p>
        </Col>
      </Row>
    </Col>
  )
}
