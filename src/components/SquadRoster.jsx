const POSITIONS = ['GK', 'DEF', 'MID', 'FWD'];
const POSITION_LABELS = { GK: 'Goalkeepers', DEF: 'Defenders', MID: 'Midfielders', FWD: 'Forwards' };

export default function SquadRoster({ players }) {
  if (!players?.length) return null;

  return (
    <div className="space-y-5">
      {POSITIONS.map((pos) => {
        const group = players.filter((p) => p.position === pos);
        if (!group.length) return null;
        return (
          <div key={pos}>
            <div className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-pitch/70">
              {POSITION_LABELS[pos]}
            </div>
            <div className="divide-y divide-white/[0.045] overflow-hidden rounded-xl ring-1 ring-white/8">
              {group.map((player) => (
                <div
                  key={player.name}
                  className="flex items-center gap-3 bg-surface-raised/40 px-4 py-2.5"
                >
                  {player.number != null && (
                    <span className="w-6 shrink-0 text-right font-mono text-xs text-white/25">
                      {player.number}
                    </span>
                  )}
                  <span className="flex-1 text-sm font-medium text-white">{player.name}</span>
                  {player.club && (
                    <span className="hidden shrink-0 text-right text-xs text-white/35 sm:block">
                      {player.club}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
