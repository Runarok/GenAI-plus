import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Pause, RotateCcw, Sun, Moon, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { GameMode } from '../types/game';

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
  const { 
    isMenuOpen, 
    bestScore, 
    currentScore, 
    gameMode, 
    setGameMode,
    timeRemaining 
  } = useGameStore();
  
  const [showInfo, setShowInfo] = useState(false);

  if (!isMenuOpen) return null;

  const gameModes = [
    { 
      mode: GameMode.CLASSIC, 
      label: 'Classic Mode',
      description: 'Limited echoes, collect all orbs, reach the exit'
    },
    { 
      mode: GameMode.TIME_ATTACK, 
      label: 'Time Attack',
      description: 'Race against time to complete levels'
    },
    { 
      mode: GameMode.SURVIVAL, 
      label: 'Survival Mode',
      description: 'More collectibles, fewer echoes, stay alive'
    },
    { 
      mode: GameMode.PUZZLE, 
      label: 'Puzzle Mode',
      description: 'Complex mazes with limited echoes'
    },
    { 
      mode: GameMode.EASY, 
      label: 'Easy Mode',
      description: 'Unlimited echoes for casual play'
    }
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      {showInfo ? (
        <div className={`
          p-8 rounded-xl shadow-2xl w-96 relative
          ${theme === 'dark' ? 'bg-gray-900 text-purple-300' : 'bg-white text-blue-600'}
        `}>
          <button
            onClick={() => setShowInfo(false)}
            className="absolute top-4 right-4 hover:opacity-80"
          >
            ×
          </button>
          
          <h3 className="text-2xl font-bold mb-4">How to Play</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-bold mb-2">Controls</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>WASD or Arrow Keys to move</li>
                <li>Spacebar to send echo pulse</li>
                <li>ESC to pause/menu</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Game Modes</h4>
              {gameModes.map(({ label, description }) => (
                <div key={label} className="mb-3">
                  <h5 className="font-bold">{label}</h5>
                  <p className="text-sm opacity-80">{description}</p>
                </div>
              ))}
            </div>
            
            <div>
              <h4 className="font-bold mb-2">Tips</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Collect yellow orbs to gain extra echoes</li>
                <li>You can collect orbs from adjacent tiles</li>
                <li>Find all orbs before reaching the exit</li>
                <li>Use echoes wisely to reveal the maze</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className={`
          p-8 rounded-xl shadow-2xl w-96
          ${theme === 'dark' ? 'bg-gray-900 text-purple-300' : 'bg-white text-blue-600'}
        `}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Echo Maze</h2>
            <button
              onClick={() => setShowInfo(true)}
              className={`
                p-2 rounded-full transition-colors duration-300
                ${theme === 'dark' 
                  ? 'hover:bg-purple-800' 
                  : 'hover:bg-blue-100'}
              `}
            >
              <Info size={20} />
            </button>
          </div>
          
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
            {timeRemaining !== null && (
              <div className="flex justify-between items-center">
                <span>Time Remaining:</span>
                <span className="font-bold">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Game Mode</label>
            <div className="space-y-2">
              {gameModes.map(({ mode, label }) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`
                    w-full py-2 px-4 rounded-lg text-left transition-colors duration-300
                    ${gameMode === mode
                      ? theme === 'dark'
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-purple-900 hover:bg-purple-800 text-purple-300'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                    }
                  `}
                >
                  {label}
                </button>
              ))}
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
        </div>
      )}
    </div>
  );
};

export default GameMenu;