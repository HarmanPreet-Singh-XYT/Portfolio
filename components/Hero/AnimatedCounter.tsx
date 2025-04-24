import React, { useState, useEffect, useRef } from 'react';

type AnimatedCounterProps = {
  targetValue: number;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ targetValue, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  useEffect(() => {
    startTimeRef.current = undefined;
    
    const animate = (timestamp: number) => {
      if (startTimeRef.current === undefined) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const currentCount = Math.floor(progress * targetValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [targetValue, duration]);
  
  return <div className={className}>{count}</div>;
}