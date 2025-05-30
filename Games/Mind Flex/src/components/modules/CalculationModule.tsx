import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../hooks/useGame';
import { Calculator } from 'lucide-react';

interface CalculationModuleProps {
  timeRemaining: number;
}

const CalculationModule: React.FC<CalculationModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.calculation.level;

  const [problem, setProblem] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  // Generate calculation problem based on level and difficulty
  const generateProblem = useCallback(() => {
    const operations = ['+', '-', '*'];
    const maxNumber = 
      difficulty === 'easy' ? 10 :
      difficulty === 'medium' ? 20 :
      difficulty === 'hard' ? 50 : 100;

    let numbers: number[] = [];
    let operators: string[] = [];
    const operationCount = Math.min(4, Math.floor(moduleLevel / 2) + 1);

    // Generate numbers and operators
    for (let i = 0; i < operationCount + 1; i++) {
      numbers.push(Math.floor(Math.random() * maxNumber) + 1);
      if (i < operationCount) {
        operators.push(operations[Math.floor(Math.random() * operations.length)]);
      }
    }

    // Build expression and calculate answer
    let expression = numbers[0].toString();
    let answer = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      expression += ` ${operators[i]} ${numbers[i + 1]}`;
      switch (operators[i]) {
        case '+':
          answer += numbers[i + 1];
          break;
        case '-':
          answer -= numbers[i + 1];
          break;
        case '*':
          answer *= numbers[i + 1];
          break;
      }
    }

    return { question: expression, answer };
  }, [moduleLevel, difficulty]);

  // Initialize problem
  useEffect(() => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setUserAnswer('');
    setStartTime(Date.now());
  }, [generateProblem]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isCorrect = parseInt(userAnswer) === problem.answer;
    const timeSpent = (Date.now() - startTime) / 1000;
    completeModule('calculation', isCorrect, timeSpent);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-green-400" />
        <h3 className="text-xl font-medium">Speed Math</h3>
      </div>

      <div className="w-full bg-slate-700/80 rounded-lg p-6 mb-6">
        <div className="text-center mb-6">
          <p className="text-sm text-slate-300 mb-2">Solve the expression:</p>
          <div className="text-3xl font-mono font-bold tracking-wider">
            {problem.question} = ?
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="w-full py-2 px-4 bg-slate-600 rounded-lg border border-slate-500 text-white text-center text-xl font-mono focus:outline-none focus:ring-2 focus:ring-green-500"
            autoFocus
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors"
          >
            Submit Answer
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-slate-300">
          Level {moduleLevel} • {difficulty} difficulty
        </div>
      </div>
    </div>
  );
};

export default CalculationModule;