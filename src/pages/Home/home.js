import './home.css';
import logo from '../../resources/images/logo.svg';

import Button from '@mui/material/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="text-3xl font-bold underline" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button variant="contained">Hello World</Button>
      </header>
    </div>
  );
}

export default App;
