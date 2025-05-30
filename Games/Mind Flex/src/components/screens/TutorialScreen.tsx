import React from 'react';
import { useGame } from '../../hooks/useGame';
import { Grid3X3, Haze as Maze, Type, TimerReset, Lightbulb, ArrowRight } from 'lucide-react';

const TutorialScreen: React.FC = () => {
  const { setScreen } = useGame();
  
  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 rounded-xl backdrop-blur-sm p-6 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">How to Play MindFlex</h2>
      
      <div className="space-y-6">
        <div className="bg-slate-700/80 p-4 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2 text-blue-400">
            <Grid3X3 className="h-5 w-5" />
            Pattern Recognition
          </h3>
          <p className="mb-2">
            Memorize and reproduce visual patterns by selecting tiles in the correct sequence.
          </p>
          <p className="text-sm text-slate-300">
            The patterns become more complex as you successfully complete each level.
          </p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2 text-blue-400">
            <Maze className="h-5 w-5" />
            Spatial Reasoning
          </h3>
          <p className="mb-2">
            Navigate through mini-mazes using arrow keys or swipe gestures to find the exit.
          </p>
          <p className="text-sm text-slate-300">
            Mazes increase in complexity with more twists, turns and dead ends at higher levels.
          </p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2 text-blue-400">
            <Type className="h-5 w-5" />
            Word Puzzles
          </h3>
          <p className="mb-2">
            Solve word challenges by unscrambling letters, finding connections, or completing words.
          </p>
          <p className="text-sm text-slate-300">
            Word complexity increases with more obscure words and tighter time constraints.
          </p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2 text-yellow-400">
            <Lightbulb className="h-5 w-5" />
            Cognitive Boosts
          </h3>
          <p className="mb-2">
            Use strategic power-ups to help when you're stuck:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-slate-300">
            <li>Time Freeze: Pause the timer temporarily</li>
            <li>Hint: Receive a clue for the current puzzle</li>
            <li>Skip: Move to the next challenge without penalty</li>
          </ul>
          <p className="mt-2 text-sm text-slate-300">
            Boosts are limited - use them wisely!
          </p>
        </div>
        
        <div className="bg-slate-700/80 p-4 rounded-lg">
          <h3 className="flex items-center gap-2 text-lg font-medium mb-2">
            <TimerReset className="h-5 w-5 text-purple-400" />
            Adaptive Difficulty
          </h3>
          <p className="text-sm text-slate-300">
            The game automatically adjusts to your performance. Successfully complete challenges 
            to increase difficulty and earn more points. Struggling with puzzles will 
            adjust the difficulty to keep the game challenging but achievable.
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <button
          onClick={() => setScreen('menu')}
          className="flex items-center justify-center gap-2 py-3 px-8 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Menu
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default TutorialScreen;