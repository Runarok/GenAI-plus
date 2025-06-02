import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, RotateCcw, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface GameMenuProps {
  onStartGame: () => void;
  onRestart: () => void;
  echoes: number;
  level: number;
}

const GameMenu: React.FC<GameMenuProps> = ({
  onStartGame,
  onRestart,
  echoes,
  level
}) => {
  const { theme, toggleTheme } = useTheme();
  const { isMenuOpen, bestScore, currentScore } = useGameStore();

  if (!isMenuOpen) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className={`
        p-8 rounded-xl shadow-2xl w-96
        ${theme === 'dark' 
          ? 'bg-gray-900 text-purple-300' 
          : 'bg-white text-blue-600'}
      `}>
        <h2 className="text-3xl font-bold mb-6 text-center">Echo Maze</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span>Current Level:</span>
            <span className="font-bold">{level}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Echoes Left:</span>
            <span className="font-bold">{echoes}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Best Score:</span>
            <span className="font-bold">{bestScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Current Score:</span>
            <span className="font-bold">{currentScore}</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={onStartGame}
            className={`
              w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2
              transition-colors duration-300
              ${theme === 'dark'
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'}
            `}
          >
            <Play size={20} />
            Start Game
          </button>
          
          <button
            onClick={onRestart}
            className={`
              w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2
              transition-colors duration-300
              ${theme === 'dark'
                ? 'bg-purple-800 hover:bg-purple-900 text-purple-200'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}
            `}
          >
            <RotateCcw size={20} />
            Restart
          </button>
          
          <button
            onClick={toggleTheme}
            className={`
              w-full py-3 px-6 rounded-lg flex items-center justify-center gap-2
              transition-colors duration-300
              ${theme === 'dark'
                ? 'bg-purple-800 hover:bg-purple-900 text-purple-200'
                : 'bg-blue-100 hover:bg-blue-200 text-blue-800'}
            `}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            Toggle Theme
          </button>
        </div>
        
        <div className="mt-6 text-sm text-center opacity-80">
          <p>Press ESC to toggle menu</p>
          <p>WASD or Arrow Keys to move</p>
          <p>Spacebar to send echo</p>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;