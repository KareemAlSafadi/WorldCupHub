import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe, Medal, Trophy } from '@phosphor-icons/react';
import FlagBadge from '../components/FlagBadge';
import TournamentCard from '../components/TournamentCard';
import usePageTitle from '../lib/usePageTitle';
import useInView from '../lib/useInView';
import useCountUp from '../lib/useCountUp';
import { getAllTournaments, getStats } from '../lib/data';
import { useTodayMatches } from '../lib/liveScores';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function Home() {
  usePageTitle();
  const stats = getStats();
  const featured = getAllTournaments().filter((t) =>
    [2026, 2022, 2018, 1930].includes(t.year)
  );
  const { matches: todayMatches, lastUpdated } = useTodayMatches();
  const todayLabel = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const updatedAgo = useUpdatedAgo(lastUpdated);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative py-20 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[560px] w-[560px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #1FA463 0%, transparent 70%)' }}
        />

        <div className="animate-fade-up grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-6">
          <div>
            <div className="mb-6 font-mono text-[0.63rem] tracking-[0.2em] text-pitch/60">
              1930 — 2026
            </div>
            <h1
              className="max-w-2xl font-black text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2.8rem, 5.2vw, 5.2rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
              }}
            >
              The Beautiful<br />
              Game, In<br />
              <span className="text-pitch">Every Detail.</span>
            </h1>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-white/50">
              Nearly a century of World Cup history — from Uruguay 1930 to the
              2026 tournament underway across North America.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tournaments"
                className="inline-flex items-center gap-2 rounded-full bg-pitch px-6 py-3 text-sm font-semibold text-white transition-premium hover:bg-pitch-dim active:scale-[0.98]"
              >
                Browse Tournaments
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/15">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </Link>
              <Link
                to="/teams"
                className="inline-flex items-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/10 transition-premium hover:bg-white/10 active:scale-[0.98]"
              >
                Explore Teams
              </Link>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative h-[420px] overflow-hidden rounded-2xl">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 40%, rgba(31,164,99,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, rgba(31,164,99,0.08) 0%, transparent 50%), linear-gradient(135deg, #121820 0%, #0d1a14 50%, #0B0F14 100%)',
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(31,164,99,0.4) 40px, rgba(31,164,99,0.4) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(31,164,99,0.4) 40px, rgba(31,164,99,0.4) 41px)',
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to bottom, transparent 45%, #0B0F14 100%)',
                }}
              />
              <Link
                to="/tournaments/2026"
                className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-pitch/35 bg-pitch/15 px-3 py-1.5 transition-premium hover:bg-pitch/25"
              >
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-pitch" />
                <span className="font-mono text-[0.6rem] font-semibold tracking-[0.08em] text-pitch">
                  LIVE NOW — 2026
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="overflow-hidden border-y border-white/[0.055] py-3">
        <div className="animate-marquee">
          <span className="pr-20 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/[0.15]">
            Uruguay 1930 &nbsp;·&nbsp; Italy 1934 &nbsp;·&nbsp; France 1938
            &nbsp;·&nbsp; Brazil 1950 &nbsp;·&nbsp; Switzerland 1954 &nbsp;·&nbsp;
            Sweden 1958 &nbsp;·&nbsp; Chile 1962 &nbsp;·&nbsp; England 1966
            &nbsp;·&nbsp; Mexico 1970 &nbsp;·&nbsp; West Germany 1974 &nbsp;·&nbsp;
            Argentina 1978 &nbsp;·&nbsp; Spain 1982 &nbsp;·&nbsp; Mexico 1986
            &nbsp;·&nbsp; Italy 1990 &nbsp;·&nbsp; USA 1994 &nbsp;·&nbsp; France
            1998 &nbsp;·&nbsp; Korea/Japan 2002 &nbsp;·&nbsp; Germany 2006
            &nbsp;·&nbsp; South Africa 2010 &nbsp;·&nbsp; Brazil 2014 &nbsp;·&nbsp;
            Russia 2018 &nbsp;·&nbsp; Qatar 2022 &nbsp;·&nbsp; North America 2026
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/[0.15]">
            Uruguay 1930 &nbsp;·&nbsp; Italy 1934 &nbsp;·&nbsp; France 1938
            &nbsp;·&nbsp; Brazil 1950 &nbsp;·&nbsp; Switzerland 1954 &nbsp;·&nbsp;
            Sweden 1958 &nbsp;·&nbsp; Chile 1962 &nbsp;·&nbsp; England 1966
            &nbsp;·&nbsp; Mexico 1970 &nbsp;·&nbsp; West Germany 1974 &nbsp;·&nbsp;
            Argentina 1978 &nbsp;·&nbsp; Spain 1982 &nbsp;·&nbsp; Mexico 1986
            &nbsp;·&nbsp; Italy 1990 &nbsp;·&nbsp; USA 1994 &nbsp;·&nbsp; France
            1998 &nbsp;·&nbsp; Korea/Japan 2002 &nbsp;·&nbsp; Germany 2006
            &nbsp;·&nbsp; South Africa 2010 &nbsp;·&nbsp; Brazil 2014 &nbsp;·&nbsp;
            Russia 2018 &nbsp;·&nbsp; Qatar 2022 &nbsp;·&nbsp; North America 2026
          </span>
        </div>
      </div>

      {/* ── TODAY'S MATCHES ── */}
      {todayMatches.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-pitch animate-pulse-soft" />
                <span className="font-mono text-[0.6rem] tracking-[0.2em] text-pitch/70">
                  {todayLabel} · 2026 World Cup
                </span>
              </div>
              <h2
                className="font-black text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Today's Matches
              </h2>
              {updatedAgo && (
                <p className="mt-1 text-[0.6rem] text-white/25">Updated {updatedAgo}</p>
              )}
            </div>
            <Link
              to="/tournaments/2026"
              className="text-sm text-white/40 transition-premium hover:text-white"
            >
              All fixtures →
            </Link>
          </div>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
            {todayMatches.map((match) => (
              <TodayMatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {/* ── BENTO GRID ── */}
      <section className="py-20 md:py-32">
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(6, minmax(0, 1fr))', gridAutoFlow: 'dense' }}
        >
          {/* A: Editions — col-span-4 row-span-2 */}
          <div
            className="relative overflow-hidden rounded-2xl bg-surface-raised ring-1 ring-white/8 col-span-6 md:col-span-4 md:row-span-2"
            style={{ minHeight: '220px' }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 50%, rgba(31,164,99,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 50%)',
              }}
            />
            <div className="relative p-8 md:p-10">
              <div
                className="font-black leading-none text-white"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(5rem, 11vw, 9.5rem)',
                  letterSpacing: '-0.05em',
                }}
              >
                <AnimatedStat value={stats.editions} />
              </div>
              <div className="mt-3 text-sm font-medium tracking-wide text-white/35">
                Editions of the World Cup
              </div>
              <div className="mt-12 text-[0.6rem] tracking-widest text-white/18">
                1930 – 2026
              </div>
            </div>
          </div>

          {/* B: Most titles — col-span-2 */}
          <div className="col-span-3 rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8 transition-premium hover:ring-pitch/35 md:col-span-2">
            <Trophy size={20} weight="light" className="text-pitch" />
            <div
              className="mt-5 font-black leading-none text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                letterSpacing: '-0.04em',
              }}
            >
              <AnimatedStat value={stats.mostTitlesCount} />
            </div>
            <div className="mt-2 text-xs text-white/35">{stats.mostTitlesTeam} titles</div>
          </div>

          {/* C: 2026 Live — col-span-2 */}
          <Link
            to="/tournaments/2026"
            className="col-span-3 rounded-2xl p-6 ring-1 ring-pitch/28 transition-premium hover:ring-pitch/55 active:scale-[0.99] md:col-span-2"
            style={{ background: 'rgba(31,164,99,0.1)' }}
          >
            <div className="flex items-center gap-2">
              <Medal size={20} weight="light" className="text-pitch" />
              <span className="animate-pulse-soft rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-pitch"
                style={{ background: 'rgba(31,164,99,0.18)' }}>
                Live
              </span>
            </div>
            <div
              className="mt-5 font-bold leading-tight text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: '1.35rem',
                letterSpacing: '-0.02em',
              }}
            >
              World Cup 2026
            </div>
            <div className="mt-1.5 text-xs text-white/35">USA · Canada · Mexico</div>
          </Link>

          {/* D: Latest champion — col-span-3 */}
          <div className="col-span-3 rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8 transition-premium hover:ring-pitch/35">
            <div className="mb-3 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white/28">
              {stats.latestYear} Champions
            </div>
            <div
              className="font-black text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                letterSpacing: '-0.03em',
              }}
            >
              {stats.latestChampion}
            </div>
            <div className="mt-1.5 text-xs text-white/30">Qatar · Final vs France</div>
          </div>

          {/* E: Host nations — col-span-3 */}
          <div className="col-span-3 rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8 transition-premium hover:ring-pitch/35">
            <Globe size={20} weight="light" className="text-pitch" />
            <div
              className="mt-5 font-black text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                letterSpacing: '-0.03em',
              }}
            >
              3 Nations
            </div>
            <div className="mt-1.5 text-xs text-white/30">USA · Canada · Mexico co-hosting</div>
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURNAMENTS ── */}
      <section className="pb-20 md:pb-32">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-shrink-0 lg:sticky lg:top-24 lg:w-44">
            <h2
              className="font-black leading-tight text-white"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(1.5rem, 2.2vw, 2rem)',
                letterSpacing: '-0.03em',
              }}
            >
              Iconic<br />Tournaments
            </h2>
            <Link
              to="/tournaments"
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-pitch transition-premium hover:text-pitch-dim"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="stagger-children grid flex-1 gap-4 sm:grid-cols-2">
            {featured.map((t) => (
              <TournamentCard key={t.year} tournament={t} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="pb-20 md:pb-32">
        <div className="rounded-3xl bg-surface-overlay px-8 py-16 text-center ring-1 ring-white/[0.07] md:px-16 md:py-20">
          <div
            className="mx-auto max-w-3xl font-black leading-tight text-white"
            style={{
              fontFamily: DISPLAY,
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              letterSpacing: '-0.04em',
            }}
          >
            96 years. 22 Tournaments.<br />
            <span className="text-pitch">Infinite Stories.</span>
          </div>
          <p className="mx-auto mt-5 max-w-[44ch] text-base leading-relaxed text-white/45">
            Every goal, every result, every champion — the complete archive of
            World Cup history.
          </p>
          <Link
            to="/tournaments"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-pitch px-8 py-3.5 text-sm font-semibold text-white transition-premium hover:bg-pitch-dim active:scale-[0.98]"
          >
            Explore the Archive
            <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>
      </section>

    </div>
  );
}

function TodayMatchCard({ match }) {
  const upcoming = match.homeScore == null && !match.liveNow;
  const finished = match.homeScore != null && !match.liveNow;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-4 ring-1 transition-premium ${
        match.liveNow
          ? 'bg-pitch/10 ring-pitch/35'
          : 'bg-surface-raised ring-white/8'
      }`}
    >
      {/* Status badge — top-right */}
      {match.liveNow && (
        <div className="absolute right-3 top-3 flex items-center gap-1">
          <span className="h-1 w-1 rounded-full bg-red-400 animate-pulse-soft" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
            {match.minute != null ? `${match.minute}'` : 'Live'}
          </span>
        </div>
      )}
      {finished && (
        <div className="absolute right-3 top-3">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-white/25">FT</span>
        </div>
      )}

      <div className="mb-3 text-[0.58rem] font-medium uppercase tracking-[0.12em] text-white/30">
        {match.group ? `Group ${match.group}` : match.stage}
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 flex-col items-center gap-1.5">
          <FlagBadge code={match.homeCode} size="lg" />
          <span className={`text-center text-[0.65rem] font-medium leading-tight ${
            finished && match.homeScore > match.awayScore ? 'text-white/80' : 'text-white/50'
          }`}>
            {match.homeTeam}
          </span>
        </div>

        <div className="flex flex-col items-center px-1">
          {upcoming ? (
            <span
              className="font-black text-pitch"
              style={{ fontFamily: DISPLAY, fontSize: '1.2rem', letterSpacing: '-0.04em' }}
            >
              VS
            </span>
          ) : (
            <span
              className={`font-black ${match.liveNow ? 'text-white' : 'text-white/90'}`}
              style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.05em' }}
            >
              {match.homeScore}–{match.awayScore}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col items-center gap-1.5">
          <FlagBadge code={match.awayCode} size="lg" />
          <span className={`text-center text-[0.65rem] font-medium leading-tight ${
            finished && match.awayScore > match.homeScore ? 'text-white/80' : 'text-white/50'
          }`}>
            {match.awayTeam}
          </span>
        </div>
      </div>
    </div>
  );
}

function AnimatedStat({ value }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const display = useCountUp(value, { enabled: inView });
  return <span ref={ref}>{display}</span>;
}

function useUpdatedAgo(ts) {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!ts) return;
    const tick = () => {
      const mins = Math.floor((Date.now() - ts) / 60000);
      setLabel(mins < 1 ? 'just now' : `${mins}m ago`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [ts]);
  return label;
}
