import React, { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { Modal } from './components/Modal';
import { Stats } from './components/Stats';
import { ChartBarIcon } from '@heroicons/react/24/outline';

function App() {
  const {
    targetWord,
    guesses,
    currentGuess,
    gameStatus,
    stats,
    isInvalidGuess,
    isRevealing,
    onKeyPress,
    playAgain
  } = useGame();

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [showGameEndModal, setShowGameEndModal] = useState(false);

  useEffect(() => {
    if (gameStatus !== 'playing') {
      setTimeout(() => setShowGameEndModal(true), 500); // Small delay after reveal is done
    } else {
        setShowGameEndModal(false);
    }
  }, [gameStatus]);

  return (
    <div className="flex flex-col h-[100dvh] bg-[#121213] text-white overflow-hidden font-sans">
      <header className="flex items-center justify-between px-4 h-16 border-b border-slate-700 shrink-0">
        <div className="w-8"></div> {/* Spacer */}
        <h1 className="text-3xl font-extrabold tracking-wider text-center uppercase">Wordle</h1>
        <button 
          onClick={(e) => {
            setIsStatsOpen(true);
          }} 
          className="p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 rounded"
        >
          <ChartBarIcon className="w-6 h-6 text-white" />
        </button>
      </header>

      {/* Main Game Area */}
      <main className="flex-grow flex flex-col justify-between max-w-lg mx-auto w-full pt-2 pb-2 min-h-0 h-full">
        <div className="relative flex-grow flex flex-col items-center justify-center min-h-0 w-full h-full">
             {/* Invalid guess toast */}
            {isInvalidGuess && (
            <div className="absolute top-0 z-20 bg-white text-black font-bold py-2 px-4 rounded shadow-lg animate-bounce">
                Not in word list
            </div>
            )}
            <Board guesses={guesses} currentGuess={currentGuess} isRevealing={isRevealing} />
            <div className="mt-2 text-slate-400 text-sm font-medium tracking-wide shrink-0">
              With ❤️, for Debangana
            </div>
        </div>

        <div className="shrink-0 w-full">
          <Keyboard onChar={onKeyPress} guesses={guesses} isRevealing={isRevealing} />
        </div>
      </main>

      {/* Statistics Modal (Manual Trigger) */}
      <Modal isOpen={isStatsOpen} onClose={() => {
        setIsStatsOpen(false);
        setTimeout(() => document.activeElement?.blur(), 10);
      }} title="Statistics">
        <Stats stats={stats} />
        <button
            onClick={() => {
              setIsStatsOpen(false);
              setTimeout(() => document.activeElement?.blur(), 10);
            }}
            className="mt-6 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:text-sm"
        >
            Close
        </button>
      </Modal>

      {/* Game End Modal (Auto Trigger) */}
      <Modal 
        isOpen={showGameEndModal} 
        onClose={() => {
          setShowGameEndModal(false);
          setTimeout(() => document.activeElement?.blur(), 10);
        }}
        title={gameStatus === 'won' ? 'Great Job!' : 'Better luck next time'}
      >
        <Stats stats={stats} />
        {gameStatus === 'lost' && (
             <div className="mt-4 text-center">
                 <p className="text-sm text-slate-400">The word was</p>
                 <p className="text-2xl font-bold text-white tracking-widest">{targetWord}</p>
             </div>
        )}
        <div className="mt-6 flex justify-center">
            <button
                onClick={() => {
                    setShowGameEndModal(false);
                    setTimeout(() => document.activeElement?.blur(), 10);
                    playAgain();
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:text-sm uppercase tracking-wide"
            >
                Play Again
            </button>
        </div>
      </Modal>

    </div>
  );
}

export default App;