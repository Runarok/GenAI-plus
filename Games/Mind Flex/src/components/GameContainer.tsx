import React, { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import Header from './ui/Header';
import MainMenu from './screens/MainMenu';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import TutorialScreen from './screens/TutorialScreen';

const GameContainer: React.FC = () => {
  const { gameState, initializeGame } = useGame();

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col h-screen p-4">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center overflow-hidden">
        {gameState.screen === 'menu' && <MainMenu />}
        {gameState.screen === 'tutorial' && <TutorialScreen />}
        {gameState.screen === 'game' && <GameScreen />}
        {gameState.screen === 'results' && <ResultScreen />}
      </main>
    </div>
  );
};

export default GameContainer;