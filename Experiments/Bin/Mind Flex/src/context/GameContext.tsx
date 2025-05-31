import React, { createContext, useReducer, ReactNode, useCallback } from 'react';
import { GameState, GameModule, BoostType, ScreenType, Difficulty } from '../types/game';
import { gameReducer } from '../game/engine/gameReducer';

const initialState: GameState = {
  screen: 'menu',
  activeModule: null,
  level: 1,
  score: 0,
  lives: 3,
  timeRemaining: 90,
  difficulty: 'medium',
  boosts: {
    timeFreeze: 3,
    hint: 2,
    skip: 2,
    multiplier: 2,
    extraLife: 1
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
  isGameActive: false,
  isPaused: false,
  modules: {
    pattern: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
    maze: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
    word: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
    sequence: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
    calculation: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 },
    memory: { level: 1, completed: 0, accuracy: 0, highScore: 0, bestTime: 0 }
  },
  streak: 0,
  multiplier: 1,
  powerUpActive: null,
  powerUpEndTime: null,
  dailyChallengeCompleted: false,
  weeklyHighScore: 0
};

interface GameContextType {
  gameState: GameState;
  initializeGame: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  showTutorial: () => void;
  completeModule: (module: GameModule, success: boolean, timeSpent: number) => void;
  updateScore: (points: number) => void;
  useBoost: (boost: BoostType) => void;
  setScreen: (screen: ScreenType) => void;
  setDifficulty: (difficulty: Difficulty) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const initializeGame = useCallback(() => {
    dispatch({ type: 'INITIALIZE_GAME' });
  }, []);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: 'PAUSE_GAME' });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'RESUME_GAME' });
  }, []);

  const endGame = useCallback(() => {
    dispatch({ type: 'END_GAME' });
  }, []);

  const showTutorial = useCallback(() => {
    dispatch({ type: 'SHOW_TUTORIAL' });
  }, []);

  const completeModule = useCallback((module: GameModule, success: boolean, timeSpent: number) => {
    dispatch({ 
      type: 'COMPLETE_MODULE', 
      payload: { module, success, timeSpent } 
    });
  }, []);

  const updateScore = useCallback((points: number) => {
    dispatch({ type: 'UPDATE_SCORE', payload: points });
  }, []);

  const useBoost = useCallback((boost: BoostType) => {
    dispatch({ type: 'USE_BOOST', payload: boost });
  }, []);

  const setScreen = useCallback((screen: ScreenType) => {
    dispatch({ type: 'SET_SCREEN', payload: screen });
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    dispatch({ type: 'SET_DIFFICULTY', payload: difficulty });
  }, []);

  return (
    <GameContext.Provider
      value={{
        gameState,
        initializeGame,
        startGame,
        pauseGame,
        resumeGame,
        endGame,
        showTutorial,
        completeModule,
        updateScore,
        useBoost,
        setScreen,
        setDifficulty
      }}
    >
      {children}
    </GameContext.Provider>
  );
};