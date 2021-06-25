import Login from './components/Login';
import './App.css';
import Contact from './components/Contact';
import Home from './components/Home';
import Auction from './components/Auction';
import { Router } from '@reach/router';
function App() {
  return (
    <div className="App">
      <Router>
        <Login  path="/login"/>
        <Home  path="/"/>
        <Contact path="/about" />
        <Auction path="/auction" />
      </Router>

    </div>
  );
}

export default App;
