import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoutes } from './ProtectedRoutes'
import {
  CreatePost,
  EditPost,
  Home,
  Layout,
  Login,
  Post,
  Register,
  PostsByUser,
  EditProfile,
  FavoritePosts,
  ForgotPassword,
  ResetPassword
} from '@/pages'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<PostsByUser />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/forgot-password'} element={<ForgotPassword />} />
        <Route path={'/reset-password'} element={<ResetPassword />} />
        <Route path={'/post/:postId'} element={<Post />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/edit/:postId'} element={<EditPost />} />
          <Route path={'/edit-profile/:userId'} element={<EditProfile />} />
          <Route path={'/favorite-posts'} element={<FavoritePosts />} />
        </Route>
      </Route>
    </Routes>
  )
}
