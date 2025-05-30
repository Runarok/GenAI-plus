import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Brain, Info, Play, Settings } from 'lucide-react';

const MainMenu: React.FC = () => {
  const { startGame, showTutorial, setDifficulty, gameState } = useGame();
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto text-center space-y-8 p-6 bg-slate-800/50 rounded-xl backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <Brain className="h-16 w-16 text-blue-400 mb-2" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          MindFlex
        </h1>
        <p className="text-slate-300">Train your brain with adaptive cognitive challenges</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        <button
          onClick={startGame}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <Play className="h-5 w-5" />
          Start Game
        </button>
        
        <button
          onClick={showTutorial}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors"
        >
          <Info className="h-5 w-5" />
          How to Play
        </button>
      </div>

      <div className="border-t border-slate-700 pt-4 w-full">
        <h3 className="text-sm uppercase text-slate-400 mb-3">Difficulty</h3>
        <div className="flex items-center justify-center gap-3">
          {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
            <button
              key={difficulty}
              onClick={() => setDifficulty(difficulty)}
              className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                gameState.difficulty === difficulty
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-slate-400">
        <p>Version 1.0 • Cognitive Training Game</p>
      </div>
    </div>
  );
};

export default MainMenu;