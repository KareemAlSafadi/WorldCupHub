import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Trophy } from '@phosphor-icons/react';
import EmptyState from '../components/EmptyState';
import FlagBadge from '../components/FlagBadge';
import SquadRoster from '../components/SquadRoster';
import usePageTitle from '../lib/usePageTitle';
import { getTeamBySlug, getSquad, getTeamSquadYears, getTeamMatchStats } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function TeamDetail() {
  const { slug } = useParams();
  const team = getTeamBySlug(slug);
  usePageTitle(team?.name);

  if (!team) {
    return (
      <EmptyState
        title="Team not found"
        description="We couldn't find that national team. Browse all teams to explore."
      />
    );
  }

  return (
    <div className="animate-fade-up">
      <Link
        to="/teams"
        className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition-premium hover:text-white"
      >
        <ArrowLeft size={16} />
        All teams
      </Link>

      {/* Hero card */}
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-surface-raised ring-1 ring-white/8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              team.titles > 0
                ? 'radial-gradient(ellipse at 0% 50%, rgba(31,164,99,0.1) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)',
          }}
        />
        <div className="relative flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div className="shrink-0">
            <FlagBadge code={team.code} size="lg" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white/30">
              {team.confederation}
            </p>
            <h1
              className="font-black text-white leading-none"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                letterSpacing: '-0.04em',
              }}
            >
              {team.name}
            </h1>
            <p className="mt-2 text-sm text-white/35 font-mono">{team.code}</p>
          </div>
          {team.titles > 0 && (
            <div className="flex items-center gap-3 rounded-2xl bg-pitch/15 px-6 py-4 ring-1 ring-pitch/25 shrink-0">
              <Trophy size={24} weight="fill" className="text-pitch" />
              <div>
                <p
                  className="font-black text-white leading-none"
                  style={{ fontFamily: DISPLAY, fontSize: '2rem', letterSpacing: '-0.04em' }}
                >
                  {team.titles}
                </p>
                <p className="text-[0.65rem] text-white/45 uppercase tracking-wider mt-0.5">
                  {team.titles === 1 ? 'title' : 'titles'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <StatCard label="Appearances" value={team.appearances} />
        <StatCard label="Best finish" value={team.bestFinish} />
        <StatCard label="FIFA code" value={team.code} mono />
      </div>

      <MatchRecordSection slug={team.slug} />

      {/* Timeline */}
      <section>
        <h2
          className="mb-6 font-black text-white/70"
          style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
        >
          World Cup timeline
        </h2>

        {team.tournamentResults?.length > 0 ? (
          <div className="divide-y divide-white/[0.055] overflow-hidden rounded-2xl ring-1 ring-white/8">
            {team.tournamentResults.map((result) => (
              <Link
                key={`${result.year}-${result.placement}`}
                to={`/tournaments/${result.year}`}
                className="flex items-center justify-between bg-surface-raised/40 px-6 py-4 transition-premium hover:bg-white/3"
              >
                <div className="flex items-center gap-5">
                  <span
                    className="font-black text-white"
                    style={{ fontFamily: DISPLAY, fontSize: '1.35rem', letterSpacing: '-0.03em' }}
                  >
                    {result.year}
                  </span>
                  <span className="text-sm text-white/40">{result.stage}</span>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    result.placement === 'Winners'
                      ? 'bg-pitch/20 text-pitch'
                      : result.placement === 'Runners-up'
                      ? 'bg-white/10 text-white/80'
                      : 'bg-white/5 text-white/50'
                  }`}
                >
                  {result.placement}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No recorded results"
            description="This team's World Cup results will appear here as data is expanded."
          />
        )}
      </section>

      <TeamSquadsSection code={team.code} />
    </div>
  );
}

function MatchRecordSection({ slug }) {
  const stats = getTeamMatchStats(slug);
  if (!stats || stats.played === 0) return null;

  const { played, wins, draws, losses, goalsFor, goalsAgainst, gd, winPct, biggestWin, biggestLoss } = stats;
  const wPct = (wins / played) * 100;
  const dPct = (draws / played) * 100;

  return (
    <section className="mb-12">
      <h2
        className="mb-4 font-black text-white/70"
        style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
      >
        All-time match record
      </h2>

      {/* W/D/L bar */}
      <div className="mb-5 overflow-hidden rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8">
        <div className="mb-4 flex h-3 overflow-hidden rounded-full">
          <div className="bg-pitch transition-all duration-700" style={{ width: `${wPct}%` }} />
          <div className="bg-white/20 transition-all duration-700" style={{ width: `${dPct}%` }} />
          <div className="flex-1 bg-red-500/40" />
        </div>
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
          {[
            { label: 'Played', val: played, color: 'text-white' },
            { label: 'Won', val: wins, color: 'text-pitch' },
            { label: 'Drawn', val: draws, color: 'text-white/60' },
            { label: 'Lost', val: losses, color: 'text-red-400' },
            { label: 'Goals', val: `${goalsFor}–${goalsAgainst}`, color: 'text-white' },
            { label: 'Win %', val: `${winPct}%`, color: 'text-pitch' },
          ].map(({ label, val, color }) => (
            <div key={label} className="text-center">
              <p
                className={`font-black leading-none ${color}`}
                style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', letterSpacing: '-0.03em' }}
              >
                {val}
              </p>
              <p className="mt-1 text-[0.6rem] uppercase tracking-wider text-white/30">{label}</p>
            </div>
          ))}
        </div>
        {gd !== 0 && (
          <p className="mt-4 text-xs text-white/25 border-t border-white/[0.05] pt-3">
            Goal difference: <span className={gd > 0 ? 'text-pitch' : 'text-red-400'}>{gd > 0 ? '+' : ''}{gd}</span>
          </p>
        )}
      </div>

      {/* Peak moments */}
      {(biggestWin || biggestLoss) && (
        <div className="grid gap-3 sm:grid-cols-2">
          {biggestWin && (
            <div className="rounded-2xl bg-surface-raised/40 p-5 ring-1 ring-white/8">
              <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-pitch/70">Biggest win</p>
              <p
                className="font-black text-white"
                style={{ fontFamily: DISPLAY, fontSize: '1.6rem', letterSpacing: '-0.04em' }}
              >
                {biggestWin.gf}–{biggestWin.ga}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <FlagBadge code={biggestWin.oppCode} size="sm" />
                <span className="text-sm text-white/55">vs {biggestWin.oppName}</span>
              </div>
              <p className="mt-2 text-xs text-white/30">{biggestWin.year} · {biggestWin.stage}</p>
            </div>
          )}
          {biggestLoss && (
            <div className="rounded-2xl bg-surface-raised/40 p-5 ring-1 ring-white/8">
              <p className="mb-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-red-400/70">Biggest loss</p>
              <p
                className="font-black text-white"
                style={{ fontFamily: DISPLAY, fontSize: '1.6rem', letterSpacing: '-0.04em' }}
              >
                {biggestLoss.gf}–{biggestLoss.ga}
              </p>
              <div className="mt-1.5 flex items-center gap-2">
                <FlagBadge code={biggestLoss.oppCode} size="sm" />
                <span className="text-sm text-white/55">vs {biggestLoss.oppName}</span>
              </div>
              <p className="mt-2 text-xs text-white/30">{biggestLoss.year} · {biggestLoss.stage}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function TeamSquadsSection({ code }) {
  const [openYear, setOpenYear] = useState(null);
  const years = getTeamSquadYears(code);
  if (!years.length) return null;

  return (
    <section className="mt-12">
      <h2
        className="mb-6 font-black text-white/70"
        style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
      >
        World Cup squads
      </h2>
      <div className="space-y-3">
        {years.map((year) => {
          const isOpen = openYear === year;
          const players = getSquad(year, code);
          return (
            <div key={year} className="overflow-hidden rounded-2xl ring-1 ring-white/8">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenYear(isOpen ? null : year)}
                className="flex w-full items-center gap-4 bg-surface-raised/40 px-6 py-4 text-left transition-premium hover:bg-white/3"
              >
                <span
                  className="font-black text-white"
                  style={{ fontFamily: DISPLAY, fontSize: '1.2rem', letterSpacing: '-0.03em' }}
                >
                  {year}
                </span>
                <span className="flex-1 text-sm text-white/35">FIFA World Cup</span>
                <span className="text-xs text-white/25">{players.length} players</span>
                <svg
                  className={`h-4 w-4 shrink-0 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <div className="border-t border-white/[0.05] bg-black/20 px-6 py-4">
                  <SquadRoster players={players} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function StatCard({ label, value, mono }) {
  return (
    <div className="rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8">
      <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/35">{label}</p>
      <p
        className={`mt-2 font-black text-white ${mono ? 'font-mono' : ''}`}
        style={
          !mono
            ? { fontFamily: DISPLAY, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', letterSpacing: '-0.03em' }
            : { fontSize: '1.5rem' }
        }
      >
        {value}
      </p>
    </div>
  );
}
