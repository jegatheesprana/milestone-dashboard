
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import { Container } from 'react-bootstrap';
import { Header, CurrentTime, TaskStatus, MileStones } from './components';
import Stepper from './components/milestones/milestoneComponent/Stepper';

function App() {
  return (
    <Container className="mt-2">
      <Header />
      <CurrentTime />
      <TaskStatus />
      <MileStones />

    </Container>

  );
}

export default App;
