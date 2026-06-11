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
    month: 'short',
    day: 'numeric',
    year: 'numeric',
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

export default function FixturesList({ matches }) {
  const grouped = STAGE_ORDER.reduce((acc, stage) => {
    const stageMatches = matches.filter((m) => m.stage === stage);
    if (stageMatches.length) acc[stage] = stageMatches;
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([stage, stageMatches]) => (
        <section key={stage}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-pitch">
            {stage}
          </h3>
          <div className="divide-y divide-white/8 overflow-hidden rounded-2xl ring-1 ring-white/8">
            {stageMatches.map((match) => (
              <div
                key={match.id}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-surface-raised/40 px-5 py-4 transition-premium hover:bg-white/3 md:px-6"
              >
                <div className="flex items-center justify-end gap-3">
                  <span className="hidden text-right text-sm font-medium text-white sm:block">
                    {match.homeTeam}
                  </span>
                  <FlagBadge code={match.homeCode} />
                </div>

                <div className="flex min-w-[100px] flex-col items-center gap-1">
                  <ScoreDisplay match={match} />
                  <span className="text-[10px] text-white/40">
                    {formatDate(match.date)}
                    {match.group ? ` · Grp ${match.group}` : ''}
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
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
