import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  CreatePost,
  EditPost,
  Home,
  Layout,
  Login,
  MyPosts,
  Post,
  Register
} from '../pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/create'} element={<CreatePost />} />
        <Route path={'/my-posts'} element={<MyPosts />} />
        <Route path={'/post/:postId'} element={<Post />} />
        <Route path={'/edit/:postId'} element={<EditPost />} />
      </Route>
    </Routes>
  )
}
