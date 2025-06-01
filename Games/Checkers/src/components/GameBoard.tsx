
import { Crown, Circle } from 'lucide-react';
import { GameState, Position } from '../types/game';
import { BOARD_SIZE } from '../utils/gameLogic';

interface GameBoardProps {
  gameState: GameState;
  onSquareClick: (row: number, col: number) => void;
}

export const GameBoard = ({ gameState, onSquareClick }: GameBoardProps) => {
  const isValidMoveSquare = (row: number, col: number) => {
    return gameState.validMoves.some(move => move.row === row && move.col === col);
  };

  const isSelectedSquare = (row: number, col: number) => {
    return gameState.selectedPiece?.row === row && gameState.selectedPiece?.col === col;
  };

  return (
    <div className="lg:order-2 lg:col-span-2 flex justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-8 gap-1 w-full max-w-md lg:max-w-lg mx-auto aspect-square bg-amber-900 dark:bg-amber-800 p-2 rounded-xl">
          {Array.from({ length: BOARD_SIZE }, (_, row) =>
            Array.from({ length: BOARD_SIZE }, (_, col) => {
              const isBlackSquare = (row + col) % 2 === 1;
              const piece = gameState.board[row][col];
              const isSelected = isSelectedSquare(row, col);
              const isValidMove = isValidMoveSquare(row, col);
              
              return (
                <button
                  key={`${row}-${col}`}
                  onClick={() => onSquareClick(row, col)}
                  className={`
                    aspect-square relative flex items-center justify-center transition-all duration-200 rounded-lg
                    ${isBlackSquare 
                      ? 'bg-amber-800 dark:bg-amber-900 hover:bg-amber-700 dark:hover:bg-amber-800' 
                      : 'bg-amber-100 dark:bg-amber-200 hover:bg-amber-50 dark:hover:bg-amber-100'
                    }
                    ${isSelected ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
                    ${isValidMove ? 'ring-4 ring-green-400 ring-opacity-70' : ''}
                    hover:scale-105 active:scale-95
                  `}
                  disabled={gameState.gameStatus !== 'playing'}
                >
                  {piece && (
                    <div className={`
                      w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center
                      shadow-lg transition-all duration-200 border-2
                      ${piece.player === 'red' 
                        ? 'bg-gradient-to-br from-red-400 to-red-600 border-red-700' 
                        : 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-700'
                      }
                      ${piece.type === 'king' ? 'ring-2 ring-yellow-400' : ''}
                      hover:scale-110
                    `}>
                      {piece.type === 'king' ? (
                        <Crown className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-200" />
                      ) : (
                        <Circle className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-current opacity-80" />
                      )}
                    </div>
                  )}
                  
                  {isValidMove && !piece && (
                    <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-400 opacity-80 animate-pulse"></div>
                  )}
                </button>
              );
            })
          ).flat()}
        </div>
      </div>
    </div>
  );
};
