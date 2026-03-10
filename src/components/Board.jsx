import React from 'react';
import { Tile } from './Tile';
import { WORD_LENGTH, MAX_CHALLENGES } from '../hooks/useGame';

export const Board = ({ guesses, currentGuess, isRevealing }) => {
  const empties =
    guesses.length < MAX_CHALLENGES - 1
      ? Array.from(Array(MAX_CHALLENGES - 1 - guesses.length))
      : [];

  return (
    <div className="flex justify-center items-center flex-grow w-full min-h-0 p-2 h-full">
        <div className="grid grid-rows-6 gap-1.5 sm:gap-2" style={{ 
            height: 'min(100%, 420px)',
            width: 'auto',
            aspectRatio: '5/6',
            maxWidth: '100%',
            maxHeight: '100%'
        }}>
            {guesses.map((guess, i) => {
                const isRevealingRow = isRevealing && i === guesses.length - 1;
                return (
                    <div key={i} className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {guess.map((g, j) => (
                        <Tile key={j} value={g.letter} status={g.status} isRevealing={isRevealingRow} position={j} />
                    ))}
                    </div>
                );
            })}
            {guesses.length < MAX_CHALLENGES && (
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {currentGuess.split('').map((letter, i) => (
                        <Tile key={i} value={letter} isAnimating={true} />
                    ))}
                    {Array.from(Array(WORD_LENGTH - currentGuess.length)).map((_, i) => (
                        <Tile key={i} value="" />
                    ))}
                </div>
            )}
            {empties.map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-1.5 sm:gap-2">
                    {Array.from(Array(WORD_LENGTH)).map((_, j) => (
                        <Tile key={j} value="" />
                    ))}
                </div>
            ))}
        </div>
    </div>
  );
};
