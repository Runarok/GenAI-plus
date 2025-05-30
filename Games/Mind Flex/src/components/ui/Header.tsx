import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Brain, Clock, PauseCircle, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const { gameState, pauseGame, resumeGame } = useGame();
  
  const { score, lives, timeRemaining, isGameActive, isPaused } = gameState;

  return (
    <header className="w-full py-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          MindFlex
        </h1>
      </div>
      
      {isGameActive && (
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1" title="Score">
            <span className="font-mono text-xl">{score}</span>
          </div>
          
          <div className="flex items-center gap-1" title="Lives">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="font-mono">{lives}</span>
          </div>
          
          <div className="flex items-center gap-1" title="Time Remaining">
            <Clock className="h-5 w-5 text-yellow-400" />
            <span className="font-mono">{timeRemaining}s</span>
          </div>
          
          <button
            onClick={isPaused ? resumeGame : pauseGame}
            className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            title={isPaused ? "Resume" : "Pause"}
          >
            <PauseCircle className="h-6 w-6 text-white" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;