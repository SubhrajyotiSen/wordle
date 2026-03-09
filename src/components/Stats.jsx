import React from 'react';
import { MAX_CHALLENGES } from '../hooks/useGame';

export const Stats = ({ stats }) => {
  const maxDistribution = Math.max(...stats.winDistribution, 1);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <div className="flex justify-center mb-6 text-center w-full">
        <div className="flex-1">
          <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
          <div className="text-xs uppercase">Played</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold">
            {stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0}
          </div>
          <div className="text-xs uppercase">Win %</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold">{stats.currentStreak}</div>
          <div className="text-xs uppercase">Current<br />Streak</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold">{stats.maxStreak}</div>
          <div className="text-xs uppercase">Max<br />Streak</div>
        </div>
      </div>

      <h4 className="text-lg font-bold uppercase mb-2">Guess Distribution</h4>
      <div className="w-full flex flex-col gap-1 text-sm font-bold">
        {stats.winDistribution.map((count, i) => (
          <div key={i} className="flex items-center w-full">
            <div className="w-4 text-right pr-2">{i + 1}</div>
            <div className="flex-1 bg-slate-700 h-6">
              <div
                className={`h-full ${count > 0 ? 'bg-green-600' : 'bg-slate-700'} flex items-center justify-end px-2 min-w-[1.5rem]`}
                style={{ width: `${Math.max((count / maxDistribution) * 100, 5)}%` }}
              >
                {count}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};