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
  const { modules, difficulty, powerUpActive } = gameState;
  const moduleLevel = modules.memory.level;

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isChecking, setIsChecking] = useState(false);

  // Generate unique pairs and shuffle
  const generateCards = useCallback(() => {
    const basePairs = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
    const pairs = Math.min(8, Math.floor(moduleLevel / 2) + basePairs);

    const emojis = '🎨🎭🎪🎢🎡🎯🎲🎳🎮🎸🎺🎻🎹🎷🎼🎧🎤'.split('');
    const selectedEmojis = emojis.slice(0, pairs);

    // Create card pairs with unique IDs
    const cardPairs: Card[] = selectedEmojis.flatMap((value, idx) => ([
      { id: idx * 2, value, isFlipped: false, isMatched: false },
      { id: idx * 2 + 1, value, isFlipped: false, isMatched: false }
    ]));

    // Fisher-Yates shuffle
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }

    return cardPairs;
  }, [moduleLevel, difficulty]);

  // Initialize or reset game
  useEffect(() => {
    const newCards = generateCards();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedPairs(0);
    setStartTime(Date.now());
    setIsChecking(false);
  }, [generateCards]);

  // Hint power-up: temporarily flip a matching pair
  useEffect(() => {
    if (powerUpActive === 'hint') {
      const unmatched = cards.filter(c => !c.isMatched && !c.isFlipped);
      for (let i = 0; i < unmatched.length; i++) {
        for (let j = i + 1; j < unmatched.length; j++) {
          if (unmatched[i].value === unmatched[j].value) {
            const hintIds = [unmatched[i].id, unmatched[j].id];
            setCards(prev =>
              prev.map(card =>
                hintIds.includes(card.id)
                  ? { ...card, isFlipped: true }
                  : card
              )
            );
            setTimeout(() => {
              setCards(prev =>
                prev.map(card =>
                  hintIds.includes(card.id)
                    ? { ...card, isFlipped: false }
                    : card
                )
              );
            }, 2000);
            return;
          }
        }
      }
    }
  }, [powerUpActive, cards]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (isChecking) return;

    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;
    if (flippedCards.length === 2) return;

    // Flip clicked card
    setCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isFlipped: true } : card
      )
    );

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      setTimeout(() => {
        if (firstCard && secondCard && firstCard.value === secondCard.value) {
          // Match found
          setCards(prev =>
            prev.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true }
                : card
            )
          );
          setMatchedPairs(prev => {
            const newCount = prev + 1;
            if (newCount === cards.length / 2) {
              const timeSpent = (Date.now() - startTime) / 1000;
              completeModule('memory', true, timeSpent);
            }
            return newCount;
          });
        } else {
          // No match, flip back
          setCards(prev =>
            prev.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }
        setFlippedCards([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  // Grid columns logic
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
          className="grid gap-3 mx-auto"
          style={{ gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))` }}
        >
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isMatched || isChecking}
              className={`aspect-square text-3xl rounded-lg transition-all transform ${
                card.isFlipped || card.isMatched
                  ? 'bg-purple-500 rotate-0 scale-100'
                  : 'bg-slate-600 hover:bg-slate-500 rotate-180 scale-95 hover:scale-100'
              }`}
              aria-label={card.isFlipped || card.isMatched ? `Card showing ${card.value}` : 'Face down card'}
              type="button"
            >
              <span
                className={`block transition-transform ${
                  card.isFlipped || card.isMatched ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'
                }`}
              >
                {card.value}
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
