import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../hooks/useGame';
import { ListOrdered, Play, Pause } from 'lucide-react';

interface SequenceModuleProps {
  timeRemaining: number;
}

const SequenceModule: React.FC<SequenceModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.sequence.level;

  const [sequence, setSequence] = useState<number[]>([]);
  const [userSequence, setUserSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());

  // Generate sequence based on level and difficulty
  const generateSequence = useCallback(() => {
    const length = Math.min(12, moduleLevel + (
      difficulty === 'easy' ? 2 :
      difficulty === 'medium' ? 3 :
      difficulty === 'hard' ? 4 : 5
    ));
    
    return Array.from({ length }, () => Math.floor(Math.random() * 9));
  }, [moduleLevel, difficulty]);

  // Initialize sequence
  useEffect(() => {
    const newSequence = generateSequence();
    setSequence(newSequence);
    setUserSequence([]);
    setStartTime(Date.now());
  }, [generateSequence]);

  // Play sequence animation
  const playSequence = async () => {
    setIsPlaying(true);
    setUserSequence([]);
    
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 
        difficulty === 'easy' ? 1000 :
        difficulty === 'medium' ? 800 :
        difficulty === 'hard' ? 600 : 400
      ));
    }
    
    setIsPlaying(false);
  };

  // Handle number click
  const handleNumberClick = (number: number) => {
    if (isPlaying) return;

    const newUserSequence = [...userSequence, number];
    setUserSequence(newUserSequence);

    // Check if sequence is complete
    if (newUserSequence.length === sequence.length) {
      const isCorrect = newUserSequence.every((num, i) => num === sequence[i]);
      const timeSpent = (Date.now() - startTime) / 1000;
      completeModule('sequence', isCorrect, timeSpent);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <ListOrdered className="h-5 w-5 text-indigo-400" />
        <h3 className="text-xl font-medium">Number Sequence</h3>
      </div>

      <div className="w-full bg-slate-700/80 rounded-lg p-6 mb-6">
        <div className="text-center mb-6">
          <button
            onClick={playSequence}
            disabled={isPlaying}
            className="flex items-center justify-center gap-2 mx-auto px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Playing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Watch Sequence
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {Array.from({ length: 9 }).map((_, i) => {
            const isHighlighted = isPlaying && sequence[userSequence.length] === i;
            const isSelected = userSequence.includes(i);

            return (
              <button
                key={i}
                onClick={() => handleNumberClick(i)}
                disabled={isPlaying}
                className={`aspect-square text-2xl font-bold rounded-lg transition-all ${
                  isHighlighted
                    ? 'bg-indigo-500 scale-105'
                    : isSelected
                    ? 'bg-purple-500'
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center text-sm text-slate-300">
          <span>Level {moduleLevel}</span>
          <span>{userSequence.length} / {sequence.length}</span>
        </div>
      </div>
    </div>
  );
};

export default SequenceModule;