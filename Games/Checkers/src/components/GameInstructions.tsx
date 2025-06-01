
import { Crown } from 'lucide-react';

export const GameInstructions = () => {
  return (
    <div className="lg:order-3 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          How to Play
        </h3>
        
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 mt-1 flex-shrink-0"></div>
            <p>Click a piece to select it and see valid moves</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 mt-1 flex-shrink-0"></div>
            <p>Pieces move diagonally on dark squares only</p>
          </div>
          
          <div className="flex items-start gap-3">
            <Crown className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
            <p>Reach the opposite end to become a king</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-green-400 mt-1 flex-shrink-0"></div>
            <p>Jump over opponent pieces to capture them</p>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 rounded-full bg-yellow-400 mt-1 flex-shrink-0"></div>
            <p>Capture all opponent pieces to win</p>
          </div>
        </div>
      </div>
    </div>
  );
};
