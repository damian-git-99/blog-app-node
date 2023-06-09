import React, { useEffect, useState } from 'react'
import { PostEntry } from '../components/PostEntry'
import { Container, Row } from 'react-bootstrap'
import { getFavoritePosts } from '../api/userApi'

export const FavoritePosts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getFavoritePosts()
      .then(setPosts)
      .catch(console.error)
  }, [])

  return (
    <>
      <Container className="mt-5 p-0 p-md-3">
        <h1 className='text-center'>Favorite Posts</h1>
        <Row>
          {/* {isLoading && <p className='text-center'>Loading...</p>}
          {error && <Alert variant="danger" className='text-center'>{error}</Alert>} */}
          {posts && posts.length === 0 && <p className='text-center'>you have no favorite posts.</p> }
          {posts &&
            posts.map((post) => <PostEntry key={post._id} post={post} />)
          }
        </Row>
      </Container>
    </>
  )
}
