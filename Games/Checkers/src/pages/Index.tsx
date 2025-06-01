
import React, { useState, useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { createInitialBoard, getValidMoves, canCapture, BOARD_SIZE } from '../utils/gameLogic';
import { GameBoard } from '../components/GameBoard';
import { GameStatus } from '../components/GameStatus';
import { GameInstructions } from '../components/GameInstructions';
import { ThemeToggle } from '../components/ThemeToggle';

const CheckersGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createInitialBoard(),
    currentPlayer: 'red',
    selectedPiece: null,
    validMoves: [],
    capturedPieces: { red: 0, cyan: 0 },
    gameStatus: 'playing',
    lastMove: null
  });

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
  }, [gameState]);

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
          
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          <GameStatus gameState={gameState} onResetGame={resetGame} />
          <GameBoard gameState={gameState} onSquareClick={handleSquareClick} />
          <GameInstructions />
        </div>
      </div>
    </div>
  );
};

export default CheckersGame;
