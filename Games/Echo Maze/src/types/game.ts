export enum CellType {
  WALL,
  PATH
}

export interface Cell {
  type: CellType;
  visible: number; // 0 to 1, representing visibility
}

export interface Position {
  x: number;
  y: number;
}