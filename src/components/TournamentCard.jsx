import { Link } from 'react-router-dom';
import { ArrowUpRight, Trophy } from '@phosphor-icons/react';
import FlagBadge from './FlagBadge';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function TournamentCard({ tournament }) {
  const isPreview = tournament.detailLevel === 'preview';

  return (
    <Link
      to={`/tournaments/${tournament.year}`}
      className="group card-lift relative flex flex-col overflow-hidden rounded-2xl p-1.5 active:scale-[0.99]"
    >
      <div className="flex h-full flex-col rounded-[calc(1rem-0.375rem)] bg-surface-raised p-6 ring-1 ring-white/8 transition-premium group-hover:ring-pitch/30">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <span
              className="font-black tracking-tighter text-white"
              style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.8rem, 3vw, 2.2rem)', letterSpacing: '-0.04em' }}
            >
              {tournament.year}
            </span>
            {isPreview && (
              <span className="ml-2 rounded-full bg-pitch/20 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-pitch animate-pulse-soft">
                Live
              </span>
            )}
          </div>
          {!isPreview && tournament.winnerCode && (
            <FlagBadge code={tournament.winnerCode} size="lg" />
          )}
        </div>

        <p className="text-sm text-white/50">{tournament.host}</p>

        {tournament.winner ? (
          <div className="mt-4 flex items-center gap-2">
            <Trophy size={14} weight="fill" className="text-pitch" />
            <span className="text-sm font-medium text-white">{tournament.winner}</span>
          </div>
        ) : (
          <p className="mt-4 text-sm text-white/40">Hosts: {tournament.hosts?.join(', ')}</p>
        )}

        <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-white/40">
          {tournament.fact}
        </p>

        <div className="mt-auto pt-6 flex items-center gap-1 text-xs font-medium text-pitch opacity-0 transition-premium group-hover:opacity-100">
          {isPreview ? 'View groups & schedule' : 'Explore tournament'}
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
}
