import FlagBadge from './FlagBadge';

const STAGE_ORDER = [
  'Group',
  'Second round',
  'Round of 16',
  'Quarter-final',
  'Semi-final',
  'Third place',
  'Final',
];

function formatDate(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function ScoreDisplay({ match }) {
  const upcoming = match.homeScore == null || match.awayScore == null;

  if (upcoming) {
    return <span className="font-bold text-pitch animate-pulse-soft">vs</span>;
  }

  const score = `${match.homeScore} - ${match.awayScore}`;
  if (match.pens) {
    return (
      <span className="text-center">
        <span className="font-bold text-white">{score}</span>
        <span className="mt-0.5 block text-[10px] text-white/45">({match.pens} pens)</span>
      </span>
    );
  }
  if (match.extra) {
    return (
      <span className="text-center">
        <span className="font-bold text-white">{score}</span>
        <span className="mt-0.5 block text-[10px] text-white/45">({match.extra})</span>
      </span>
    );
  }
  return <span className="font-bold text-white">{score}</span>;
}

function MatchRow({ match, showDate }) {
  const isLive = !!match.liveNow;
  return (
    <div
      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-4 transition-premium hover:bg-white/3 md:px-6 ${
        isLive ? 'bg-pitch/8' : 'bg-surface-raised/40'
      }`}
    >
      <div className="flex items-center justify-end gap-3">
        <span className="hidden text-right text-sm font-medium text-white sm:block">
          {match.homeTeam}
        </span>
        <FlagBadge code={match.homeCode} />
      </div>

      <div className="flex min-w-[100px] flex-col items-center gap-1">
        {isLive && (
          <span className="mb-0.5 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-red-400">
            <span className="h-1 w-1 rounded-full bg-red-400 animate-pulse-soft" />
            Live
          </span>
        )}
        <ScoreDisplay match={match} />
        <span className="text-[10px] text-white/40">
          {showDate ? formatDate(match.date) : (match.group ? `Grp ${match.group}` : '')}
        </span>
        {match.venue && (
          <span className="text-[10px] text-white/30">{match.venue}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <FlagBadge code={match.awayCode} />
        <span className="hidden text-sm font-medium text-white sm:block">
          {match.awayTeam}
        </span>
      </div>
    </div>
  );
}

function MatchBlock({ matches, showDate = false }) {
  return (
    <div className="divide-y divide-white/8 overflow-hidden rounded-2xl ring-1 ring-white/8">
      {matches.map((match) => (
        <MatchRow key={match.id} match={match} showDate={showDate} />
      ))}
    </div>
  );
}

export default function FixturesList({ matches }) {
  const grouped = STAGE_ORDER.reduce((acc, stage) => {
    const stageMatches = matches.filter((m) => m.stage === stage);
    if (stageMatches.length) acc[stage] = stageMatches;
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([stage, stageMatches]) => {
        // Group stage: sub-group by date for readability
        if (stage === 'Group') {
          const byDate = stageMatches.reduce((acc, m) => {
            (acc[m.date] = acc[m.date] || []).push(m);
            return acc;
          }, {});
          const hasMultipleDates = Object.keys(byDate).length > 1;

          return (
            <section key={stage}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-pitch">
                {stage}
              </h3>
              {hasMultipleDates ? (
                <div className="space-y-5">
                  {Object.entries(byDate).map(([date, dateMatches]) => (
                    <div key={date}>
                      <div className="mb-2 px-1 text-[0.6rem] font-medium uppercase tracking-[0.15em] text-white/30">
                        {formatDate(date)}
                      </div>
                      <MatchBlock matches={dateMatches} />
                    </div>
                  ))}
                </div>
              ) : (
                <MatchBlock matches={stageMatches} />
              )}
            </section>
          );
        }

        return (
          <section key={stage}>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-pitch">
              {stage}
            </h3>
            <MatchBlock matches={stageMatches} showDate />
          </section>
        );
      })}
    </div>
  );
}
