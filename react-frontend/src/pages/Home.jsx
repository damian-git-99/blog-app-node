import React, { useEffect, useState } from 'react'
import { PostEntry } from '../components/PostEntry'
import { Alert, Col, Container, Row } from 'react-bootstrap'
import { getPosts } from '../api/postApi'

export const Home = () => {
  const [posts, setPosts] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(undefined)

  useEffect(() => {
    setError(undefined)
    setIsLoading(true)
    getPosts()
      .then((data) => {
        setPosts(data.posts)
      })
      .catch((e) => {
        console.error(e)
        setError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <main className="mt-5 animate__animated animate__fadeIn">
      <Container className="mt-5 p-0 p-md-3">
        <Row>
          {isLoading && <p className="text-center">Loading...</p>}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          {posts && posts.length === 0
            ? (
            <p className="text-center">No user has posted anything</p>
              )
            : null}
          {posts &&
            posts.map((post) => (
              <Col md={12} key={post.id}>
                <PostEntry post={post} />
              </Col>
            ))}
        </Row>
      </Container>
    </main>
  )
}
