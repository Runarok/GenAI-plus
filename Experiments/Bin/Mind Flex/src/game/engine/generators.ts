import { Difficulty, GameModule } from '../../types/game';

// Pattern puzzle generator
export const generatePatternPuzzle = (level: number, difficulty: Difficulty) => {
  const patternLength = Math.min(9, level + (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3));
  const pattern: number[] = [];
  
  for (let i = 0; i < patternLength; i++) {
    pattern.push(Math.floor(Math.random() * 9));
  }
  
  return pattern;
};

// Generate maze
export interface MazeCell {
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

export const generateMaze = (size: number): MazeCell[][] => {
  // Initialize grid with all walls
  const grid: MazeCell[][] = [];
  for (let y = 0; y < size; y++) {
    const row: MazeCell[] = [];
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
  const stack: { x: number; y: number }[] = [];
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
};

// Word lists for different difficulty levels
const wordLists = {
  easy: [
    'cat', 'dog', 'sun', 'run', 'big', 'map', 'hat', 'cup', 'pen', 'box',
    'red', 'blue', 'fish', 'book', 'tree', 'jump', 'rain', 'cake', 'bird', 'milk'
  ],
  medium: [
    'apple', 'beach', 'cloud', 'dance', 'earth', 'flame', 'green', 'house', 'image', 'juice',
    'knife', 'light', 'music', 'night', 'ocean', 'plant', 'queen', 'river', 'space', 'table'
  ],
  hard: [
    'ability', 'balance', 'cabinet', 'delicate', 'elephant', 'fountain', 'generous', 'heritage',
    'industry', 'journey', 'kingdom', 'language', 'mountain', 'notebook', 'operation', 'paradise',
    'quantity', 'railroad', 'schedule', 'technique'
  ]
};

// Generate word puzzle
export type WordPuzzleType = 'unscramble' | 'complete' | 'anagram';

export interface WordPuzzle {
  type: WordPuzzleType;
  original: string;
  display: string;
  answer: string;
}

export const generateWordPuzzle = (level: number, difficulty: Difficulty): WordPuzzle => {
  // Select difficulty tier
  const wordList = wordLists[difficulty];
  
  // Select a random word
  const word = wordList[Math.floor(Math.random() * wordList.length)];
  
  // Determine puzzle type based on level
  const puzzleTypes: WordPuzzleType[] = ['unscramble', 'complete', 'anagram'];
  const puzzleTypeIndex = (level - 1) % puzzleTypes.length;
  const puzzleType = puzzleTypes[puzzleTypeIndex];
  
  let display = '';
  let answer = '';
  
  switch (puzzleType) {
    case 'unscramble':
      // Scramble the letters of the word
      display = word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
      answer = word;
      break;
      
    case 'complete':
      // Remove some letters from the word
      const missingCount = Math.ceil(word.length / 3);
      const positions: number[] = [];
      
      while (positions.length < missingCount) {
        const pos = Math.floor(Math.random() * word.length);
        if (!positions.includes(pos)) {
          positions.push(pos);
        }
      }
      
      display = word
        .split('')
        .map((letter, index) => (positions.includes(index) ? '_' : letter))
        .join('');
      answer = word;
      break;
      
    case 'anagram':
      // Find a word that is an anagram or shares letters
      answer = word;
      // For simplicity, just scramble the word here too
      display = `Find a word using these letters: ${word
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('')}`;
      break;
  }
  
  return {
    type: puzzleType,
    original: word,
    display,
    answer
  };
};