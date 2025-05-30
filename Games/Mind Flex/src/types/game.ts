export type GameModule = 'pattern' | 'maze' | 'word' | 'sequence' | 'calculation' | 'memory';

export type ScreenType = 'menu' | 'game' | 'results' | 'tutorial' | 'achievements' | 'leaderboard';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export type BoostType = 'timeFreeze' | 'hint' | 'skip' | 'multiplier' | 'extraLife';

export interface ModuleState {
  level: number;
  completed: number;
  accuracy: number;
  highScore: number;
  bestTime: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface Analytics {
  patternAccuracy: number;
  mazeSpeed: number;
  wordAccuracy: number;
  sequenceSpeed: number;
  calculationAccuracy: number;
  memoryScore: number;
  averageResponseTime: number;
  mistakeTypes: GameModule[];
  streakCount: number;
  perfectRounds: number;
}

export interface Boosts {
  timeFreeze: number;
  hint: number;
  skip: number;
  multiplier: number;
  extraLife: number;
}

export interface GameState {
  screen: ScreenType;
  activeModule: GameModule | null;
  level: number;
  score: number;
  lives: number;
  timeRemaining: number;
  difficulty: Difficulty;
  boosts: Boosts;
  analytics: Analytics;
  achievements: Achievement[];
  isGameActive: boolean;
  isPaused: boolean;
  modules: Record<GameModule, ModuleState>;
  streak: number;
  multiplier: number;
  dailyChallengeCompleted: boolean;
  weeklyHighScore: number;
}