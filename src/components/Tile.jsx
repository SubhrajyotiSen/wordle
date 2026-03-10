import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

export const Tile = ({ value, status, isAnimating, isRevealing, position = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(!isRevealing);

  useEffect(() => {
    if (isRevealing) {
      // Animation takes 500ms total, half is 250ms
      // Delay for this letter is position * 250ms
      const delay = position * 250;
      const timeout = setTimeout(() => {
        setIsFlipped(true);
      }, delay + 250); // Switch color halfway through the flip
      return () => clearTimeout(timeout);
    } else {
      setIsFlipped(true); // Automatically flip past guesses
    }
  }, [isRevealing, position]);

  const classes = classNames(
    'w-full h-full border-2 flex items-center justify-center text-3xl font-bold uppercase select-none',
    {
      'border-slate-700 bg-[#121213] text-white': !status,
      'border-slate-500': value && !status,
      'animate-pop': value && !status && isAnimating,
      'bg-[#538d4e] border-[#538d4e] text-white': status === 'correct' && isFlipped,
      'bg-[#b59f3b] border-[#b59f3b] text-white': status === 'present' && isFlipped,
      'bg-[#3a3a3c] border-[#3a3a3c] text-white': status === 'absent' && isFlipped,
      'bg-[#121213] border-slate-500 text-white': status && !isFlipped, // Initial state before flip
    }
  );

  const animationStyle = isRevealing && status
    ? {
        animation: `flip 0.5s ease-in-out forwards`,
        animationDelay: `${position * 250}ms`,
      }
    : {};

  return (
    <div className="w-full h-full" style={{ perspective: '1000px' }}>
        <div className={classes} style={animationStyle}>
            {value}
        </div>
    </div>
  );
};
