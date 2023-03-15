import React, { useEffect, useState } from 'react'
import { PostEntry } from '../components/PostEntry'
import { Container, Row } from 'react-bootstrap'
import { getPosts } from '../api/postApi';

export const Home = () => {
  const [posts, setPosts] = useState(undefined);

  useEffect(() => {
    getPosts()
      .then(data => {
        setPosts(data.posts)
      })
      .catch(e => {
        console.error(e)
      })
  }, []);
  
  return (
    <main className="mt-5">
      <Container className="mt-5 p-0 p-md-3">
        <Row>
          { posts && (
            posts.map(post => (
              <PostEntry key={post._id} post={post} />
            ))
          )}
        </Row>
      </Container>
    </main>
  )
}
