import React from 'react';
import { useGame } from '../../hooks/useGame';
import { TimerOff, Lightbulb, SkipForward } from 'lucide-react';

const BoostBar: React.FC = () => {
  const { gameState, useBoost } = useGame();
  const { boosts } = gameState;
  
  const boostConfig = [
    { 
      type: 'timeFreeze' as const,
      icon: <TimerOff className="h-5 w-5" />,
      label: 'Freeze Time',
      count: boosts.timeFreeze,
      color: 'text-blue-400'
    },
    { 
      type: 'hint' as const,
      icon: <Lightbulb className="h-5 w-5" />,
      label: 'Hint',
      count: boosts.hint,
      color: 'text-yellow-400'
    },
    { 
      type: 'skip' as const,
      icon: <SkipForward className="h-5 w-5" />,
      label: 'Skip',
      count: boosts.skip,
      color: 'text-green-400'
    }
  ];
  
  return (
    <div className="flex justify-center gap-4 w-full mb-2">
      {boostConfig.map((boost) => (
        <button
          key={boost.type}
          onClick={() => useBoost(boost.type)}
          disabled={boost.count <= 0}
          className={`flex items-center gap-2 py-1 px-3 rounded-lg transition-colors ${
            boost.count > 0
              ? 'bg-slate-700 hover:bg-slate-600'
              : 'bg-slate-800 opacity-50 cursor-not-allowed'
          }`}
          title={`${boost.label} (${boost.count} remaining)`}
        >
          <span className={boost.color}>{boost.icon}</span>
          <span className="text-sm font-medium">{boost.count}</span>
        </button>
      ))}
    </div>
  );
};

export default BoostBar;