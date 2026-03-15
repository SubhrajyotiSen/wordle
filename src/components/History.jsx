import React from 'react';
import { MAX_CHALLENGES } from '../hooks/useGame';

export const History = ({ history, onLoadGame }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-slate-400">
        <p>No games played yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-2 mb-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {history.map((game) => {
        const date = new Date(game.timestamp).toLocaleDateString(undefined, { 
          year: 'numeric', month: 'short', day: 'numeric' 
        });
        const hasGuesses = !!game.guesses;
        
        return (
          <div 
            key={game.id} 
            className={`bg-[#1e1e1f] rounded-lg border border-slate-700/50 overflow-hidden flex flex-col ${hasGuesses ? 'cursor-pointer hover:bg-[#252526] transition-colors' : 'opacity-70 cursor-not-allowed'}`}
            onClick={() => {
                if (hasGuesses && onLoadGame) {
                    onLoadGame(game);
                }
            }}
            title={!hasGuesses ? "Board details not available for this legacy game" : "Click to view board"}
          >
            <div className="p-4 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-widest uppercase flex items-center gap-2">
                  {game.targetWord}
                </span>
                <span className="text-slate-400 text-sm">
                  {date}
                </span>
              </div>
              <div className={`px-3 py-1 rounded font-bold text-sm ${
                game.status === 'won' ? 'bg-green-600 text-white' : 'bg-slate-600 text-white'
              }`}>
                {game.status === 'won' ? `${game.numGuesses}/${MAX_CHALLENGES}` : `X/${MAX_CHALLENGES}`}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
