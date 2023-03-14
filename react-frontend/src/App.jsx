import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Layout } from './pages/Layout';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={ <Home /> } />
        <Route path={'/login'} element={ <Login /> } />
        <Route path={'/register'} element={ <Register /> } />
        <Route path={'/create'} element={ <CreatePost /> } />
      </Route>
    </Routes>
  );
}

export default App;
