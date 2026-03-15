import React from 'react';
import { MAX_CHALLENGES } from '../hooks/useGame';

export const History = ({ history }) => {
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
        return (
          <div key={game.id} className="bg-[#1e1e1f] p-4 rounded-lg flex justify-between items-center border border-slate-700/50">
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-widest uppercase">
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
        );
      })}
    </div>
  );
};
