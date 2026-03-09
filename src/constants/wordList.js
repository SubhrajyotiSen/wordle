import targetWords from './targetWords.json';
import validGuesses from './validGuesses.json';

// Normalize everything to uppercase
export const WORDS = targetWords.map(word => word.toUpperCase());
const ADDITIONAL_GUESSES = validGuesses.map(word => word.toUpperCase());

// A valid guess is any word from either list
export const VALID_GUESSES = new Set([...WORDS, ...ADDITIONAL_GUESSES]);

export const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
};
