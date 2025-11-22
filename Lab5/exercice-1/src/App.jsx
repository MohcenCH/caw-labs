import { useState } from 'react'
import './App.css'
import Click from "./components/Click.jsx";

function App() {
  const [clicked, setClicked] = useState(null);
  const [count, setCount] = useState(0);

  return (
    <>
     <Click />  <br /><br />
     <div>
      <button onClick={() => setClicked(1)}>Button1</button>
      <button onClick={() => setClicked(2)}>Button2</button>
      <button onClick={() => setClicked(3)}>Button3</button>

      <p>
        {clicked ? `Button #${clicked} was clicked` : "Click a button"}
      </p>
    </div>
    <br /><br />
    <div>
      <h1>{count}</h1>

      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </div>
    </>
  )
}

export default App
