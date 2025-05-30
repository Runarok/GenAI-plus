import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Award, BarChart, BrainCircuit, ArrowUpCircle, RefreshCcw } from 'lucide-react';

const ResultScreen: React.FC = () => {
  const { gameState, initializeGame, startGame } = useGame();
  const { score, modules, analytics } = gameState;

  // Get recommendations based on performance
  const getRecommendations = () => {
    const recommendations = [];
    
    if (analytics.patternAccuracy < 50) {
      recommendations.push("Practice visual pattern recognition more frequently");
    }
    
    if (analytics.mazeSpeed < 40) {
      recommendations.push("Work on spatial reasoning speed with simple maze exercises");
    }
    
    if (analytics.wordAccuracy < 50) {
      recommendations.push("Improve vocabulary with word games and reading");
    }
    
    if (analytics.averageResponseTime > 5) {
      recommendations.push("Focus on reaction time with quick-response exercises");
    }
    
    // Default recommendation if performing well
    if (recommendations.length === 0) {
      recommendations.push("Try increasing the difficulty level for more challenge");
    }
    
    return recommendations;
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 rounded-xl backdrop-blur-sm p-6">
      <div className="text-center mb-8">
        <Award className="h-16 w-16 text-yellow-400 mx-auto mb-2" />
        <h2 className="text-3xl font-bold mb-2">Game Complete!</h2>
        <p className="text-2xl font-bold text-blue-400">{score} Points</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-700/80 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium mb-2">Pattern Recognition</h3>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {modules.pattern.accuracy.toFixed(0)}%
          </div>
          <p className="text-sm text-slate-300">Accuracy</p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium mb-2">Spatial Reasoning</h3>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {modules.maze.accuracy.toFixed(0)}%
          </div>
          <p className="text-sm text-slate-300">Completion</p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg text-center">
          <h3 className="text-lg font-medium mb-2">Word Puzzles</h3>
          <div className="text-3xl font-bold text-blue-400 mb-1">
            {modules.word.accuracy.toFixed(0)}%
          </div>
          <p className="text-sm text-slate-300">Accuracy</p>
        </div>
      </div>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="h-5 w-5 text-purple-400" />
          <h3 className="text-xl font-semibold">Brain Performance Insights</h3>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
          <h4 className="font-medium mb-2">Response Time</h4>
          <div className="w-full bg-slate-600 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full"
              style={{ width: `${Math.min(100, 100 - analytics.averageResponseTime * 10)}%` }}
            ></div>
          </div>
          <p className="text-sm text-slate-300">Average: {analytics.averageResponseTime.toFixed(1)}s</p>
        </div>
        
        <div className="bg-slate-700/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Areas for Improvement</h4>
          <ul className="space-y-2">
            {getRecommendations().map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <ArrowUpCircle className="h-5 w-5 text-green-400 mt-0.5 shrink-0" />
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => startGame()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          <RefreshCcw className="h-5 w-5" />
          Play Again
        </button>
        
        <button
          onClick={() => initializeGame()}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-slate-700 text-white font-medium rounded-lg hover:bg-slate-600 transition-colors"
        >
          <BarChart className="h-5 w-5" />
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;