import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  CreatePost,
  EditPost,
  Home,
  Layout,
  Login,
  Post,
  Register
} from '../pages'
import { ProtectedRoutes } from './ProtectedRoutes'
import { PostsByUser } from '../pages/PostsByUser'
import { EditProfile } from '../pages/EditProfile'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/:username' element={<PostsByUser />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/post/:postId'} element={<Post />} />
        <Route element={<ProtectedRoutes />} >
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/edit/:postId'} element={<EditPost />} />
          <Route path={'/edit-profile/:userId'} element={<EditProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}
