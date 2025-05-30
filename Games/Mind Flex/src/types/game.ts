export type GameModule = 'pattern' | 'maze' | 'word';

export type ScreenType = 'menu' | 'game' | 'results' | 'tutorial';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type BoostType = 'timeFreeze' | 'hint' | 'skip';

export interface ModuleState {
  level: number;
  completed: number;
  accuracy: number;
}

export interface Analytics {
  patternAccuracy: number;
  mazeSpeed: number;
  wordAccuracy: number;
  averageResponseTime: number;
  mistakeTypes: GameModule[];
}

export interface Boosts {
  timeFreeze: number;
  hint: number;
  skip: number;
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
  isGameActive: boolean;
  isPaused: boolean;
  modules: Record<GameModule, ModuleState>;
}