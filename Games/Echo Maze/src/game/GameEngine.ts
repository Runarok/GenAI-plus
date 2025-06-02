import MazeGenerator from './MazeGenerator';
import Player from './Player';
import EchoPulse from './EchoPulse';
import Collectible from './Collectible';
import { Cell, CellType, Position } from '../types/game';

export default class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private mazeGenerator: MazeGenerator;
  private player: Player;
  private maze: Cell[][];
  private echoPulses: EchoPulse[];
  private collectibles: Collectible[];
  private exitPosition: Position;
  private animationFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private theme: 'dark' | 'light';
  
  public maxEchoes: number = 5;
  private echoesRemaining: number = this.maxEchoes;
  private collectiblesFound: number = 0;
  public totalCollectibles: number = 3;
  private levelComplete: boolean = false;
  
  // Callback functions
  public onEchoUsed: (remaining: number) => void = () => {};
  public onCollectibleFound: (found: number, total: number) => void = () => {};
  public onGameOver: () => void = () => {};
  public onLevelComplete: () => void = () => {};
  
  constructor(canvas: HTMLCanvasElement, theme: 'dark' | 'light') {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.theme = theme;
    
    // Initialize maze generator with appropriate size
    const cellSize = 30;
    const mazeWidth = Math.floor(canvas.width / cellSize);
    const mazeHeight = Math.floor(canvas.height / cellSize);
    
    this.mazeGenerator = new MazeGenerator(mazeWidth, mazeHeight, cellSize);
    this.maze = this.mazeGenerator.generate();
    
    // Place player at start position
    const startPosition = this.mazeGenerator.getStartPosition();
    this.player = new Player(
      startPosition.x * cellSize + cellSize / 2,
      startPosition.y * cellSize + cellSize / 2,
      cellSize / 2,
      this.theme
    );
    
    // Set exit position
    this.exitPosition = this.mazeGenerator.getExitPosition();
    
    // Initialize echo pulses array
    this.echoPulses = [];
    
    // Create collectibles
    this.collectibles = [];
    this.placeCollectibles();
    
    // Set up keyboard controls
    this.setupControls();
    
    // Start game loop
    this.startGameLoop();
  }
  
  private placeCollectibles(): void {
    this.collectibles = [];
    const emptyPositions = this.mazeGenerator.getEmptyPositions();
    
    // Filter out positions near start and exit
    const startPos = this.mazeGenerator.getStartPosition();
    const exitPos = this.mazeGenerator.getExitPosition();
    
    const filteredPositions = emptyPositions.filter(pos => {
      // Don't place collectibles too close to start or exit
      const distanceToStart = Math.abs(pos.x - startPos.x) + Math.abs(pos.y - startPos.y);
      const distanceToExit = Math.abs(pos.x - exitPos.x) + Math.abs(pos.y - exitPos.y);
      return distanceToStart > 3 && distanceToExit > 3;
    });
    
    // Shuffle and pick positions
    for (let i = 0; i < this.totalCollectibles; i++) {
      if (filteredPositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredPositions.length);
        const position = filteredPositions.splice(randomIndex, 1)[0];
        
        this.collectibles.push(new Collectible(
          position.x * this.mazeGenerator.getCellSize() + this.mazeGenerator.getCellSize() / 2,
          position.y * this.mazeGenerator.getCellSize() + this.mazeGenerator.getCellSize() / 2,
          this.mazeGenerator.getCellSize() / 3,
          this.theme
        ));
      }
    }
    
    this.totalCollectibles = this.collectibles.length;
    this.collectiblesFound = 0;
  }
  
  private setupControls(): void {
    window.addEventListener('keydown', (e) => {
      // Movement (WASD or Arrow keys)
      if (['ArrowUp', 'w', 'W'].includes(e.key)) {
        this.player.move(0, -1, this.maze, this.mazeGenerator.getCellSize());
      } else if (['ArrowDown', 's', 'S'].includes(e.key)) {
        this.player.move(0, 1, this.maze, this.mazeGenerator.getCellSize());
      } else if (['ArrowLeft', 'a', 'A'].includes(e.key)) {
        this.player.move(-1, 0, this.maze, this.mazeGenerator.getCellSize());
      } else if (['ArrowRight', 'd', 'D'].includes(e.key)) {
        this.player.move(1, 0, this.maze, this.mazeGenerator.getCellSize());
      }
      
      // Echo pulse (Spacebar)
      if (e.key === ' ' && this.echoesRemaining > 0) {
        this.sendEchoPulse();
      }
    });
  }
  
  private sendEchoPulse(): void {
    // Create new echo pulse at player position
    this.echoPulses.push(new EchoPulse(
      this.player.x,
      this.player.y,
      0, // Initial radius
      this.theme
    ));
    
    // Reduce echo count
    this.echoesRemaining--;
    this.onEchoUsed(this.echoesRemaining);
    
    // Check if out of echoes
    if (this.echoesRemaining <= 0 && !this.levelComplete) {
      this.checkForGameOver();
    }
  }
  
  private checkForGameOver(): void {
    // Check if player can still reach exit with current visibility
    const playerCell = {
      x: Math.floor(this.player.x / this.mazeGenerator.getCellSize()),
      y: Math.floor(this.player.y / this.mazeGenerator.getCellSize())
    };
    
    const exitCell = this.exitPosition;
    
    // If player is at exit and has all collectibles, they win
    if (playerCell.x === exitCell.x && playerCell.y === exitCell.y && 
        this.collectiblesFound === this.totalCollectibles) {
      this.levelComplete = true;
      this.onLevelComplete();
      return;
    }
    
    // If out of echoes and not at exit, game over
    if (this.echoesRemaining <= 0 && !this.levelComplete) {
      this.onGameOver();
    }
  }
  
  private startGameLoop(): void {
    const loop = (timestamp: number) => {
      // Calculate delta time
      const deltaTime = timestamp - this.lastTimestamp;
      this.lastTimestamp = timestamp;
      
      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw background
      this.ctx.fillStyle = this.theme === 'dark' ? '#121212' : '#f8f9fa';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      // Draw maze (only visible cells)
      this.drawMaze();
      
      // Update and draw echo pulses
      this.updateEchoPulses(deltaTime);
      
      // Check collectibles
      this.checkCollectibles();
      
      // Check exit
      this.checkExit();
      
      // Draw player
      this.player.draw(this.ctx);
      
      // Request next frame
      this.animationFrameId = requestAnimationFrame(loop);
    };
    
    // Start the loop
    this.animationFrameId = requestAnimationFrame(loop);
  }
  
  private drawMaze(): void {
    const cellSize = this.mazeGenerator.getCellSize();
    
    // Draw exit
    const exitX = this.exitPosition.x * cellSize;
    const exitY = this.exitPosition.y * cellSize;
    this.ctx.fillStyle = this.theme === 'dark' ? 'rgba(0, 255, 0, 0.3)' : 'rgba(0, 200, 0, 0.2)';
    this.ctx.fillRect(exitX, exitY, cellSize, cellSize);
    
    // Draw walls that are visible due to echo pulses
    for (let y = 0; y < this.maze.length; y++) {
      for (let x = 0; x < this.maze[y].length; x++) {
        const cell = this.maze[y][x];
        const cellX = x * cellSize;
        const cellY = y * cellSize;
        
        if (cell.type === CellType.WALL && cell.visible > 0) {
          // Calculate opacity based on visibility value
          const opacity = Math.min(cell.visible, 1);
          
          this.ctx.fillStyle = this.theme === 'dark' 
            ? `rgba(120, 87, 255, ${opacity})` 
            : `rgba(59, 130, 246, ${opacity})`;
          
          this.ctx.fillRect(cellX, cellY, cellSize, cellSize);
          
          // Add a glow effect in dark mode
          if (this.theme === 'dark' && opacity > 0.5) {
            this.ctx.shadowColor = 'rgba(120, 87, 255, 0.8)';
            this.ctx.shadowBlur = 10;
            this.ctx.strokeStyle = 'rgba(180, 160, 255, 0.8)';
            this.ctx.strokeRect(cellX, cellY, cellSize, cellSize);
            this.ctx.shadowBlur = 0;
          }
        }
        
        // Reduce visibility over time
        if (cell.visible > 0) {
          cell.visible -= 0.01;
          if (cell.visible < 0) cell.visible = 0;
        }
      }
    }
    
    // Draw collectibles
    for (const collectible of this.collectibles) {
      collectible.draw(this.ctx);
    }
  }
  
  private updateEchoPulses(deltaTime: number): void {
    for (let i = this.echoPulses.length - 1; i >= 0; i--) {
      const pulse = this.echoPulses[i];
      
      // Update pulse radius
      pulse.update(deltaTime);
      
      // Check which cells the pulse is revealing
      this.revealCellsByPulse(pulse);
      
      // Draw the pulse
      pulse.draw(this.ctx);
      
      // Remove pulse if it has exceeded max radius
      if (pulse.radius > pulse.maxRadius) {
        this.echoPulses.splice(i, 1);
      }
    }
  }
  
  private revealCellsByPulse(pulse: EchoPulse): void {
    const cellSize = this.mazeGenerator.getCellSize();
    const pulseRadius = pulse.radius;
    
    // Calculate the range of cells to check
    const centerX = Math.floor(pulse.x / cellSize);
    const centerY = Math.floor(pulse.y / cellSize);
    const range = Math.ceil(pulseRadius / cellSize);
    
    // Check cells in a square around the pulse
    for (let y = centerY - range; y <= centerY + range; y++) {
      for (let x = centerX - range; x <= centerX + range; x++) {
        // Skip out of bounds cells
        if (y < 0 || y >= this.maze.length || x < 0 || x >= this.maze[0].length) {
          continue;
        }
        
        // Calculate distance from pulse center to cell center
        const cellCenterX = x * cellSize + cellSize / 2;
        const cellCenterY = y * cellSize + cellSize / 2;
        const distance = Math.sqrt(
          Math.pow(cellCenterX - pulse.x, 2) + 
          Math.pow(cellCenterY - pulse.y, 2)
        );
        
        // Check if cell is within pulse radius
        if (distance <= pulseRadius) {
          // Calculate visibility based on distance from pulse edge
          const visibility = 1 - (distance / pulseRadius);
          
          // Reveal cell with calculated visibility
          if (this.maze[y][x].visible < visibility) {
            this.maze[y][x].visible = visibility;
          }
          
          // Also reveal collectibles near the pulse
          for (const collectible of this.collectibles) {
            const collectibleCellX = Math.floor(collectible.x / cellSize);
            const collectibleCellY = Math.floor(collectible.y / cellSize);
            
            if (collectibleCellX === x && collectibleCellY === y) {
              collectible.setVisibility(visibility);
            }
          }
        }
      }
    }
  }
  
  private checkCollectibles(): void {
    const playerCell = {
      x: Math.floor(this.player.x / this.mazeGenerator.getCellSize()),
      y: Math.floor(this.player.y / this.mazeGenerator.getCellSize())
    };
    
    for (let i = this.collectibles.length - 1; i >= 0; i--) {
      const collectible = this.collectibles[i];
      const collectibleCell = {
        x: Math.floor(collectible.x / this.mazeGenerator.getCellSize()),
        y: Math.floor(collectible.y / this.mazeGenerator.getCellSize())
      };
      
      // Check if player is on the same cell as collectible
      if (playerCell.x === collectibleCell.x && playerCell.y === collectibleCell.y) {
        // Remove collectible
        this.collectibles.splice(i, 1);
        this.collectiblesFound++;
        
        // Update UI
        this.onCollectibleFound(this.collectiblesFound, this.totalCollectibles);
        
        // Give player an extra echo as reward
        this.echoesRemaining++;
        this.onEchoUsed(this.echoesRemaining);
      }
    }
  }
  
  private checkExit(): void {
    const playerCell = {
      x: Math.floor(this.player.x / this.mazeGenerator.getCellSize()),
      y: Math.floor(this.player.y / this.mazeGenerator.getCellSize())
    };
    
    // Check if player is at exit and has all collectibles
    if (playerCell.x === this.exitPosition.x && 
        playerCell.y === this.exitPosition.y && 
        this.collectiblesFound === this.totalCollectibles && 
        !this.levelComplete) {
      // Level complete
      this.levelComplete = true;
      this.onLevelComplete();
    }
  }
  
  public startNewGame(): void {
    // Generate new maze
    this.maze = this.mazeGenerator.generate();
    
    // Reset player position
    const startPosition = this.mazeGenerator.getStartPosition();
    const cellSize = this.mazeGenerator.getCellSize();
    this.player.x = startPosition.x * cellSize + cellSize / 2;
    this.player.y = startPosition.y * cellSize + cellSize / 2;
    
    // Reset exit position
    this.exitPosition = this.mazeGenerator.getExitPosition();
    
    // Reset echoes
    this.echoesRemaining = this.maxEchoes;
    
    // Reset collectibles
    this.placeCollectibles();
    
    // Reset level state
    this.levelComplete = false;
  }
  
  public nextLevel(): void {
    // Increase difficulty
    this.maxEchoes = Math.max(3, this.maxEchoes - 1);
    this.totalCollectibles++;
    
    // Generate new maze
    this.maze = this.mazeGenerator.generate();
    
    // Reset player position
    const startPosition = this.mazeGenerator.getStartPosition();
    const cellSize = this.mazeGenerator.getCellSize();
    this.player.x = startPosition.x * cellSize + cellSize / 2;
    this.player.y = startPosition.y * cellSize + cellSize / 2;
    
    // Reset exit position
    this.exitPosition = this.mazeGenerator.getExitPosition();
    
    // Reset echoes
    this.echoesRemaining = this.maxEchoes;
    
    // Reset collectibles
    this.placeCollectibles();
    
    // Reset level state
    this.levelComplete = false;
  }
  
  public updateTheme(theme: 'dark' | 'light'): void {
    this.theme = theme;
    this.player.updateTheme(theme);
    
    for (const pulse of this.echoPulses) {
      pulse.updateTheme(theme);
    }
    
    for (const collectible of this.collectibles) {
      collectible.updateTheme(theme);
    }
  }
  
  public resize(width: number, height: number): void {
    // Update maze size
    const cellSize = this.mazeGenerator.getCellSize();
    const mazeWidth = Math.floor(width / cellSize);
    const mazeHeight = Math.floor(height / cellSize);
    
    this.mazeGenerator.resize(mazeWidth, mazeHeight);
    this.startNewGame();
  }
  
  public destroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}