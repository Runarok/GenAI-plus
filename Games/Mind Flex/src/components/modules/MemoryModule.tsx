import React, { useState, useEffect, useCallback } from 'react';
import { useGame } from '../../hooks/useGame';
import { Brain } from 'lucide-react';

interface MemoryModuleProps {
  timeRemaining: number;
}

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryModule: React.FC<MemoryModuleProps> = ({ timeRemaining }) => {
  const { gameState, completeModule } = useGame();
  const { modules, difficulty } = gameState;
  const moduleLevel = modules.memory.level;

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [startTime, setStartTime] = useState(Date.now());

  // Generate cards based on level and difficulty
  const generateCards = useCallback(() => {
    const pairs = Math.min(8, Math.floor(moduleLevel / 2) + 3);
    const symbols = '🎨🎭🎪🎢🎡🎯🎲🎳🎮🎸🎺🎻🎹🎷🎼🎧🎤'.split('');
    const selectedSymbols = symbols.slice(0, pairs);
    
    const cardPairs = [...selectedSymbols, ...selectedSymbols]
      .map((value, index) => ({
        id: index,
        value,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    return cardPairs;
  }, [moduleLevel]);

  // Initialize game
  useEffect(() => {
    const newCards = generateCards();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setStartTime(Date.now());
  }, [generateCards]);

  // Handle card click
  const handleCardClick = (id: number) => {
    // Ignore if card is already flipped or matched
    if (
      cards[id].isFlipped ||
      cards[id].isMatched ||
      flippedCards.length === 2
    ) {
      return;
    }

    // Flip card
    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      
      if (cards[firstId].value === cards[secondId].value) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId].isMatched = true;
          matchedCards[secondId].isMatched = true;
          setCards(matchedCards);
          setFlippedCards([]);
          setMatchedPairs(prev => {
            const newMatchedPairs = prev + 1;
            // Check if game is complete
            if (newMatchedPairs === cards.length / 2) {
              const timeSpent = (Date.now() - startTime) / 1000;
              completeModule('memory', true, timeSpent);
            }
            return newMatchedPairs;
          });
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const unflippedCards = [...cards];
          unflippedCards[firstId].isFlipped = false;
          unflippedCards[secondId].isFlipped = false;
          setCards(unflippedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Calculate grid columns based on card count
  const gridCols = cards.length <= 12 ? 4 : 6;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="h-5 w-5 text-purple-400" />
        <h3 className="text-xl font-medium">Memory Match</h3>
      </div>

      <div className="w-full bg-slate-700/80 rounded-lg p-6">
        <div className="text-center mb-4">
          <p className="text-sm text-slate-300">
            Pairs Found: {matchedPairs} / {cards.length / 2}
          </p>
        </div>

        <div
          className={`grid gap-3 mx-auto`}
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`aspect-square text-2xl rounded-lg transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-purple-500 rotate-0'
                  : 'bg-slate-600 hover:bg-slate-500 rotate-180'
              }`}
              disabled={card.isMatched}
            >
              <span
                className={`block transition-all transform ${
                  card.isFlipped || card.isMatched ? 'rotate-0' : 'rotate-180'
                }`}
              >
                {card.isFlipped || card.isMatched ? card.value : ''}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-slate-300">
          Level {moduleLevel} • {difficulty} difficulty
        </div>
      </div>
    </div>
  );
};

export default MemoryModule;