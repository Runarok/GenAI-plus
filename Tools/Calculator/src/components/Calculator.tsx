import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import useKeyboardInput from '@/hooks/useKeyboardInput';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState(false);

  const inputNumber = useCallback((num: string) => {
    if (error) {
      setDisplay('0');
      setExpression('');
      setError(false);
    }

    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  }, [display, waitingForOperand, error]);

  const inputOperator = useCallback((nextOperator: string) => {
    if (error) return;

    const inputValue = parseFloat(display);

    if (expression === '') {
      setExpression(display + ' ' + nextOperator + ' ');
    } else if (!waitingForOperand) {
      const newExpression = expression + display + ' ' + nextOperator + ' ';
      setExpression(newExpression);
    } else {
      setExpression(expression.slice(0, -3) + ' ' + nextOperator + ' ');
    }

    setWaitingForOperand(true);
  }, [display, expression, waitingForOperand, error]);

  const calculate = useCallback(() => {
    if (error) return;

    try {
      const fullExpression = expression + display;
      console.log('Calculating expression:', fullExpression);
      
      // Replace operators with JavaScript equivalents and handle special cases
      let jsExpression = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Check for division by zero
      if (jsExpression.includes('/0') && !jsExpression.includes('/0.')) {
        throw new Error('Division by zero');
      }

      const result = Function('"use strict"; return (' + jsExpression + ')')();
      
      if (!isFinite(result)) {
        throw new Error('Invalid calculation');
      }

      const formattedResult = parseFloat(result.toFixed(10)).toString();
      setDisplay(formattedResult);
      setExpression('');
      setWaitingForOperand(true);
    } catch (err) {
      console.error('Calculation error:', err);
      setDisplay('Error');
      setExpression('');
      setWaitingForOperand(true);
      setError(true);
    }
  }, [expression, display, error]);

  const clear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setWaitingForOperand(false);
    setError(false);
  }, []);

  const clearEntry = useCallback(() => {
    setDisplay('0');
    setWaitingForOperand(false);
  }, []);

  const inputDecimal = useCallback(() => {
    if (error) {
      setDisplay('0.');
      setExpression('');
      setError(false);
      setWaitingForOperand(false);
      return;
    }

    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForOperand, error]);

  const toggleSign = useCallback(() => {
    if (error) return;
    
    if (display !== '0') {
      setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display);
    }
  }, [display, error]);

  const percentage = useCallback(() => {
    if (error) return;
    
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
  }, [display, error]);

  const squareRoot = useCallback(() => {
    if (error) return;
    
    const value = parseFloat(display);
    if (value < 0) {
      setDisplay('Error');
      setError(true);
      return;
    }
    
    const result = Math.sqrt(value);
    setDisplay(result.toString());
    setWaitingForOperand(true);
  }, [display, error]);

  const square = useCallback(() => {
    if (error) return;
    
    const value = parseFloat(display);
    const result = value * value;
    setDisplay(result.toString());
    setWaitingForOperand(true);
  }, [display, error]);

  const backspace = useCallback(() => {
    if (error) {
      clear();
      return;
    }

    if (display.length > 1 && display !== '0') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display, error, clear]);

  // Use the keyboard input hook
  const { isMobile } = useKeyboardInput({
    onNumberInput: inputNumber,
    onOperatorInput: inputOperator,
    onCalculate: calculate,
    onClear: clear,
    onClearEntry: clearEntry,
    onDecimal: inputDecimal,
    onBackspace: backspace,
    onToggleSign: toggleSign,
    onPercentage: percentage,
    onSquareRoot: squareRoot,
    onSquare: square,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700 shadow-2xl">
        <div className="p-6 space-y-4">
          {/* Display */}
          <div className="bg-black rounded-lg p-4 border border-gray-600">
            <div className="text-sm text-gray-400 font-mono min-h-[20px] text-right">
              {expression}
            </div>
            <div className="text-4xl text-white font-mono text-right mt-2 min-h-[50px] break-words">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* First Row */}
            <Button 
              onClick={clear}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-14 text-lg"
            >
              C
            </Button>
            <Button 
              onClick={clearEntry}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-14 text-lg"
            >
              CE
            </Button>
            <Button 
              onClick={backspace}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold h-14 text-lg"
            >
              ⌫
            </Button>
            <Button 
              onClick={() => inputOperator('÷')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 text-xl"
            >
              ÷
            </Button>

            {/* Second Row */}
            <Button 
              onClick={() => inputNumber('7')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              7
            </Button>
            <Button 
              onClick={() => inputNumber('8')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              8
            </Button>
            <Button 
              onClick={() => inputNumber('9')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              9
            </Button>
            <Button 
              onClick={() => inputOperator('×')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 text-xl"
            >
              ×
            </Button>

            {/* Third Row */}
            <Button 
              onClick={() => inputNumber('4')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              4
            </Button>
            <Button 
              onClick={() => inputNumber('5')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              5
            </Button>
            <Button 
              onClick={() => inputNumber('6')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              6
            </Button>
            <Button 
              onClick={() => inputOperator('-')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 text-xl"
            >
              −
            </Button>

            {/* Fourth Row */}
            <Button 
              onClick={() => inputNumber('1')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              1
            </Button>
            <Button 
              onClick={() => inputNumber('2')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              2
            </Button>
            <Button 
              onClick={() => inputNumber('3')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              3
            </Button>
            <Button 
              onClick={() => inputOperator('+')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-14 text-xl"
            >
              +
            </Button>

            {/* Fifth Row */}
            <Button 
              onClick={toggleSign}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-lg"
            >
              ±
            </Button>
            <Button 
              onClick={() => inputNumber('0')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              0
            </Button>
            <Button 
              onClick={inputDecimal}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold h-14 text-xl"
            >
              .
            </Button>
            <Button 
              onClick={calculate}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold h-14 text-xl"
            >
              =
            </Button>

            {/* Advanced Functions Row */}
            <Button 
              onClick={percentage}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-lg"
            >
              %
            </Button>
            <Button 
              onClick={squareRoot}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-lg"
            >
              √
            </Button>
            <Button 
              onClick={square}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-lg"
            >
              x²
            </Button>
            <Button 
              onClick={() => inputOperator('^')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold h-12 text-lg"
            >
              x^y
            </Button>
          </div>

          {/* Instructions */}
          <div className="text-center text-gray-400 text-sm mt-4">
            <p>Advanced Calculator with Order of Operations</p>
            <p className="text-xs mt-1">Supports decimals, negatives, and complex expressions</p>
            {!isMobile && (
              <p className="text-xs mt-1 text-blue-400">
                Keyboard shortcuts: Numbers, +, -, *, /, =, Enter, Escape (clear), Backspace, R (√), S (x²), N (±)
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Calculator;
