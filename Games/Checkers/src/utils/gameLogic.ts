import { Piece, Position, GameState, PlayerType } from '../types/game';

export const BOARD_SIZE = 8;

export const createInitialBoard = (): (Piece | null)[][] => {
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

export const isValidPosition = (row: number, col: number): boolean => {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
};

export const getValidMoves = (piece: Piece, position: Position, board: (Piece | null)[][]): Position[] => {
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
};

export const canCapture = (player: PlayerType, board: (Piece | null)[][]): boolean => {
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
};
