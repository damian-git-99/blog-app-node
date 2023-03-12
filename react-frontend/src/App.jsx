import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={ <Home /> } />
    </Routes>
  );
}

export default App;
