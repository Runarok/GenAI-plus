import React, { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, RotateCcw, Sun, Moon, Info, X } from 'lucide-react';
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
      {showInfo ? (
        <div className={`
          w-[500px] p-8 rounded-2xl shadow-2xl
          transition-all duration-300 ease-out transform
          ${theme === 'dark' 
            ? 'bg-gray-900 text-purple-300 shadow-purple-900/50' 
            : 'bg-white text-blue-600 shadow-blue-200'}
        `}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">How to Play</h2>
            <button
              onClick={() => setShowInfo(false)}
              className={`
                p-2 rounded-full transition-colors duration-300
                ${theme === 'dark'
                  ? 'hover:bg-purple-800/50'
                  : 'hover:bg-blue-100'}
              `}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-2">Controls</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Use WASD or Arrow Keys to move one tile at a time</li>
                <li>Press Spacebar to send an echo pulse</li>
                <li>Press ESC to pause/open menu</li>
                <li>Collect yellow orbs by moving next to them</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Game Modes</h3>
              <div className="space-y-4">
                {gameModes.map(({ label, description }) => (
                  <div key={label}>
                    <h4 className="font-semibold">{label}</h4>
                    <p className={`
                      text-sm
                      ${theme === 'dark' ? 'text-purple-400' : 'text-blue-500'}
                    `}>{description}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-semibold mb-2">Tips</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>Yellow orbs are always visible to help plan your route</li>
                <li>Each collected orb gives you an extra echo</li>
                <li>You must collect all orbs before the exit becomes active</li>
                <li>The game ends if you try to use an echo with none remaining</li>
              </ul>
            </section>
          </div>
        </div>
      ) : (
        <div className={`
          w-[500px] p-8 rounded-2xl shadow-2xl
          transition-all duration-300 ease-out transform
          ${theme === 'dark' 
            ? 'bg-gray-900 text-purple-300 shadow-purple-900/50' 
            : 'bg-white text-blue-600 shadow-blue-200'}
        `}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Echo Maze</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInfo(true)}
                className={`
                  p-2 rounded-full transition-colors duration-300
                  ${theme === 'dark'
                    ? 'hover:bg-purple-800/50'
                    : 'hover:bg-blue-100'}
                `}
                aria-label="Show game information"
              >
                <Info size={24} />
              </button>
              <button
                onClick={toggleTheme}
                className={`
                  p-2 rounded-full transition-colors duration-300
                  ${theme === 'dark'
                    ? 'hover:bg-purple-800/50'
                    : 'hover:bg-blue-100'}
                `}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </div>
          </div>
          
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' 
                  ? 'bg-purple-900/30' 
                  : 'bg-blue-50'}
              `}>
                <div className="text-sm font-medium mb-1">Current Level</div>
                <div className="text-2xl font-bold">{level}</div>
              </div>
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' 
                  ? 'bg-purple-900/30' 
                  : 'bg-blue-50'}
              `}>
                <div className="text-sm font-medium mb-1">Echoes Left</div>
                <div className="text-2xl font-bold">{echoes}</div>
              </div>
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' 
                  ? 'bg-purple-900/30' 
                  : 'bg-blue-50'}
              `}>
                <div className="text-sm font-medium mb-1">Best Score</div>
                <div className="text-2xl font-bold">{bestScore}</div>
              </div>
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' 
                  ? 'bg-purple-900/30' 
                  : 'bg-blue-50'}
              `}>
                <div className="text-sm font-medium mb-1">Current Score</div>
                <div className="text-2xl font-bold">{currentScore}</div>
              </div>
            </div>
            
            {timeRemaining !== null && (
              <div className={`
                p-4 rounded-xl
                ${theme === 'dark' 
                  ? 'bg-purple-900/30' 
                  : 'bg-blue-50'}
              `}>
                <div className="text-sm font-medium mb-1">Time Remaining</div>
                <div className="text-2xl font-bold">
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </div>
              </div>
            )}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium mb-3">Game Mode</label>
            <div className="space-y-2">
              {gameModes.map(({ mode, label, description }) => (
                <button
                  key={mode}
                  onClick={() => setGameMode(mode)}
                  className={`
                    w-full p-4 rounded-xl text-left transition-all duration-300
                    ${gameMode === mode
                      ? theme === 'dark'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                        : 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : theme === 'dark'
                        ? 'bg-purple-900/30 hover:bg-purple-800/30'
                        : 'bg-blue-50 hover:bg-blue-100'
                    }
                  `}
                >
                  <div className="font-semibold mb-1">{label}</div>
                  <div className={`
                    text-sm
                    ${gameMode === mode
                      ? 'text-white/80'
                      : theme === 'dark'
                        ? 'text-purple-400'
                        : 'text-blue-500'
                    }
                  `}>{description}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={onStartGame}
              className={`
                w-full py-4 px-6 rounded-xl
                flex items-center justify-center gap-2
                font-semibold text-white
                transition-all duration-300
                ${theme === 'dark'
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-900/50'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'}
              `}
            >
              <Play size={24} />
              Start Game
            </button>
            
            <button
              onClick={onRestart}
              className={`
                w-full py-4 px-6 rounded-xl
                flex items-center justify-center gap-2
                font-semibold
                transition-all duration-300
                ${theme === 'dark'
                  ? 'bg-purple-900/30 hover:bg-purple-800/30 text-purple-300'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'}
              `}
            >
              <RotateCcw size={24} />
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameMenu;