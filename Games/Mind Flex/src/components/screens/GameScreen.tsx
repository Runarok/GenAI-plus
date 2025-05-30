import React, { useEffect, useState } from 'react';
import { useGame } from '../../hooks/useGame';
import PatternModule from '../modules/PatternModule';
import MazeModule from '../modules/MazeModule';
import WordModule from '../modules/WordModule';
import BoostBar from '../ui/BoostBar';
import { Clock } from 'lucide-react';

const GameScreen: React.FC = () => {
  const { gameState, endGame } = useGame();
  const { activeModule, isPaused, timeRemaining } = gameState;
  
  const [moduleTimer, setModuleTimer] = useState<number>(15);
  
  // Handle game timer
  useEffect(() => {
    if (isPaused) return;
    
    if (timeRemaining <= 0) {
      endGame();
      return;
    }
    
    const timer = setInterval(() => {
      setModuleTimer(prev => {
        if (prev <= 0) {
          // Time's up for this module, reset for next module
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeRemaining, isPaused, endGame]);
  
  // Render the active module
  const renderActiveModule = () => {
    switch (activeModule) {
      case 'pattern':
        return <PatternModule timeRemaining={moduleTimer} />;
      case 'maze':
        return <MazeModule timeRemaining={moduleTimer} />;
      case 'word':
        return <WordModule timeRemaining={moduleTimer} />;
      default:
        return <div>Loading next challenge...</div>;
    }
  };
  
  if (isPaused) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full text-center">
        <h2 className="text-3xl font-bold mb-4">Game Paused</h2>
        <p className="text-slate-300 mb-8">Take a moment to rest your mind.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-semibold">
          {activeModule && activeModule.charAt(0).toUpperCase() + activeModule.slice(1)} Challenge
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-700 rounded-full">
          <Clock className="h-4 w-4 text-yellow-400" />
          <span className="font-mono">{moduleTimer}s</span>
        </div>
      </div>
      
      <BoostBar />
      
      <div className="flex-1 flex items-center justify-center bg-slate-800/50 rounded-xl backdrop-blur-sm p-4 my-4">
        {renderActiveModule()}
      </div>
    </div>
  );
};

export default GameScreen;