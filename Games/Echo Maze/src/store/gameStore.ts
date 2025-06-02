import { create } from 'zustand';

interface GameState {
  isMenuOpen: boolean;
  isPaused: boolean;
  bestScore: number;
  currentScore: number;
  setMenuOpen: (open: boolean) => void;
  setPaused: (paused: boolean) => void;
  setBestScore: (score: number) => void;
  setCurrentScore: (score: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  isMenuOpen: true,
  isPaused: false,
  bestScore: 0,
  currentScore: 0,
  setMenuOpen: (open) => set({ isMenuOpen: open }),
  setPaused: (paused) => set({ isPaused: paused }),
  setBestScore: (score) => set((state) => ({
    bestScore: Math.max(state.bestScore, score)
  })),
  setCurrentScore: (score) => set({ currentScore: score })
}));