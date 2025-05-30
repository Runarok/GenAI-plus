import React, { useState, useEffect } from 'react';
import { useGame } from '../../hooks/useGame';
import { Grid3X3 } from 'lucide-react';

interface PatternModuleProps {
  timeRemaining: number;
}

const PatternModule: React.FC<PatternModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.pattern.level;
  
  const [pattern, setPattern] = useState<number[]>([]);
  const [userPattern, setUserPattern] = useState<number[]>([]);
  const [isShowingPattern, setIsShowingPattern] = useState(true);
  const [startTime, setStartTime] = useState(Date.now());
  
  // Generate pattern based on current level and difficulty
  useEffect(() => {
    const patternLength = Math.min(9, moduleLevel + (
      difficulty === 'easy' ? 2 :
      difficulty === 'medium' ? 3 :
      difficulty === 'hard' ? 4 : 5
    ));
    
    const newPattern: number[] = [];
    for (let i = 0; i < patternLength; i++) {
      newPattern.push(Math.floor(Math.random() * 9));
    }
    
    setPattern(newPattern);
    setUserPattern([]);
    setIsShowingPattern(true);
    setStartTime(Date.now());
    
    // Show pattern for a duration based on difficulty and length
    const baseTime = 
      difficulty === 'easy' ? 1500 :
      difficulty === 'medium' ? 1200 :
      difficulty === 'hard' ? 900 : 600;
    
    const showTime = baseTime + (patternLength * 300);
    
    const timer = setTimeout(() => {
      setIsShowingPattern(false);
    }, showTime);
    
    return () => clearTimeout(timer);
  }, [moduleLevel, difficulty]);
  
  // Handle tile click
  const handleTileClick = (index: number) => {
    if (isShowingPattern) return;
    
    const newUserPattern = [...userPattern, index];
    setUserPattern(newUserPattern);
    
    // Check if the user pattern is complete
    if (newUserPattern.length === pattern.length) {
      const isCorrect = newUserPattern.every((val, i) => val === pattern[i]);
      const timeSpent = (Date.now() - startTime) / 1000;
      completeModule('pattern', isCorrect, timeSpent);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Grid3X3 className="h-5 w-5 text-blue-400" />
        <h3 className="text-xl font-medium">Pattern Challenge</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Array.from({ length: 9 }).map((_, index) => {
          const isPartOfPattern = pattern.includes(index);
          const isSelected = userPattern.includes(index);
          const isHighlighted = isShowingPattern && isPartOfPattern;
          const isCorrect = !isShowingPattern && isSelected && pattern[userPattern.indexOf(index)] === index;
          const isWrong = !isShowingPattern && isSelected && pattern[userPattern.indexOf(index)] !== index;
          
          return (
            <button
              key={index}
              onClick={() => handleTileClick(index)}
              disabled={isShowingPattern}
              className={`w-20 h-20 rounded-lg transition-all duration-200 ${
                isHighlighted
                  ? 'bg-blue-500 scale-105'
                  : isCorrect
                  ? 'bg-green-500'
                  : isWrong
                  ? 'bg-red-500'
                  : isSelected
                  ? 'bg-purple-500'
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
            ></button>
          );
        })}
      </div>
      
      <div className="flex items-center justify-between w-full px-4 text-sm">
        <span className="text-slate-300">
          Level {moduleLevel}
        </span>
        <span className="text-slate-300">
          {userPattern.length} / {pattern.length}
        </span>
      </div>
    </div>
  );
};

export default PatternModule;