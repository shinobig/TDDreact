import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [count, setCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState(false);

  const handleDecrease = () => {
    if(count === 0 ){
      setErrorMessage(true);
    } else {
      setCount(count - 1)
    }
  }

  const handleIncrease = () => {
    setCount(count + 1);
    setErrorMessage(false);
  }

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">The counter is currently:&nbsp;<span data-test="count">{count > 0 ? count : 0}</span></h1>
      { errorMessage && <h1 data-test="error-display">Sorry, you can't decrease from 0</h1> }
      <button onClick={handleIncrease} data-test="increment-button">Increment counter</button>
      <button onClick={handleDecrease} data-test="decrement-button">decrement counter</button>
    </div>
  );
}

export default App;
