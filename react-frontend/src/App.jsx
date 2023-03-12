import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={ <Home /> } />
      <Route path={'/login'} element={ <p>Hello</p> } />
    </Routes>
  );
}

export default App;
