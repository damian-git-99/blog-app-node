import React from 'react'
import { NavBar } from '../components/NavBar'
import { PostEntry } from '../components/PostEntry'
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
