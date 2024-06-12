/*
 _    __  _  ___   ___   _ ___ ___  
| |  /  \| |/ | `v' / | | | __| __| 
| |_| /\ |   < `. .'| |_| | _|| _|  
|___|_||_|_|\_\ !_! |___|_|_| |___| 
              --2024--
https://github.com/Lakylife
Project Meme PizzaPenny.com 2024
*/
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebApp from '@twa-dev/sdk'
import TelegramInit from './Hooks/TelegramInit'

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <TelegramInit />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
