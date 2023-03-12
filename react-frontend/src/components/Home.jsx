import React from 'react'
import { NavBar } from './NavBar'
import { PostEntry } from './PostEntry'
import { Container, Row } from 'react-bootstrap'

export const Home = () => {
  return (
    <main className="mt-5">
      <NavBar />

      <Container className="mt-5 p-0 p-md-3">
        <Row>
          <PostEntry />
          <PostEntry />
          <PostEntry />
        </Row>
      </Container>
    </main>
  )
}
