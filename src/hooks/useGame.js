import { useState, useCallback } from 'react';
import { getRandomWord, VALID_GUESSES } from '../constants/wordList';
import { useLocalStorage } from './useLocalStorage';

export const MAX_CHALLENGES = 6;
export const WORD_LENGTH = 5;

const initialStats = {
  currentStreak: 0,
  maxStreak: 0,
  gamesPlayed: 0,
  gamesWon: 0,
  winDistribution: Array.from(new Array(MAX_CHALLENGES), () => 0),
};

export const useGame = () => {
  const [targetWord, setTargetWord] = useLocalStorage('wordle-target', getRandomWord());
  const [guesses, setGuesses] = useLocalStorage('wordle-guesses', []);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useLocalStorage('wordle-status', 'playing'); // 'playing', 'won', 'lost'
  const [stats, setStats] = useLocalStorage('wordle-stats', initialStats);
  const [gameHistory, setGameHistory] = useLocalStorage('wordle-history', []);
  const [isInvalidGuess, setIsInvalidGuess] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const evaluateGuess = (guess, target) => {
    const result = Array(WORD_LENGTH).fill({ letter: '', status: 'absent' });
    const targetLetters = target.split('');
    const guessLetters = guess.split('');

    // First pass: find correct letters (green)
    guessLetters.forEach((letter, i) => {
      if (targetLetters[i] === letter) {
        result[i] = { letter, status: 'correct' };
        targetLetters[i] = null; // Mark as used
      }
    });

    // Second pass: find present letters (yellow)
    guessLetters.forEach((letter, i) => {
      if (result[i].status !== 'correct') {
        const indexInTarget = targetLetters.indexOf(letter);
        if (indexInTarget !== -1) {
          result[i] = { letter, status: 'present' };
          targetLetters[indexInTarget] = null; // Mark as used
        } else {
          result[i] = { letter, status: 'absent' };
        }
      }
    });

    return result;
  };

  const updateStats = useCallback((status, numGuesses, currentTarget) => {
      setStats(prevStats => {
          const newStats = { ...prevStats };
          newStats.gamesPlayed += 1;

          if (status === 'won') {
              newStats.gamesWon += 1;
              newStats.currentStreak += 1;
              newStats.maxStreak = Math.max(newStats.currentStreak, newStats.maxStreak);
              newStats.winDistribution[numGuesses - 1] += 1;
          } else {
              newStats.currentStreak = 0;
          }
          return newStats;
      });

      setGameHistory(prevHistory => {
          const newRecord = {
              id: Date.now(),
              targetWord: currentTarget,
              status,
              numGuesses,
              timestamp: new Date().toISOString()
          };
          return [newRecord, ...prevHistory]; // Store newest first
      });
  }, [setStats, setGameHistory]);

  const onKeyPress = useCallback(
    (key) => {
      if (gameStatus !== 'playing') return;

      if (key === 'ENTER') {
        if (currentGuess.length !== WORD_LENGTH) {
            return;
        }

        if (!VALID_GUESSES.has(currentGuess)) {
            setIsInvalidGuess(true);
            setTimeout(() => setIsInvalidGuess(false), 1500);
            return;
        }

        const evaluated = evaluateGuess(currentGuess, targetWord);
        const newGuesses = [...guesses, evaluated];
        setGuesses(newGuesses);
        setCurrentGuess('');
        
        setIsRevealing(true);
        setTimeout(() => {
          setIsRevealing(false);
          if (currentGuess === targetWord) {
              setGameStatus('won');
              updateStats('won', newGuesses.length, targetWord);
          } else if (newGuesses.length === MAX_CHALLENGES) {
              setGameStatus('lost');
              updateStats('lost', newGuesses.length, targetWord);
          }
        }, 1500);
      } else if (key === 'BACKSPACE') {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, gameStatus, guesses, targetWord, setGuesses, setGameStatus, updateStats]
  );

  const playAgain = () => {
      setTargetWord(getRandomWord());
      setGuesses([]);
      setCurrentGuess('');
      setGameStatus('playing');
  };

  return {
    targetWord,
    guesses,
    currentGuess,
    gameStatus,
    stats,
    gameHistory,
    isInvalidGuess,
    isRevealing,
    onKeyPress,
    playAgain
  };
};
