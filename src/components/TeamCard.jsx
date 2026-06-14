import { Link } from 'react-router-dom';
import { Trophy } from '@phosphor-icons/react';
import FlagBadge from './FlagBadge';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function TeamCard({ team }) {
  return (
    <Link
      to={`/teams/${team.slug}`}
      className="group card-lift flex items-center gap-4 rounded-2xl bg-surface-raised/60 px-5 py-4 ring-1 ring-white/8 transition-premium hover:bg-white/3 hover:ring-pitch/25 active:scale-[0.99]"
    >
      <FlagBadge code={team.code} size="lg" />
      <div className="min-w-0 flex-1">
        <h3
          className="truncate font-black text-white"
          style={{ fontFamily: DISPLAY, letterSpacing: '-0.02em', fontSize: '1.05rem' }}
        >
          {team.name}
        </h3>
        <p className="text-xs text-white/40">{team.confederation}</p>
      </div>
      <div className="text-right shrink-0">
        {team.titles > 0 ? (
          <div className="flex items-center gap-1.5 text-pitch">
            <Trophy size={13} weight="fill" />
            <span
              className="font-black"
              style={{ fontFamily: DISPLAY, fontSize: '1.15rem', letterSpacing: '-0.03em' }}
            >
              {team.titles}
            </span>
          </div>
        ) : (
          <span className="text-xs text-white/30">{team.appearances} apps</span>
        )}
      </div>
    </Link>
  );
}
