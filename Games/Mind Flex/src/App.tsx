import React from 'react';
import { GameProvider } from './context/GameContext';
import GameContainer from './components/GameContainer';
import './index.css';

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
        <GameContainer />
      </div>
    </GameProvider>
  );
}

export default App;