import { Cell, CellType } from '../types/game';

export default class Player {
  public x: number;
  public y: number;
  private radius: number;
  private theme: 'dark' | 'light';
  private moveSpeed: number = 4; // Adjusted movement speed
  
  constructor(x: number, y: number, radius: number, theme: 'dark' | 'light') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.theme = theme;
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    ctx.fillStyle = this.theme === 'dark' ? '#f0f0ff' : '#3b82f6';
    ctx.fill();
    
    if (this.theme === 'dark') {
      ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      ctx.shadowBlur = 10;
      ctx.strokeStyle = 'rgba(180, 180, 255, 1)';
      ctx.stroke();
      ctx.shadowBlur = 0;
    } else {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.stroke();
    }
  }
  
  public move(dx: number, dy: number, maze: Cell[][], cellSize: number): boolean {
    const newX = this.x + dx * this.moveSpeed;
    const newY = this.y + dy * this.moveSpeed;
    
    // Check if the new position would be inside a wall
    if (this.checkCollision(newX, newY, maze, cellSize)) {
      return false;
    }
    
    this.x = newX;
    this.y = newY;
    return true;
  }
  
  private checkCollision(x: number, y: number, maze: Cell[][], cellSize: number): boolean {
    // Check collision at multiple points around the player's circle
    const points = 8; // Number of points to check
    const buffer = 2; // Small buffer to prevent getting too close to walls
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const checkX = x + Math.cos(angle) * (this.radius - buffer);
      const checkY = y + Math.sin(angle) * (this.radius - buffer);
      
      const cellX = Math.floor(checkX / cellSize);
      const cellY = Math.floor(checkY / cellSize);
      
      // Check bounds
      if (cellX < 0 || cellX >= maze[0].length || cellY < 0 || cellY >= maze.length) {
        return true;
      }
      
      // Check if point is in a wall
      if (maze[cellY][cellX].type === CellType.WALL) {
        return true;
      }
    }
    
    return false;
  }
  
  public updateTheme(theme: 'dark' | 'light'): void {
    this.theme = theme;
  }
}