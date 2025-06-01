
export type PieceType = 'regular' | 'king';
export type PlayerType = 'red' | 'cyan';

export interface Piece {
  type: PieceType;
  player: PlayerType;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  board: (Piece | null)[][];
  currentPlayer: PlayerType;
  selectedPiece: Position | null;
  validMoves: Position[];
  capturedPieces: { red: number; cyan: number };
  gameStatus: 'playing' | 'red-wins' | 'cyan-wins' | 'draw';
  lastMove: { from: Position; to: Position; captured?: Position[] } | null;
}
