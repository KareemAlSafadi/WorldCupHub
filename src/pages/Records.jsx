import { Link } from 'react-router-dom';
import FlagBadge from '../components/FlagBadge';
import usePageTitle from '../lib/usePageTitle';
import { getAllTimeScorers, getAllTournaments, getTeamSlugByName } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function Records() {
  usePageTitle('Records');
  const tournaments = getAllTournaments();
  const allTimeScorers = getAllTimeScorers();
  const finals = tournaments.filter((t) => t.winner);

  const titles = {};
  finals.forEach((t) => {
    if (!titles[t.winner]) {
      titles[t.winner] = { team: t.winner, code: t.winnerCode, years: [] };
    }
    titles[t.winner].years.push(t.year);
  });
  const titleBoard = Object.values(titles).sort(
    (a, b) => b.years.length - a.years.length || a.team.localeCompare(b.team)
  );

  const scorers = tournaments.filter((t) => t.topScorer);
  const topChampion = titleBoard[0];

  return (
    <div className="animate-fade-up">

      {/* Hero */}
      <section className="pt-10 pb-16 md:pb-20">
        <div className="mb-3 font-mono text-[0.63rem] tracking-[0.2em] text-pitch/60">
          All-time · Since 1930
        </div>
        <h1
          className="font-black text-white"
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          The All-Time<br />Record Book.
        </h1>
        <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/45">
          Every champion, every golden boot, every final — 96 years of World Cup history
          in numbers.
        </p>
      </section>

      {/* Featured champion card */}
      {topChampion && (
        <Link
          to={`/teams/${getTeamSlugByName(topChampion.team)}`}
          className="group mb-10 block overflow-hidden rounded-3xl ring-1 ring-white/8 transition-premium hover:ring-pitch/35"
          style={{
            background:
              'radial-gradient(ellipse at 10% 50%, rgba(31,164,99,0.12) 0%, transparent 55%), linear-gradient(135deg, #121820 0%, #0d1a14 60%, #0B0F14 100%)',
          }}
        >
          <div className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
            <div className="shrink-0">
              <FlagBadge code={topChampion.code} size="lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-1 text-[0.6rem] uppercase tracking-[0.18em] text-pitch/60">
                Most world cup titles
              </p>
              <h2
                className="font-black text-white leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                {topChampion.team}
              </h2>
              <p className="mt-2 text-sm text-white/35">
                {topChampion.years.join(' · ')}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span
                className="font-black text-pitch leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(3.5rem, 7vw, 6rem)',
                  letterSpacing: '-0.05em',
                }}
              >
                {topChampion.years.length}
              </span>
              <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/30 mt-1">
                titles
              </p>
            </div>
          </div>
        </Link>
      )}

      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <section>
          <h2
            className="mb-5 font-black text-white/60"
            style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
          >
            Titles board
          </h2>
          <div className="divide-y divide-white/[0.055] overflow-hidden rounded-2xl ring-1 ring-white/8">
            {titleBoard.map((row, idx) => (
              <Link
                key={row.team}
                to={`/teams/${getTeamSlugByName(row.team)}`}
                className="flex items-center gap-4 bg-surface-raised/40 px-5 py-4 transition-premium hover:bg-white/3"
              >
                <span
                  className="w-7 font-black text-white/20 shrink-0"
                  style={{ fontFamily: DISPLAY, fontSize: '1.1rem', letterSpacing: '-0.03em' }}
                >
                  {idx + 1}
                </span>
                <FlagBadge code={row.code} />
                <span className="flex-1 font-semibold text-white text-sm">{row.team}</span>
                <span className="hidden text-xs text-white/30 sm:block">
                  {row.years.join(' · ')}
                </span>
                <span className="flex items-center gap-1.5 shrink-0">
                  <span
                    className="font-black text-pitch"
                    style={{ fontFamily: DISPLAY, fontSize: '1.3rem', letterSpacing: '-0.03em' }}
                  >
                    {row.years.length}
                  </span>
                  <span className="text-[0.55rem] uppercase tracking-wider text-white/30">
                    {row.years.length === 1 ? 'title' : 'titles'}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <h2
            className="mb-5 mt-12 font-black text-white/60"
            style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
          >
            Golden boot ledger
          </h2>
          <div className="divide-y divide-white/[0.055] overflow-hidden rounded-2xl ring-1 ring-white/8">
            {scorers.map((t) => (
              <div key={t.year} className="flex items-center gap-4 bg-surface-raised/40 px-5 py-3">
                <span
                  className="font-black text-white shrink-0"
                  style={{ fontFamily: DISPLAY, fontSize: '1.05rem', letterSpacing: '-0.03em' }}
                >
                  {t.year}
                </span>
                <span className="flex-1 text-sm text-white/55">{t.topScorer}</span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className="mb-5 font-black text-white/60"
            style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
          >
            Finals history
          </h2>
          <div className="divide-y divide-white/[0.055] overflow-hidden rounded-2xl ring-1 ring-white/8">
            {finals.map((t) => (
              <Link
                key={t.year}
                to={`/tournaments/${t.year}`}
                className="block bg-surface-raised/40 px-5 py-3.5 transition-premium hover:bg-white/3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-black text-white"
                    style={{ fontFamily: DISPLAY, fontSize: '1.05rem', letterSpacing: '-0.03em' }}
                  >
                    {t.year}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wider text-white/25">
                    {t.host}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center gap-2 text-xs">
                  <FlagBadge code={t.winnerCode} size="sm" />
                  <span className="font-semibold text-white">{t.winner}</span>
                  <span className="text-white/35">def.</span>
                  <FlagBadge code={t.runnerUpCode} size="sm" />
                  <span className="text-white/55">{t.runnerUp}</span>
                </div>
              </Link>
            ))}
          </div>

          <h2
            className="mb-5 mt-12 font-black text-white/60"
            style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
          >
            All-time goalscorers
          </h2>
          <div className="divide-y divide-white/[0.055] overflow-hidden rounded-2xl ring-1 ring-white/8">
            {allTimeScorers.map((scorer, idx) => (
              <div key={scorer.name} className="flex items-center gap-4 bg-surface-raised/40 px-5 py-3">
                <span
                  className="w-6 font-black text-white/20 shrink-0"
                  style={{ fontFamily: DISPLAY, fontSize: '1rem', letterSpacing: '-0.03em' }}
                >
                  {idx + 1}
                </span>
                <FlagBadge code={scorer.code} size="sm" />
                <span className="flex-1 truncate text-sm font-medium text-white">
                  {scorer.name}
                </span>
                <span className="hidden text-xs text-white/35 sm:block">{scorer.span}</span>
                <span
                  className="font-black text-pitch shrink-0"
                  style={{ fontFamily: DISPLAY, fontSize: '1.3rem', letterSpacing: '-0.03em' }}
                >
                  {scorer.goals}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
