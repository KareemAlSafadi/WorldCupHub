import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Trophy } from '@phosphor-icons/react';
import EmptyState from '../components/EmptyState';
import FlagBadge from '../components/FlagBadge';
import usePageTitle from '../lib/usePageTitle';
import { getTeamBySlug } from '../lib/data';

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
      <div className="mb-12 grid gap-3 sm:grid-cols-3">
        <StatCard label="Appearances" value={team.appearances} />
        <StatCard label="Best finish" value={team.bestFinish} />
        <StatCard label="FIFA code" value={team.code} mono />
      </div>

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
    </div>
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
