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

const MODULE_WEIGHTS = {
  pattern: 1,
  maze: 1,
  word: 1,
  sequence: 1,
  calculation: 1,
  memory: 1
};

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'INITIALIZE_GAME':
      return {
        ...state,
        screen: 'menu',
        score: 0,
        lives: 3,
        timeRemaining: 90,
        boosts: {
          timeFreeze: 3,
          hint: 2,
          skip: 2,
          multiplier: 2,
          extraLife: 1
        },
        isGameActive: false,
        isPaused: false,
        streak: 0,
        multiplier: 1,
        powerUpActive: null,
        powerUpEndTime: null,
        modules: {
          pattern: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
          maze: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
          word: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
          sequence: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
          calculation: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
          memory: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 }
        },
        analytics: {
          patternAccuracy: 0,
          mazeSpeed: 0,
          wordAccuracy: 0,
          sequenceSpeed: 0,
          calculationAccuracy: 0,
          memoryScore: 0,
          averageResponseTime: 0,
          mistakeTypes: [],
          streakCount: 0,
          perfectRounds: 0
        },
        achievements: []
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
      
      // Update streak and multiplier
      const newStreak = success ? state.streak + 1 : 0;
      const newMultiplier = Math.min(4, 1 + Math.floor(newStreak / 3));

      const updatedModule = {
        ...moduleState,
        completed: moduleState.completed + 1,
        level: success ? moduleState.level + 1 : Math.max(1, moduleState.level - 1),
        accuracy: calculateAccuracy(moduleState.accuracy, moduleState.completed, success),
        highScore: Math.max(moduleState.highScore, state.score),
        bestTime: moduleState.bestTime === 0 ? timeSpent : Math.min(moduleState.bestTime, timeSpent)
      };

      // Update analytics based on completed module
      const updatedAnalytics = updateAnalytics(state.analytics, module, success, timeSpent, newStreak);

      // Choose the next module with weighted randomization
      const nextModule = chooseNextModule(state);
      
      // Calculate score with streak multiplier
      const baseScore = calculateScore(state.difficulty, moduleState.level);
      const multipliedScore = baseScore * newMultiplier;
      
      return {
        ...state,
        activeModule: nextModule,
        modules: {
          ...state.modules,
          [module]: updatedModule
        },
        analytics: updatedAnalytics,
        score: success ? state.score + multipliedScore : state.score,
        streak: newStreak,
        multiplier: newMultiplier,
        lives: success ? state.lives : state.lives - 1,
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
      
      let newState = {
        ...state,
        boosts: {
          ...state.boosts,
          [boost]: currentAmount - 1
        }
      };

      // Apply boost effects
      switch (boost) {
        case 'timeFreeze':
          newState = {
            ...newState,
            timeRemaining: state.timeRemaining + 10,
            powerUpActive: 'timeFreeze',
            powerUpEndTime: Date.now() + 10000
          };
          break;
        
        case 'multiplier':
          newState = {
            ...newState,
            multiplier: state.multiplier * 2,
            powerUpActive: 'multiplier',
            powerUpEndTime: Date.now() + 30000
          };
          break;
        
        case 'extraLife':
          newState = {
            ...newState,
            lives: state.lives + 1
          };
          break;
        
        case 'hint':
          // Hint logic is handled in individual modules
          newState = {
            ...newState,
            powerUpActive: 'hint',
            powerUpEndTime: Date.now() + 5000
          };
          break;
        
        case 'skip':
          // Skip current module without penalty
          newState = {
            ...newState,
            activeModule: chooseNextModule(state)
          };
          break;
      }
      
      return newState;
    }

    default:
      return state;
  }
};

// Helper functions
const chooseNextModule = (state: GameState): GameModule => {
  const modules = Object.keys(MODULE_WEIGHTS) as GameModule[];
  
  // Calculate weights based on completion rate and success
  const adjustedWeights = modules.map(module => {
    const moduleState = state.modules[module];
    const completionRate = moduleState.completed > 0 ? moduleState.accuracy / 100 : 0.5;
    
    // Increase weight for less played modules
    const playFrequencyAdjustment = 1 + (1 - moduleState.completed / 10);
    
    // Adjust weight based on success rate
    const successAdjustment = 1 + (1 - completionRate);
    
    return MODULE_WEIGHTS[module] * playFrequencyAdjustment * successAdjustment;
  });
  
  // Calculate total weight
  const totalWeight = adjustedWeights.reduce((sum, weight) => sum + weight, 0);
  
  // Random selection based on weights
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < modules.length; i++) {
    random -= adjustedWeights[i];
    if (random <= 0) {
      return modules[i];
    }
  }
  
  return modules[0];
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
    hard: 2,
    expert: 3
  };
  
  return Math.round(15 * level * difficultyMultiplier[difficulty]);
};

const updateAnalytics = (
  analytics: GameState['analytics'],
  module: GameModule,
  success: boolean,
  timeSpent: number,
  streak: number
) => {
  const updatedAnalytics = { ...analytics };
  
  // Update module-specific metrics
  switch (module) {
    case 'pattern':
      updatedAnalytics.patternAccuracy = (updatedAnalytics.patternAccuracy + (success ? 100 : 0)) / 2;
      break;
    case 'maze':
      const speedScore = calculateSpeedScore(timeSpent);
      updatedAnalytics.mazeSpeed = (updatedAnalytics.mazeSpeed + speedScore) / 2;
      break;
    case 'word':
      updatedAnalytics.wordAccuracy = (updatedAnalytics.wordAccuracy + (success ? 100 : 0)) / 2;
      break;
    case 'sequence':
      updatedAnalytics.sequenceSpeed = (updatedAnalytics.sequenceSpeed + calculateSpeedScore(timeSpent)) / 2;
      break;
    case 'calculation':
      updatedAnalytics.calculationAccuracy = (updatedAnalytics.calculationAccuracy + (success ? 100 : 0)) / 2;
      break;
    case 'memory':
      updatedAnalytics.memoryScore = (updatedAnalytics.memoryScore + (success ? timeSpent * 10 : 0)) / 2;
      break;
  }
  
  // Update general analytics
  updatedAnalytics.averageResponseTime = (updatedAnalytics.averageResponseTime + timeSpent) / 2;
  updatedAnalytics.streakCount = Math.max(updatedAnalytics.streakCount, streak);
  
  if (success && timeSpent < 5) {
    updatedAnalytics.perfectRounds++;
  }
  
  // Track mistake types if failed
  if (!success) {
    updatedAnalytics.mistakeTypes.push(module);
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