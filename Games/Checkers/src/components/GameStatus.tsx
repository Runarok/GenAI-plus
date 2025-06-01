
import { RotateCcw } from 'lucide-react';
import { GameState } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
  onResetGame: () => void;
}

export const GameStatus = ({ gameState, onResetGame }: GameStatusProps) => {
  return (
    <div className="lg:order-1 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Game Status
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Current Turn:</span>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 ${
                gameState.currentPlayer === 'red' 
                  ? 'bg-red-500 border-red-600' 
                  : 'bg-blue-500 border-blue-600'
              }`}></div>
              <span className={`font-medium ${
                gameState.currentPlayer === 'red' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {gameState.currentPlayer === 'red' ? 'Red' : 'Blue'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Captured Red:</span>
            <span className="text-red-600 font-medium">{gameState.capturedPieces.red}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-300">Captured Blue:</span>
            <span className="text-blue-600 font-medium">{gameState.capturedPieces.cyan}</span>
          </div>
        </div>
        
        {gameState.gameStatus !== 'playing' && (
          <div className="mt-4 p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 border border-yellow-300 dark:border-yellow-700 rounded-xl">
            <p className="text-yellow-800 dark:text-yellow-200 font-medium text-center">
              {gameState.gameStatus === 'red-wins' ? 'Red Wins!' :
               gameState.gameStatus === 'cyan-wins' ? 'Blue Wins!' : 'Draw!'}
            </p>
          </div>
        )}
      </div>
      
      <button
        onClick={onResetGame}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <RotateCcw className="w-4 h-4" />
        New Game
      </button>
    </div>
  );
};
