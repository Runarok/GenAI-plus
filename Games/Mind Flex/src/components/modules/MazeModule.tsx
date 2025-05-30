import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../hooks/useGame';
import { Haze as Maze, ArrowUp, ArrowRight, ArrowDown, ArrowLeft } from 'lucide-react';

interface MazeModuleProps {
  timeRemaining: number;
}

interface Cell {
  x: number;
  y: number;
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

interface Position {
  x: number;
  y: number;
}

const MazeModule: React.FC<MazeModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.maze.level;
  
  // Size of the maze based on difficulty and level
  const getSize = () => {
    const baseSize = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    const levelBonus = Math.floor(moduleLevel / 3);
    return Math.min(8, baseSize + levelBonus);
  };
  
  const size = getSize();
  
  const [maze, setMaze] = useState<Cell[][]>([]);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [goalPos, setGoalPos] = useState<Position>({ x: size - 1, y: size - 1 });
  const [startTime, setStartTime] = useState(Date.now());
  
  // Generate a new maze
  const generateMaze = useCallback(() => {
    // Initialize grid with all walls
    const grid: Cell[][] = [];
    for (let y = 0; y < size; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < size; x++) {
        row.push({
          x,
          y,
          walls: { top: true, right: true, bottom: true, left: true },
          visited: false
        });
      }
      grid.push(row);
    }
    
    // Use depth-first search to generate maze
    const stack: Position[] = [];
    const startX = 0;
    const startY = 0;
    
    // Mark the starting cell as visited
    grid[startY][startX].visited = true;
    stack.push({ x: startX, y: startY });
    
    // Continue until all cells are visited
    while (stack.length > 0) {
      const current = stack[stack.length - 1];
      const { x, y } = current;
      
      // Find all unvisited neighbors
      const neighbors: { x: number; y: number; direction: 'top' | 'right' | 'bottom' | 'left' }[] = [];
      
      if (y > 0 && !grid[y - 1][x].visited) {
        neighbors.push({ x, y: y - 1, direction: 'top' });
      }
      if (x < size - 1 && !grid[y][x + 1].visited) {
        neighbors.push({ x: x + 1, y, direction: 'right' });
      }
      if (y < size - 1 && !grid[y + 1][x].visited) {
        neighbors.push({ x, y: y + 1, direction: 'bottom' });
      }
      if (x > 0 && !grid[y][x - 1].visited) {
        neighbors.push({ x: x - 1, y, direction: 'left' });
      }
      
      if (neighbors.length > 0) {
        // Randomly select a neighbor
        const randomIndex = Math.floor(Math.random() * neighbors.length);
        const { x: nextX, y: nextY, direction } = neighbors[randomIndex];
        
        // Remove walls between current cell and chosen cell
        if (direction === 'top') {
          grid[y][x].walls.top = false;
          grid[nextY][nextX].walls.bottom = false;
        } else if (direction === 'right') {
          grid[y][x].walls.right = false;
          grid[nextY][nextX].walls.left = false;
        } else if (direction === 'bottom') {
          grid[y][x].walls.bottom = false;
          grid[nextY][nextX].walls.top = false;
        } else if (direction === 'left') {
          grid[y][x].walls.left = false;
          grid[nextY][nextX].walls.right = false;
        }
        
        // Mark the chosen cell as visited and add it to the stack
        grid[nextY][nextX].visited = true;
        stack.push({ x: nextX, y: nextY });
      } else {
        // Backtrack if no unvisited neighbors
        stack.pop();
      }
    }
    
    return grid;
  }, [size]);
  
  // Initialize the maze
  useEffect(() => {
    const newMaze = generateMaze();
    setMaze(newMaze);
    setPlayerPos({ x: 0, y: 0 });
    setGoalPos({ x: size - 1, y: size - 1 });
    setStartTime(Date.now());
  }, [generateMaze, size]);
  
  // Handle keyboard input for maze navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      let newPos = { ...playerPos };
      
      switch (e.key) {
        case 'ArrowUp':
          if (!maze[playerPos.y][playerPos.x].walls.top) {
            newPos.y--;
          }
          break;
        case 'ArrowRight':
          if (!maze[playerPos.y][playerPos.x].walls.right) {
            newPos.x++;
          }
          break;
        case 'ArrowDown':
          if (!maze[playerPos.y][playerPos.x].walls.bottom) {
            newPos.y++;
          }
          break;
        case 'ArrowLeft':
          if (!maze[playerPos.y][playerPos.x].walls.left) {
            newPos.x--;
          }
          break;
      }
      
      setPlayerPos(newPos);
      
      // Check if the player reached the goal
      if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
        const timeSpent = (Date.now() - startTime) / 1000;
        completeModule('maze', true, timeSpent);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [maze, playerPos, goalPos, completeModule, startTime]);
  
  // Move player with directional buttons (for touch devices)
  const movePlayer = (direction: 'up' | 'right' | 'down' | 'left') => {
    let newPos = { ...playerPos };
    
    switch (direction) {
      case 'up':
        if (!maze[playerPos.y][playerPos.x].walls.top) {
          newPos.y--;
        }
        break;
      case 'right':
        if (!maze[playerPos.y][playerPos.x].walls.right) {
          newPos.x++;
        }
        break;
      case 'down':
        if (!maze[playerPos.y][playerPos.x].walls.bottom) {
          newPos.y++;
        }
        break;
      case 'left':
        if (!maze[playerPos.y][playerPos.x].walls.left) {
          newPos.x--;
        }
        break;
    }
    
    setPlayerPos(newPos);
    
    // Check if the player reached the goal
    if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
      const timeSpent = (Date.now() - startTime) / 1000;
      completeModule('maze', true, timeSpent);
    }
  };
  
  // Time's up
  useEffect(() => {
    if (timeRemaining <= 0) {
      const timeSpent = (Date.now() - startTime) / 1000;
      completeModule('maze', false, timeSpent);
    }
  }, [timeRemaining, completeModule, startTime]);
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="flex items-center gap-2 mb-4">
        <Maze className="h-5 w-5 text-green-400" />
        <h3 className="text-xl font-medium">Maze Challenge</h3>
      </div>
      
      <div className="mb-6 relative">
        {maze.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => {
              const isPlayer = playerPos.x === x && playerPos.y === y;
              const isGoal = goalPos.x === x && goalPos.y === y;
              
              return (
                <div
                  key={`${x}-${y}`}
                  className={`relative w-10 h-10 flex items-center justify-center ${
                    isPlayer ? 'bg-blue-500/50' : isGoal ? 'bg-green-500/50' : ''
                  }`}
                  style={{
                    borderTop: cell.walls.top ? '2px solid white' : 'none',
                    borderRight: cell.walls.right ? '2px solid white' : 'none',
                    borderBottom: cell.walls.bottom ? '2px solid white' : 'none',
                    borderLeft: cell.walls.left ? '2px solid white' : 'none'
                  }}
                >
                  {isPlayer && (
                    <div className="absolute w-6 h-6 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                  {isGoal && (
                    <div className="absolute w-6 h-6 bg-green-500 rounded-full"></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div></div>
        <button
          onClick={() => movePlayer('up')}
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
        <div></div>
        
        <button
          onClick={() => movePlayer('left')}
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => movePlayer('down')}
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowDown className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => movePlayer('right')}
          className="p-3 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MazeModule;