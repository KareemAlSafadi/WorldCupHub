import FlagBadge from './FlagBadge';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

// 48-team WC: top 2 from each of 12 groups (24 teams) + 8 best thirds = 32
const AUTO_SPOTS = 2;
const BEST_THIRD_SPOTS = 8;
const TOTAL_GROUPS = 12;

function getRowStatus(rows, idx) {
  const row = rows[idx];
  const remaining = 3 - row.played;

  if (idx < AUTO_SPOTS) {
    // In top 2 — check if 3rd can still overtake
    const third = rows[AUTO_SPOTS];
    const thirdMax = third ? third.points + (3 - third.played) * 3 : 0;
    if (thirdMax < row.points) return 'through'; // mathematically safe
    return 'leading';
  }
  if (idx === AUTO_SPOTS) {
    // 3rd place — may advance as best third
    const fourth = rows[3];
    const fourthMax = fourth ? fourth.points + (3 - fourth.played) * 3 : 0;
    if (fourthMax < row.points) return 'third-safe'; // clinched 3rd
    return 'third';
  }
  // 4th place — check if eliminated
  const thirdPts = rows[AUTO_SPOTS]?.points ?? 0;
  const ownMax = row.points + remaining * 3;
  if (ownMax < thirdPts) return 'eliminated';
  return 'danger';
}

const STATUS_STYLES = {
  through:      { label: 'Q',       cls: 'bg-pitch/20 text-pitch border-pitch/30' },
  leading:      { label: '↑',       cls: 'bg-pitch/10 text-pitch/70 border-pitch/20' },
  'third-safe': { label: '3rd',     cls: 'bg-amber-500/15 text-amber-400 border-amber-500/25' },
  third:        { label: '~3rd',    cls: 'bg-amber-500/10 text-amber-400/70 border-amber-500/15' },
  danger:       { label: '!',       cls: 'bg-red-500/10 text-red-400/80 border-red-500/20' },
  eliminated:   { label: 'Out',     cls: 'bg-white/5 text-white/30 border-white/10' },
};

export default function QualificationPanel({ standings }) {
  if (!standings) return null;

  const groups = Object.entries(standings).sort(([a], [b]) => a.localeCompare(b));

  // Collect all third-placed teams for the best-third mini-table
  const thirds = groups
    .map(([group, rows]) => {
      const row = rows[AUTO_SPOTS];
      if (!row) return null;
      const status = getRowStatus(rows, AUTO_SPOTS);
      return { group, ...row, status };
    })
    .filter(Boolean)
    .sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf);

  return (
    <div className="space-y-10">
      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.12em]">
        <span className="flex items-center gap-1.5 text-pitch"><span className="inline-block rounded border border-pitch/30 bg-pitch/20 px-1.5 py-0.5">Q</span> Qualified</span>
        <span className="flex items-center gap-1.5 text-pitch/60"><span className="inline-block rounded border border-pitch/20 bg-pitch/10 px-1.5 py-0.5">↑</span> Leading</span>
        <span className="flex items-center gap-1.5 text-amber-400"><span className="inline-block rounded border border-amber-500/25 bg-amber-500/15 px-1.5 py-0.5">3rd</span> Best Third</span>
        <span className="flex items-center gap-1.5 text-red-400/80"><span className="inline-block rounded border border-red-500/20 bg-red-500/10 px-1.5 py-0.5">!</span> In danger</span>
        <span className="flex items-center gap-1.5 text-white/30"><span className="inline-block rounded border border-white/10 bg-white/5 px-1.5 py-0.5">Out</span> Eliminated</span>
      </div>

      {/* Groups grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map(([group, rows]) => (
          <div key={group} className="rounded-2xl bg-surface-raised ring-1 ring-white/8">
            <div className="px-4 pt-4 pb-2">
              <span
                className="font-black text-white/80"
                style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.02em' }}
              >
                Group {group}
              </span>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {rows.map((row, idx) => {
                const status = getRowStatus(rows, idx);
                const s = STATUS_STYLES[status];
                return (
                  <div
                    key={row.code}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <span className="w-4 font-mono text-[0.65rem] text-white/25">{idx + 1}</span>
                    <FlagBadge code={row.code} />
                    <span className="flex-1 truncate text-sm font-medium text-white/80">{row.team}</span>
                    <span className="font-mono text-xs text-white/35">{row.points}pt</span>
                    <span className={`rounded border px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider ${s.cls}`}>
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Best third-placed teams */}
      {thirds.length > 0 && (
        <div>
          <h3
            className="mb-4 font-black text-white"
            style={{ fontFamily: DISPLAY, fontSize: '1.1rem', letterSpacing: '-0.03em' }}
          >
            Best Third-Placed Teams
            <span className="ml-2 font-mono text-[0.65rem] font-normal tracking-widest text-white/30">
              Top {BEST_THIRD_SPOTS} of {TOTAL_GROUPS} advance
            </span>
          </h3>
          <div className="overflow-hidden rounded-2xl ring-1 ring-white/8">
            <div className="divide-y divide-white/[0.05]">
              {thirds.map((row, idx) => {
                const willAdvance = idx < BEST_THIRD_SPOTS;
                return (
                  <div
                    key={row.code}
                    className={`flex items-center gap-4 px-5 py-3 ${willAdvance ? 'bg-pitch/5' : 'bg-surface-raised/40'}`}
                  >
                    <span
                      className={`w-5 font-mono text-xs ${willAdvance ? 'text-pitch' : 'text-white/25'}`}
                    >
                      {idx + 1}
                    </span>
                    <FlagBadge code={row.code} />
                    <span className="flex-1 text-sm font-medium text-white/80">{row.team}</span>
                    <span className="font-mono text-[0.65rem] text-white/35">Grp {row.group}</span>
                    <span className="w-8 text-right font-mono text-xs text-white/50">{row.points}pt</span>
                    <span className="w-10 text-right font-mono text-xs text-white/35">{row.gd > 0 ? '+' : ''}{row.gd} GD</span>
                    {willAdvance && idx === BEST_THIRD_SPOTS - 1 && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">Last</span>
                    )}
                    {!willAdvance && idx === BEST_THIRD_SPOTS && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-red-400/60">Out</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="mt-3 text-[0.6rem] text-white/25">
            Rankings update live from current group standings. Final positions determined after all Matchday 3 games.
          </p>
        </div>
      )}
    </div>
  );
}
