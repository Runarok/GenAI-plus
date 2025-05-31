import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../hooks/useGame';
import { Type, RefreshCw } from 'lucide-react';

interface WordModuleProps {
  timeRemaining: number;
}

// Sample word lists of varying difficulty
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

// Puzzle types
type PuzzleType = 'unscramble' | 'complete' | 'anagram';

const WordModule: React.FC<WordModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.word.level;
  
  const [puzzle, setPuzzle] = useState<{
    type: PuzzleType;
    original: string;
    display: string;
    answer: string;
  }>({ type: 'unscramble', original: '', display: '', answer: '' });
  
  const [userAnswer, setUserAnswer] = useState('');
  const [startTime, setStartTime] = useState(Date.now());
  
  // Generate a word puzzle based on difficulty and level
  const generatePuzzle = useCallback(() => {
    // Select difficulty tier
    const wordList = wordLists[difficulty];
    
    // Select a random word
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Determine puzzle type based on level
    const puzzleTypes: PuzzleType[] = ['unscramble', 'complete', 'anagram'];
    const puzzleTypeIndex = (moduleLevel - 1) % puzzleTypes.length;
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
  }, [difficulty, moduleLevel]);
  
  // Initialize puzzle
  useEffect(() => {
    const newPuzzle = generatePuzzle();
    setPuzzle(newPuzzle);
    setUserAnswer('');
    setStartTime(Date.now());
  }, [generatePuzzle]);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isCorrect = userAnswer.toLowerCase() === puzzle.answer.toLowerCase();
    const timeSpent = (Date.now() - startTime) / 1000;
    
    completeModule('word', isCorrect, timeSpent);
  };
  
  // Time's up
  useEffect(() => {
    if (timeRemaining <= 0) {
      const timeSpent = (Date.now() - startTime) / 1000;
      completeModule('word', false, timeSpent);
    }
  }, [timeRemaining, completeModule, startTime]);
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md">
      <div className="flex items-center gap-2 mb-4">
        <Type className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-medium">Word Challenge</h3>
      </div>
      
      <div className="w-full bg-slate-700/80 rounded-lg p-6 mb-6">
        <div className="text-center mb-4">
          <p className="text-sm text-slate-300 mb-2">
            {puzzle.type === 'unscramble'
              ? 'Unscramble the letters to form a word'
              : puzzle.type === 'complete'
              ? 'Fill in the missing letters'
              : 'Form a word using these letters'}
          </p>
          <div className="text-2xl font-bold tracking-wider">
            {puzzle.type === 'anagram' ? (
              <p>{puzzle.display}</p>
            ) : puzzle.type === 'complete' ? (
              <div className="flex justify-center gap-2">
                {puzzle.display.split('').map((char, index) => (
                  <span
                    key={index}
                    className={`inline-block w-8 h-10 flex items-center justify-center rounded border-b-2 ${
                      char === '_' ? 'border-blue-400 bg-slate-600' : 'border-slate-500'
                    }`}
                  >
                    {char !== '_' ? char : ''}
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex justify-center gap-2">
                {puzzle.display.split('').map((char, index) => (
                  <span
                    key={index}
                    className="inline-block w-8 h-10 flex items-center justify-center bg-slate-600 rounded"
                  >
                    {char}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
            className="w-full py-2 px-4 bg-slate-600 rounded-lg border border-slate-500 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            autoComplete="off"
          />
          
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
          >
            Submit Answer
          </button>
        </form>
      </div>
      
      <button
        onClick={() => {
          const newPuzzle = generatePuzzle();
          setPuzzle(newPuzzle);
          setUserAnswer('');
        }}
        className="flex items-center gap-2 py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        New Word
      </button>
    </div>
  );
};

export default WordModule;