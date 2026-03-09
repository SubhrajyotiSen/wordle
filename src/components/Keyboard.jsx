import React, { useEffect } from 'react';
import classNames from 'classnames';

export const Keyboard = ({ onChar, guesses, isRevealing }) => {
  const keys = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
  ];

  const keyStatus = {};
  
  // Only calculate status for guesses that have finished revealing
  const revealedGuesses = isRevealing ? guesses.slice(0, -1) : guesses;

  revealedGuesses.forEach((guess) => {
    guess.forEach(({ letter, status }) => {
      // Prioritize green over yellow over gray
      if (status === 'correct') {
        keyStatus[letter] = 'correct';
      } else if (status === 'present' && keyStatus[letter] !== 'correct') {
        keyStatus[letter] = 'present';
      } else if (status === 'absent' && keyStatus[letter] !== 'correct' && keyStatus[letter] !== 'present') {
        keyStatus[letter] = 'absent';
      }
    });
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
        // Blur the active element to prevent Enter/Space from re-triggering buttons
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Backspace' || /^[A-Z]$/i.test(e.key)) {
           if (document.activeElement instanceof HTMLElement) {
               document.activeElement.blur();
           }
        }

        if (e.key === 'Enter') {
            onChar('ENTER');
        } else if (e.key === 'Backspace') {
            onChar('BACKSPACE');
        } else {
            const char = e.key.toUpperCase();
            if (char.length === 1 && char >= 'A' && char <= 'Z') {
                onChar(char);
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChar]);

  const getKeyClass = (key) => {
    const status = keyStatus[key];
    const baseClass = 'flex items-center justify-center font-bold uppercase rounded h-14 bg-slate-400 text-white cursor-pointer select-none mx-0.5 text-sm sm:text-base px-2 py-1';

    if (key === 'ENTER' || key === 'BACKSPACE') {
      return classNames(baseClass, 'w-16 sm:w-20 bg-slate-500 hover:bg-slate-400 text-xs sm:text-sm');
    }

    return classNames(baseClass, 'flex-1 hover:bg-slate-300', {
      'bg-slate-500': !status,
      'bg-green-600': status === 'correct',
      'bg-yellow-600': status === 'present',
      'bg-slate-700': status === 'absent',
    });
  };

  return (
    <div className="flex flex-col items-center w-full px-2 pb-8 max-w-lg mx-auto">
      {keys.map((row, i) => (
        <div key={i} className="flex justify-center w-full my-1">
          {row.map((key) => (
            <button
              key={key}
              className={getKeyClass(key)}
              onClick={() => onChar(key)}
            >
              {key === 'BACKSPACE' ? '⌫' : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};