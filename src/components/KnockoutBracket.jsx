import FlagBadge from './FlagBadge';

function MatchCard({ match }) {
  if (!match) return null;

  const winnerHome = match.homeScore > match.awayScore || match.pens;
  const winnerAway = match.awayScore > match.homeScore && !match.pens;

  return (
    <div className="min-w-[200px] overflow-hidden rounded-xl bg-surface-raised ring-1 ring-white/10">
      <div
        className={`flex items-center justify-between gap-2 border-b border-white/6 px-3 py-2.5 ${
          winnerHome ? 'bg-pitch/10' : ''
        }`}
      >
        <span className="truncate text-xs font-medium text-white">{match.homeTeam}</span>
        <div className="flex items-center gap-2">
          <FlagBadge code={match.homeCode} size="sm" />
          <span className="text-sm font-bold text-white">{match.homeScore}</span>
        </div>
      </div>
      <div
        className={`flex items-center justify-between gap-2 px-3 py-2.5 ${
          winnerAway ? 'bg-pitch/10' : ''
        }`}
      >
        <span className="truncate text-xs font-medium text-white">{match.awayTeam}</span>
        <div className="flex items-center gap-2">
          <FlagBadge code={match.awayCode} size="sm" />
          <span className="text-sm font-bold text-white">{match.awayScore}</span>
        </div>
      </div>
      {(match.pens || match.extra) && (
        <div className="border-t border-white/6 px-3 py-1.5 text-center text-[10px] text-white/45">
          {match.pens ? `Penalties: ${match.pens}` : match.extra}
        </div>
      )}
    </div>
  );
}

export default function KnockoutBracket({ bracket, matches }) {
  if (!bracket?.length) return null;

  const matchMap = Object.fromEntries(matches.map((m) => [m.id, m]));

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max gap-8">
        {bracket.map((round) => (
          <div key={round.round} className="flex flex-col gap-4">
            <h3 className="text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-pitch">
              {round.round}
            </h3>
            <div className="flex flex-1 flex-col justify-around gap-4">
              {round.matches.map((id) => (
                <MatchCard key={id} match={matchMap[id]} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
