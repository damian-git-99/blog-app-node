import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { PostEntry } from '../components/PostEntry'
import { getPostsByUsername } from '../api/postApi'
import { useParams } from 'react-router-dom'

export const PostsByUser = () => {
  const [posts, setPosts] = useState(undefined)
  const [error, setError] = useState(undefined)
  const { username } = useParams()

  useEffect(() => {
    getPostsByUsername(username)
      .then((data) => {
        setPosts(data)
      })
      .catch((e) => {
        setError(e.message)
        console.error(e)
      })
  }, [username])

  return (
    <Container className="mt-5 p-0 p-md-3">
      { error && (
        <div className="alert alert-info text-center fs-2" role="alert">
          {error}
        </div>
      )}
      <Row>
        { posts && posts.length === 0
          ? (
          <div className="alert alert-info text-center fs-2" role="alert">
            No posts found for this user
          </div>
            )
          : null }
        {posts &&
          posts.map((post) => <PostEntry key={post._id} post={post} />)}
      </Row>
    </Container>
  )
}
