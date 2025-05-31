import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useGame } from '../../hooks/useGame';
import { TimerOff, Lightbulb, SkipForward, Star, Heart } from 'lucide-react';

const BoostBar: React.FC = () => {
  const { gameState, useBoost } = useGame();
  const { boosts } = gameState;

  // Track which boost button is hovered and tooltip position
  const [hoveredBoost, setHoveredBoost] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const boostConfig = [
    {
      type: 'timeFreeze' as const,
      icon: <TimerOff className="h-5 w-5" />,
      label: 'Freeze Time (10s)',
      description: 'Pause the timer for 10 seconds',
      count: boosts.timeFreeze,
      color: 'text-blue-400',
    },
    {
      type: 'hint' as const,
      icon: <Lightbulb className="h-5 w-5" />,
      label: 'Hint',
      description: 'Reveal part of the solution',
      count: boosts.hint,
      color: 'text-yellow-400',
    },
    {
      type: 'skip' as const,
      icon: <SkipForward className="h-5 w-5" />,
      label: 'Skip',
      description: 'Skip current challenge without penalty',
      count: boosts.skip,
      color: 'text-green-400',
    },
    {
      type: 'multiplier' as const,
      icon: <Star className="h-5 w-5" />,
      label: '2x Points (30s)',
      description: 'Double points for 30 seconds',
      count: boosts.multiplier,
      color: 'text-purple-400',
    },
    {
      type: 'extraLife' as const,
      icon: <Heart className="h-5 w-5" />,
      label: 'Extra Life',
      description: 'Gain one additional life',
      count: boosts.extraLife,
      color: 'text-red-400',
    },
  ];

  // Show tooltip and calculate position on mouse enter
  const handleMouseEnter = (type: string, event: React.MouseEvent<HTMLButtonElement>) => {
    setHoveredBoost(type);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({ x: rect.left + rect.width / 2, y: rect.bottom });
  };

  // Hide tooltip on mouse leave
  const handleMouseLeave = () => {
    setHoveredBoost(null);
  };

  return (
    <div className="flex flex-col items-center w-full mb-4">
      <div className="flex justify-center gap-2 w-full flex-wrap relative">
        {boostConfig.map((boost) => (
          <button
            key={boost.type}
            onClick={() => useBoost(boost.type)}
            disabled={boost.count <= 0}
            className={`group relative flex items-center gap-2 py-2 px-4 rounded-lg transition-all ${
              boost.count > 0
                ? 'bg-slate-700 hover:bg-slate-600 transform hover:scale-105'
                : 'bg-slate-800 opacity-50 cursor-not-allowed'
            }`}
            title={`${boost.label} (${boost.count} remaining)`}
            onMouseEnter={(e) => handleMouseEnter(boost.type, e)}
            onMouseLeave={handleMouseLeave}
          >
            <span className={boost.color}>{boost.icon}</span>
            <span className="text-sm font-medium">{boost.count}</span>
          </button>
        ))}

        {/* Tooltip rendered via React Portal */}
        {hoveredBoost && (() => {
          const boost = boostConfig.find((b) => b.type === hoveredBoost);
          if (!boost) return null;
          return ReactDOM.createPortal(
            <div
              className="px-3 py-2 bg-slate-900 text-white text-sm rounded-lg shadow-lg border border-slate-700 whitespace-nowrap select-none"
              style={{
                position: 'fixed',
                top: tooltipPos.y + 8, // 8px below button
                left: tooltipPos.x,
                transform: 'translateX(-50%)',
                zIndex: 9999,
                pointerEvents: 'none', // so tooltip doesn't block mouse events
              }}
            >
              <div className="font-medium mb-1">{boost.label}</div>
              <div className="text-xs text-slate-300">{boost.description}</div>

              {/* Arrow pointing up */}
              <div
                style={{
                  position: 'absolute',
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderBottom: '8px solid #1e293b', // matches bg-slate-900
                }}
              />
            </div>,
            document.body
          );
        })()}
      </div>
    </div>
  );
};

export default BoostBar;
