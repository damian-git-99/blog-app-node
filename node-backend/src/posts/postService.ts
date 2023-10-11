import { Post } from './PostModel'
import { CurrentUser } from '../types/express/index'

export interface PostService {
  createPost(
    currentUser: CurrentUser,
    post: Post,
    image?: Express.Multer.File
  ): Promise<void>
  editPost(
    postId: string,
    newPost: Post,
    image: Express.Multer.File | undefined,
    currentUser: CurrentUser
  ): Promise<void>
  getRecentlyPublishedPosts(): Promise<Post[]>
  getMyPostsById(userId: string): Promise<Post[]>
  getPostsByUsername(
    username: string,
    currentUser?: CurrentUser
  ): Promise<Post[]>
  deletePostById(postId: string, currentUser: CurrentUser): Promise<void>
  getPostById(postId: string, currentUser: CurrentUser): Promise<Post>
  togglePublicationStatus(
    postId: string,
    currentUser: CurrentUser
  ): Promise<void>
  createComment(
    currentUser: CurrentUser,
    postId: string,
    message: string
  ): Promise<void>
}
