import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Container, Row } from 'react-bootstrap';
import { PostEntry } from './components/PostEntry';
import { NavBar } from './components/NavBar';
import './App.css';

function App() {
  return (
    <main className="App mt-5">
      <header className="container">
        <NavBar />
      </header>

      <Container className="mt-5 p-0 p-md-3">
        <Row>
          <PostEntry />
          <PostEntry />
          <PostEntry />
        </Row>
      </Container>
    </main>
  );
}

export default App;
