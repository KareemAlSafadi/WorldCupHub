import FlagBadge from './FlagBadge';

export default function StandingsTable({ standings }) {
  if (!standings || Object.keys(standings).length === 0) {
    return null;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {Object.entries(standings).map(([group, rows]) => (
        <div key={group} className="overflow-hidden rounded-2xl ring-1 ring-white/8">
          <div className="border-b border-white/8 bg-white/3 px-5 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-pitch">
              {group.length > 2 ? group : `Group ${group}`}
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="border-b border-white/8 text-left text-[10px] uppercase tracking-wider text-white/40">
                  <th className="sticky left-0 bg-surface-raised px-4 py-3">Team</th>
                  <th className="px-2 py-3 text-center">P</th>
                  <th className="px-2 py-3 text-center">W</th>
                  <th className="px-2 py-3 text-center">D</th>
                  <th className="px-2 py-3 text-center">L</th>
                  <th className="px-2 py-3 text-center">GF</th>
                  <th className="px-2 py-3 text-center">GA</th>
                  <th className="px-2 py-3 text-center">GD</th>
                  <th className="px-4 py-3 text-center font-semibold text-white">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {rows.map((row, idx) => (
                  <tr
                    key={row.code}
                    className={idx < 2 ? 'bg-pitch/5' : 'bg-surface-raised/30'}
                  >
                    <td className="sticky left-0 bg-inherit px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <FlagBadge code={row.code} size="sm" />
                        <span className="font-medium text-white">{row.team}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 text-center text-white/70">{row.played}</td>
                    <td className="px-2 py-3 text-center text-white/70">{row.won}</td>
                    <td className="px-2 py-3 text-center text-white/70">{row.drawn}</td>
                    <td className="px-2 py-3 text-center text-white/70">{row.lost}</td>
                    <td className="px-2 py-3 text-center text-white/70">{row.gf}</td>
                    <td className="px-2 py-3 text-center text-white/70">{row.ga}</td>
                    <td className="px-2 py-3 text-center text-white/70">
                      {row.gd > 0 ? `+${row.gd}` : row.gd}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-white">{row.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
