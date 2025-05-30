import { GameState, GameModule, BoostType, ScreenType, Difficulty } from '../../types/game';

type GameAction =
  | { type: 'INITIALIZE_GAME' }
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'SHOW_TUTORIAL' }
  | { type: 'SET_SCREEN'; payload: ScreenType }
  | { type: 'SET_DIFFICULTY'; payload: Difficulty }
  | { type: 'COMPLETE_MODULE'; payload: { module: GameModule; success: boolean; timeSpent: number } }
  | { type: 'UPDATE_SCORE'; payload: number }
  | { type: 'USE_BOOST'; payload: BoostType };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        screen: 'menu',
        score: 0,
        lives: 3,
        timeRemaining: 60,
        boosts: { timeFreeze: 2, hint: 1, skip: 1 },
        isGameActive: false,
        isPaused: false,
        modules: {
          pattern: { level: 1, completed: 0, accuracy: 0 },
          maze: { level: 1, completed: 0, accuracy: 0 },
          word: { level: 1, completed: 0, accuracy: 0 }
        },
        analytics: {
          patternAccuracy: 0,
          mazeSpeed: 0,
          wordAccuracy: 0,
          averageResponseTime: 0,
          mistakeTypes: []
        }
      };

    case 'START_GAME':
      return {
        ...state,
        screen: 'game',
        isGameActive: true,
        isPaused: false,
        activeModule: chooseNextModule(state)
      };

    case 'PAUSE_GAME':
      return {
        ...state,
        isPaused: true
      };

    case 'RESUME_GAME':
      return {
        ...state,
        isPaused: false
      };

    case 'END_GAME':
      return {
        ...state,
        screen: 'results',
        isGameActive: false,
        isPaused: false
      };

    case 'SHOW_TUTORIAL':
      return {
        ...state,
        screen: 'tutorial'
      };

    case 'SET_SCREEN':
      return {
        ...state,
        screen: action.payload
      };

    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload
      };

    case 'COMPLETE_MODULE': {
      const { module, success, timeSpent } = action.payload;
      const moduleState = state.modules[module];
      
      const updatedModule = {
        ...moduleState,
        completed: moduleState.completed + 1,
        level: success ? moduleState.level + 1 : Math.max(1, moduleState.level - 1),
        accuracy: calculateAccuracy(moduleState.accuracy, moduleState.completed, success)
      };

      // Update analytics based on completed module
      const updatedAnalytics = updateAnalytics(state.analytics, module, success, timeSpent);

      // Choose the next module
      const nextModule = chooseNextModule(state);
      
      return {
        ...state,
        activeModule: nextModule,
        modules: {
          ...state.modules,
          [module]: updatedModule
        },
        analytics: updatedAnalytics,
        score: success ? state.score + calculateScore(state.difficulty, moduleState.level) : state.score,
        lives: success ? state.lives : state.lives - 1,
        // End game if no lives left
        screen: state.lives <= 1 && !success ? 'results' : state.screen,
        isGameActive: state.lives <= 1 && !success ? false : state.isGameActive
      };
    }

    case 'UPDATE_SCORE':
      return {
        ...state,
        score: state.score + action.payload
      };

    case 'USE_BOOST': {
      const boost = action.payload;
      const currentAmount = state.boosts[boost];
      
      if (currentAmount <= 0) {
        return state;
      }
      
      return {
        ...state,
        boosts: {
          ...state.boosts,
          [boost]: currentAmount - 1
        }
      };
    }

    default:
      return state;
  }
};

// Helper functions
const chooseNextModule = (state: GameState): GameModule => {
  // Simple rotation through modules for now
  const modules: GameModule[] = ['pattern', 'maze', 'word'];
  
  if (!state.activeModule) {
    return modules[0];
  }
  
  const currentIndex = modules.indexOf(state.activeModule);
  return modules[(currentIndex + 1) % modules.length];
};

const calculateAccuracy = (currentAccuracy: number, completedCount: number, success: boolean): number => {
  const totalAttempts = completedCount + 1;
  const successfulAttempts = currentAccuracy * completedCount / 100 + (success ? 1 : 0);
  return (successfulAttempts / totalAttempts) * 100;
};

const calculateScore = (difficulty: Difficulty, level: number): number => {
  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2
  };
  
  return Math.round(10 * level * difficultyMultiplier[difficulty]);
};

const updateAnalytics = (analytics: GameState['analytics'], module: GameModule, success: boolean, timeSpent: number) => {
  // Update analytics based on the completed module
  const updatedAnalytics = { ...analytics };
  
  if (module === 'pattern') {
    updatedAnalytics.patternAccuracy = (updatedAnalytics.patternAccuracy + (success ? 100 : 0)) / 2;
  } else if (module === 'maze') {
    const speedScore = calculateSpeedScore(timeSpent);
    updatedAnalytics.mazeSpeed = (updatedAnalytics.mazeSpeed + speedScore) / 2;
  } else if (module === 'word') {
    updatedAnalytics.wordAccuracy = (updatedAnalytics.wordAccuracy + (success ? 100 : 0)) / 2;
  }
  
  // Update average response time
  updatedAnalytics.averageResponseTime = 
    (updatedAnalytics.averageResponseTime + timeSpent) / 2;
  
  // Track mistake types if failed
  if (!success) {
    updatedAnalytics.mistakeTypes.push(module);
    // Keep only the last 10 mistakes
    if (updatedAnalytics.mistakeTypes.length > 10) {
      updatedAnalytics.mistakeTypes = updatedAnalytics.mistakeTypes.slice(-10);
    }
  }
  
  return updatedAnalytics;
};

const calculateSpeedScore = (timeSpent: number): number => {
  // Lower time spent means higher speed score
  // Maximum score is 100 for 1 second, minimum is 10 for 10 seconds or more
  return Math.max(10, Math.min(100, 110 - timeSpent * 10));
};