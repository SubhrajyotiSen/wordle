import React, { useState } from 'react';
import { MAX_CHALLENGES } from '../hooks/useGame';
import { Board } from './Board';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export const History = ({ history }) => {
  const [expandedId, setExpandedId] = useState(null);

  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-slate-400">
        <p>No games played yet.</p>
      </div>
    );
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-3 mt-2 mb-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
      {history.map((game) => {
        const date = new Date(game.timestamp).toLocaleDateString(undefined, { 
          year: 'numeric', month: 'short', day: 'numeric' 
        });
        const isExpanded = expandedId === game.id;
        
        return (
          <div key={game.id} className="bg-[#1e1e1f] rounded-lg border border-slate-700/50 overflow-hidden flex flex-col">
            <div 
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#252526] transition-colors"
              onClick={() => toggleExpand(game.id)}
            >
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg tracking-widest uppercase flex items-center gap-2">
                  {game.targetWord}
                  {isExpanded ? (
                    <ChevronUpIcon className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDownIcon className="w-4 h-4 text-slate-400" />
                  )}
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
            
            {isExpanded && game.guesses && (
              <div className="p-4 pt-0 border-t border-slate-700/50 flex flex-col items-center">
                <div className="mt-4 w-4/5 max-w-[250px]">
                  <Board 
                    guesses={game.guesses} 
                    currentGuess="" 
                    isRevealing={false} 
                  />
                </div>
              </div>
            )}
            {isExpanded && !game.guesses && (
               <div className="p-4 pt-0 border-t border-slate-700/50 flex justify-center text-slate-500 text-sm">
                 Board details not available for this legacy game.
               </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
