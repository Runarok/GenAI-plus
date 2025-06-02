import { Cell, CellType } from '../types/game';

export default class Player {
  public x: number;
  public y: number;
  private radius: number;
  private theme: 'dark' | 'light';
  
  constructor(x: number, y: number, radius: number, theme: 'dark' | 'light') {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.theme = theme;
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
    // Draw player as a circle
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    // Fill color based on theme
    ctx.fillStyle = this.theme === 'dark' ? '#f0f0ff' : '#3b82f6';
    ctx.fill();
    
    // Add glow effect in dark theme
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
    // Calculate new position
    const newX = this.x + dx * 5;
    const newY = this.y + dy * 5;
    
    // Calculate cell coordinates
    const cellX = Math.floor(newX / cellSize);
    const cellY = Math.floor(newY / cellSize);
    
    // Check if new position is valid (not a wall)
    if (cellX >= 0 && cellX < maze[0].length && 
        cellY >= 0 && cellY < maze.length && 
        maze[cellY][cellX].type !== CellType.WALL) {
      
      // Check collision with walls at the edges of the player's circle
      if (this.checkWallCollision(newX, newY, maze, cellSize)) {
        return false;
      }
      
      this.x = newX;
      this.y = newY;
      return true;
    }
    
    return false;
  }
  
  private checkWallCollision(x: number, y: number, maze: Cell[][], cellSize: number): boolean {
    // Check collision with walls at the edges of the player's circle
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      const edgeX = x + Math.cos(angle) * this.radius;
      const edgeY = y + Math.sin(angle) * this.radius;
      
      const edgeCellX = Math.floor(edgeX / cellSize);
      const edgeCellY = Math.floor(edgeY / cellSize);
      
      if (edgeCellX >= 0 && edgeCellX < maze[0].length && 
          edgeCellY >= 0 && edgeCellY < maze.length) {
        if (maze[edgeCellY][edgeCellX].type === CellType.WALL) {
          return true;
        }
      }
    }
    
    return false;
  }
  
  public updateTheme(theme: 'dark' | 'light'): void {
    this.theme = theme;
  }
}