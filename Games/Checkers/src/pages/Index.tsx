import React, { useState, useCallback, useEffect } from 'react';
import { RotateCcw, Crown, Circle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

type PieceType = 'regular' | 'king';
type PlayerType = 'red' | 'cyan';

interface Piece {
  type: PieceType;
  player: PlayerType;
}

interface Position {
  row: number;
  col: number;
}

interface GameState {
  board: (Piece | null)[][];
  currentPlayer: PlayerType;
  selectedPiece: Position | null;
  validMoves: Position[];
  capturedPieces: { red: number; cyan: number };
  gameStatus: 'playing' | 'red-wins' | 'cyan-wins' | 'draw';
  lastMove: { from: Position; to: Position; captured?: Position[] } | null;
}

const BOARD_SIZE = 8;

const createInitialBoard = (): (Piece | null)[][] => {
  const board: (Piece | null)[][] = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
  
  // Place red pieces (top 3 rows)
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { type: 'regular', player: 'red' };
      }
    }
  }
  
  // Place cyan pieces (bottom 3 rows)
  for (let row = BOARD_SIZE - 3; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if ((row + col) % 2 === 1) {
        board[row][col] = { type: 'regular', player: 'cyan' };
      }
    }
  }
  
  return board;
};

const CheckersGame = () => {
  const { theme, toggleTheme } = useTheme();
  const [gameState, setGameState] = useState<GameState>({
    board: createInitialBoard(),
    currentPlayer: 'red',
    selectedPiece: null,
    validMoves: [],
    capturedPieces: { red: 0, cyan: 0 },
    gameStatus: 'playing',
    lastMove: null
  });

  const isValidPosition = (row: number, col: number): boolean => {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  };

  const getValidMoves = useCallback((piece: Piece, position: Position, board: (Piece | null)[][]): Position[] => {
    const moves: Position[] = [];
    const { row, col } = position;
    const { player, type } = piece;
    
    const directions = type === 'king' 
      ? [[-1, -1], [-1, 1], [1, -1], [1, 1]] // Kings can move in all directions
      : player === 'red' 
        ? [[1, -1], [1, 1]] // Red moves down
        : [[-1, -1], [-1, 1]]; // Cyan moves up

    for (const [dRow, dCol] of directions) {
      const newRow = row + dRow;
      const newCol = col + dCol;
      
      if (isValidPosition(newRow, newCol) && !board[newRow][newCol]) {
        moves.push({ row: newRow, col: newCol });
      }
      
      // Check for jumps
      const jumpRow = row + 2 * dRow;
      const jumpCol = col + 2 * dCol;
      
      if (isValidPosition(jumpRow, jumpCol) && 
          board[newRow][newCol] && 
          board[newRow][newCol]!.player !== player && 
          !board[jumpRow][jumpCol]) {
        moves.push({ row: jumpRow, col: jumpCol });
      }
    }
    
    return moves;
  }, []);

  const canCapture = useCallback((player: PlayerType, board: (Piece | null)[][]): boolean => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = board[row][col];
        if (piece && piece.player === player) {
          const moves = getValidMoves(piece, { row, col }, board);
          if (moves.some(move => Math.abs(move.row - row) === 2)) {
            return true;
          }
        }
      }
    }
    return false;
  }, [getValidMoves]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (gameState.gameStatus !== 'playing') return;

    const clickedPiece = gameState.board[row][col];
    
    // If clicking on own piece, select it
    if (clickedPiece && clickedPiece.player === gameState.currentPlayer) {
      const validMoves = getValidMoves(clickedPiece, { row, col }, gameState.board);
      
      // Check if forced to capture
      const hasCaptures = canCapture(gameState.currentPlayer, gameState.board);
      const captureMove = validMoves.filter(move => Math.abs(move.row - row) === 2);
      
      setGameState(prev => ({
        ...prev,
        selectedPiece: { row, col },
        validMoves: hasCaptures ? captureMove : validMoves
      }));
      return;
    }
    
    // If no piece selected, do nothing
    if (!gameState.selectedPiece) return;
    
    // Check if clicked position is a valid move
    const isValidMove = gameState.validMoves.some(move => move.row === row && move.col === col);
    if (!isValidMove) {
      setGameState(prev => ({ ...prev, selectedPiece: null, validMoves: [] }));
      return;
    }
    
    // Execute the move
    const newBoard = gameState.board.map(row => [...row]);
    const piece = newBoard[gameState.selectedPiece.row][gameState.selectedPiece.col]!;
    
    // Move piece
    newBoard[row][col] = piece;
    newBoard[gameState.selectedPiece.row][gameState.selectedPiece.col] = null;
    
    // Handle captures
    const capturedPositions: Position[] = [];
    if (Math.abs(row - gameState.selectedPiece.row) === 2) {
      const capturedRow = (row + gameState.selectedPiece.row) / 2;
      const capturedCol = (col + gameState.selectedPiece.col) / 2;
      newBoard[capturedRow][capturedCol] = null;
      capturedPositions.push({ row: capturedRow, col: capturedCol });
    }
    
    // Handle kinging
    if ((piece.player === 'red' && row === BOARD_SIZE - 1) || 
        (piece.player === 'cyan' && row === 0)) {
      newBoard[row][col] = { ...piece, type: 'king' };
    }
    
    // Check for additional jumps
    const hasMoreJumps = capturedPositions.length > 0 && 
                        getValidMoves(newBoard[row][col]!, { row, col }, newBoard)
                          .some(move => Math.abs(move.row - row) === 2);
    
    // Update captured pieces count
    const newCapturedPieces = { ...gameState.capturedPieces };
    if (capturedPositions.length > 0) {
      const opponent = gameState.currentPlayer === 'red' ? 'cyan' : 'red';
      newCapturedPieces[opponent] += capturedPositions.length;
    }
    
    // Check win condition
    let newGameStatus = gameState.gameStatus;
    const opponent = gameState.currentPlayer === 'red' ? 'cyan' : 'red';
    const opponentHasPieces = newBoard.some(row => 
      row.some(cell => cell && cell.player === opponent)
    );
    
    if (!opponentHasPieces) {
      newGameStatus = `${gameState.currentPlayer}-wins` as any;
    }
    
    setGameState({
      board: newBoard,
      currentPlayer: hasMoreJumps ? gameState.currentPlayer : opponent,
      selectedPiece: hasMoreJumps ? { row, col } : null,
      validMoves: hasMoreJumps ? 
        getValidMoves(newBoard[row][col]!, { row, col }, newBoard)
          .filter(move => Math.abs(move.row - row) === 2) : [],
      capturedPieces: newCapturedPieces,
      gameStatus: newGameStatus,
      lastMove: {
        from: gameState.selectedPiece,
        to: { row, col },
        captured: capturedPositions.length > 0 ? capturedPositions : undefined
      }
    });
  }, [gameState, getValidMoves, canCapture]);

  const resetGame = () => {
    setGameState({
      board: createInitialBoard(),
      currentPlayer: 'red',
      selectedPiece: null,
      validMoves: [],
      capturedPieces: { red: 0, cyan: 0 },
      gameStatus: 'playing',
      lastMove: null
    });
  };

  const isValidMoveSquare = (row: number, col: number) => {
    return gameState.validMoves.some(move => move.row === row && move.col === col);
  };

  const isSelectedSquare = (row: number, col: number) => {
    return gameState.selectedPiece?.row === row && gameState.selectedPiece?.col === col;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800 transition-colors duration-300">
      <div className="container mx-auto p-4 lg:p-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <div className="text-center flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white mb-2">
              Checkers
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
              Classic strategy game
            </p>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-600"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-gray-700" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {/* Game Status - Left */}
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
              onClick={resetGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </button>
          </div>

          {/* Game Board - Center */}
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
                        onClick={() => handleSquareClick(row, col)}
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

          {/* Instructions - Right */}
          <div className="lg:order-3 space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                How to Play
              </h3>
              
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 mt-1 flex-shrink-0"></div>
                  <p>Click a piece to select it and see valid moves</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-1 flex-shrink-0"></div>
                  <p>Pieces move diagonally on dark squares only</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <Crown className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <p>Reach the opposite end to become a king</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-400 mt-1 flex-shrink-0"></div>
                  <p>Jump over opponent pieces to capture them</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-1 flex-shrink-0"></div>
                  <p>Capture all opponent pieces to win</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckersGame;
