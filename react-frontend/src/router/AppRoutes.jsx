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
import { ProtectedRoutes } from './ProtectedRoutes'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/post/:postId'} element={<Post />} />
        <Route element={<ProtectedRoutes />} >
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/edit/:postId'} element={<EditPost />} />
          <Route path={'/my-posts'} element={<MyPosts />} />
        </Route>
      </Route>
    </Routes>
  )
}
