
import { useEffect, useCallback } from 'react';

interface KeyboardInputProps {
  onNumberInput: (num: string) => void;
  onOperatorInput: (operator: string) => void;
  onCalculate: () => void;
  onClear: () => void;
  onClearEntry: () => void;
  onDecimal: () => void;
  onBackspace: () => void;
  onToggleSign: () => void;
  onPercentage: () => void;
  onSquareRoot: () => void;
  onSquare: () => void;
}

const useKeyboardInput = ({
  onNumberInput,
  onOperatorInput,
  onCalculate,
  onClear,
  onClearEntry,
  onDecimal,
  onBackspace,
  onToggleSign,
  onPercentage,
  onSquareRoot,
  onSquare,
}: KeyboardInputProps) => {
  const isMobile = useCallback(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }, []);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Disable keyboard input on mobile devices
    if (isMobile()) {
      return;
    }

    const key = event.key;
    
    // Prevent default behavior for calculator keys
    if (/[0-9+\-*/=.%^cC]/.test(key) || 
        key === 'Enter' || 
        key === 'Escape' || 
        key === 'Backspace' ||
        key === 'Delete') {
      event.preventDefault();
    }

    // Number inputs
    if (/[0-9]/.test(key)) {
      onNumberInput(key);
      return;
    }

    // Operator inputs
    switch (key) {
      case '+':
        onOperatorInput('+');
        break;
      case '-':
        onOperatorInput('-');
        break;
      case '*':
        onOperatorInput('×');
        break;
      case '/':
        onOperatorInput('÷');
        break;
      case '^':
        onOperatorInput('^');
        break;
      case '=':
      case 'Enter':
        onCalculate();
        break;
      case '.':
        onDecimal();
        break;
      case 'Backspace':
        onBackspace();
        break;
      case 'Delete':
        onClearEntry();
        break;
      case 'Escape':
      case 'c':
      case 'C':
        onClear();
        break;
      case '%':
        onPercentage();
        break;
      case 'r':
      case 'R':
        onSquareRoot();
        break;
      case 's':
      case 'S':
        onSquare();
        break;
      case 'n':
      case 'N':
        onToggleSign();
        break;
    }
  }, [
    isMobile,
    onNumberInput,
    onOperatorInput,
    onCalculate,
    onClear,
    onClearEntry,
    onDecimal,
    onBackspace,
    onToggleSign,
    onPercentage,
    onSquareRoot,
    onSquare,
  ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return { isMobile: isMobile() };
};

export default useKeyboardInput;
