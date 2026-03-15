import React, { useState, useEffect } from 'react';
import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { Modal } from './components/Modal';
import { Stats } from './components/Stats';
import { History } from './components/History';
import { ChartBarIcon, ClockIcon } from '@heroicons/react/24/outline';

function App() {
  const {
    targetWord,
    guesses,
    currentGuess,
    gameStatus,
    stats,
    gameHistory,
    isInvalidGuess,
    isRevealing,
    onKeyPress,
    playAgain,
    loadGame
  } = useGame();

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
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
        <button 
          onClick={() => setIsHistoryOpen(true)} 
          className="p-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-slate-500 rounded"
        >
          <ClockIcon className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-3xl font-extrabold tracking-wider text-center uppercase">Wordle</h1>
        <button 
          onClick={() => {
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
            <div className="mt-2 flex flex-col items-center gap-2 shrink-0">
                <div className="text-slate-400 text-sm font-medium tracking-wide">
                  With ❤️, for Debangana
                </div>
                {gameStatus !== 'playing' && (
                    <button
                        onClick={() => {
                            setTimeout(() => document.activeElement?.blur(), 10);
                            playAgain();
                        }}
                        className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none uppercase tracking-wide"
                    >
                        Play Again
                    </button>
                )}
            </div>
        </div>

        <div className="shrink-0 w-full">
          <Keyboard onChar={onKeyPress} guesses={guesses} isRevealing={isRevealing} />
        </div>
      </main>

      {/* History Modal */}
      <Modal isOpen={isHistoryOpen} onClose={() => {
        setIsHistoryOpen(false);
        setTimeout(() => document.activeElement?.blur(), 10);
      }} title="Game History">
        <History 
            history={gameHistory} 
            onLoadGame={(game) => {
                loadGame(game);
                setIsHistoryOpen(false);
                setTimeout(() => document.activeElement?.blur(), 10);
            }} 
        />
        <div className="mt-4 flex justify-center">
            <button
                onClick={() => {
                  setIsHistoryOpen(false);
                  setTimeout(() => document.activeElement?.blur(), 10);
                }}
                className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 text-base font-medium shadow-sm focus:outline-none sm:text-sm"
            >
                Close
            </button>
        </div>
      </Modal>

      {/* Statistics Modal (Manual Trigger) */}
      <Modal isOpen={isStatsOpen} onClose={() => {
        setIsStatsOpen(false);
        setTimeout(() => document.activeElement?.blur(), 10);
      }} title="Statistics">
        <Stats stats={stats} />
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            {gameStatus !== 'playing' && (
                <button
                    onClick={() => {
                        setIsStatsOpen(false);
                        setTimeout(() => document.activeElement?.blur(), 10);
                        playAgain();
                    }}
                    className="w-full inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none sm:text-sm uppercase tracking-wide"
                >
                    Play Again
                </button>
            )}
            <button
                onClick={() => {
                  setIsStatsOpen(false);
                  setTimeout(() => document.activeElement?.blur(), 10);
                }}
                className={`w-full inline-flex justify-center rounded-md border ${gameStatus !== 'playing' ? 'border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800' : 'border-transparent bg-indigo-600 text-white hover:bg-indigo-700'} px-4 py-2 text-base font-medium shadow-sm focus:outline-none sm:text-sm`}
            >
                Close
            </button>
        </div>
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
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
                onClick={() => {
                    setShowGameEndModal(false);
                    setTimeout(() => document.activeElement?.blur(), 10);
                }}
                className="w-full inline-flex justify-center rounded-md border border-slate-600 bg-transparent px-4 py-2 text-base font-medium text-slate-300 shadow-sm hover:bg-slate-800 focus:outline-none sm:text-sm uppercase tracking-wide"
            >
                View Board
            </button>
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