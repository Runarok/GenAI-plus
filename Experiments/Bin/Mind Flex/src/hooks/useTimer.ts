import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeUp?: () => void;
  autoStart?: boolean;
  isPaused?: boolean;
}

export const useTimer = ({
  initialTime,
  onTimeUp,
  autoStart = true,
  isPaused = false
}: UseTimerProps) => {
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(autoStart);
  
  const reset = useCallback(() => {
    setTime(initialTime);
    setIsActive(autoStart);
  }, [initialTime, autoStart]);
  
  const start = useCallback(() => {
    setIsActive(true);
  }, []);
  
  const pause = useCallback(() => {
    setIsActive(false);
  }, []);
  
  const addTime = useCallback((seconds: number) => {
    setTime(t => t + seconds);
  }, []);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isActive && !isPaused && time > 0) {
      interval = window.setInterval(() => {
        setTime(prevTime => {
          if (prevTime <= 1) {
            if (interval) clearInterval(interval);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (time <= 0) {
      if (onTimeUp) onTimeUp();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, time, onTimeUp]);
  
  return { time, start, pause, reset, addTime };
};