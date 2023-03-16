import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from './pages/Layout';
import { CreatePost } from './pages/CreatePost';
import { MyPosts } from './pages/MyPosts';
import { Post } from './pages/Post';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={ <Home /> } />
        <Route path={'/login'} element={ <Login /> } />
        <Route path={'/register'} element={ <Register /> } />
        <Route path={'/create'} element={ <CreatePost /> } />
        <Route path={'/my-posts'} element={ <MyPosts /> } />
        <Route path={'/post/:postId'} element={ <Post /> } />
      </Route>
    </Routes>
  );
}

export default App;
