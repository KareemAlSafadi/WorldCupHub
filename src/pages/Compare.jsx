import { useSearchParams } from 'react-router-dom';
import { Trophy } from '@phosphor-icons/react';
import EmptyState from '../components/EmptyState';
import FixturesList from '../components/FixturesList';
import FlagBadge from '../components/FlagBadge';
import usePageTitle from '../lib/usePageTitle';
import { getAllTeams, getHeadToHead, getTeamBySlug } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function Compare() {
  usePageTitle('Compare');
  const [params, setParams] = useSearchParams();
  const teams = getAllTeams();

  const slugA = params.get('a') || 'brazil';
  const slugB = params.get('b') || 'argentina';
  const teamA = getTeamBySlug(slugA);
  const teamB = getTeamBySlug(slugB);
  const meetings = getHeadToHead(slugA, slugB);

  const setTeam = (key, value) => {
    const next = new URLSearchParams(params);
    next.set(key, value);
    setParams(next, { replace: true });
  };

  return (
    <div className="animate-fade-up">

      {/* Hero */}
      <section className="pt-10 pb-12 md:pb-16">
        <div className="mb-3 font-mono text-[0.63rem] tracking-[0.2em] text-pitch/60">
          Head to head
        </div>
        <h1
          className="font-black text-white"
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          Compare<br />Nations.
        </h1>
      </section>

      {/* Team selectors */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        <TeamSelect label="Team A" value={slugA} teams={teams} onChange={(v) => setTeam('a', v)} />
        <TeamSelect label="Team B" value={slugB} teams={teams} onChange={(v) => setTeam('b', v)} />
      </div>

      {teamA && teamB && slugA !== slugB ? (
        <>
          {/* VS hero */}
          <div className="relative mb-8 overflow-hidden rounded-3xl bg-surface-raised ring-1 ring-white/8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
            >
              <span
                className="font-black text-white/[0.03] leading-none"
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 'clamp(8rem, 18vw, 16rem)',
                  letterSpacing: '-0.06em',
                }}
              >
                VS
              </span>
            </div>
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-8 md:px-10">
              <TeamHero team={teamA} />
              <div className="flex flex-col items-center gap-1 px-2">
                <span
                  className="font-black text-white/15"
                  style={{ fontFamily: DISPLAY, fontSize: '1.5rem', letterSpacing: '-0.04em' }}
                >
                  VS
                </span>
              </div>
              <TeamHero team={teamB} align="right" />
            </div>
          </div>

          {/* Stat comparison */}
          <div className="mb-10 overflow-hidden rounded-2xl ring-1 ring-white/8">
            <StatCompareRow
              label="World Cup titles"
              valueA={teamA.titles}
              valueB={teamB.titles}
              renderA={(v) =>
                v > 0 ? (
                  <span className="flex items-center gap-1.5 justify-end text-pitch">
                    <Trophy size={14} weight="fill" />
                    <span
                      className="font-black"
                      style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                    >
                      {v}
                    </span>
                  </span>
                ) : (
                  <span className="text-white/30 text-sm">—</span>
                )
              }
              renderB={(v) =>
                v > 0 ? (
                  <span className="flex items-center gap-1.5 text-pitch">
                    <span
                      className="font-black"
                      style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                    >
                      {v}
                    </span>
                    <Trophy size={14} weight="fill" />
                  </span>
                ) : (
                  <span className="text-white/30 text-sm">—</span>
                )
              }
            />
            <StatCompareRow
              label="Appearances"
              valueA={teamA.appearances}
              valueB={teamB.appearances}
              renderA={(v) => (
                <span
                  className={`font-black ${teamA.appearances > teamB.appearances ? 'text-pitch' : 'text-white'}`}
                  style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                >
                  {v}
                </span>
              )}
              renderB={(v) => (
                <span
                  className={`font-black ${teamB.appearances > teamA.appearances ? 'text-pitch' : 'text-white'}`}
                  style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                >
                  {v}
                </span>
              )}
            />
            <StatCompareRow
              label="Best finish"
              valueA={teamA.bestFinish}
              valueB={teamB.bestFinish}
              renderA={(v) => <span className="text-sm font-semibold text-white">{v}</span>}
              renderB={(v) => <span className="text-sm font-semibold text-white">{v}</span>}
            />
            <StatCompareRow
              label="Recorded results"
              valueA={teamA.tournamentResults?.length || 0}
              valueB={teamB.tournamentResults?.length || 0}
              renderA={(v) => (
                <span
                  className="font-black text-white"
                  style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                >
                  {v}
                </span>
              )}
              renderB={(v) => (
                <span
                  className="font-black text-white"
                  style={{ fontFamily: DISPLAY, fontSize: '1.4rem', letterSpacing: '-0.04em' }}
                >
                  {v}
                </span>
              )}
              last
            />
          </div>

          {/* Meetings */}
          <section>
            <h2
              className="mb-6 font-black text-white/60"
              style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.01em' }}
            >
              Recorded meetings
            </h2>
            {meetings.length > 0 ? (
              <FixturesList matches={meetings} />
            ) : (
              <EmptyState
                title="No recorded meetings"
                description="These two nations have no World Cup matches in the archive's curated match records."
              />
            )}
          </section>
        </>
      ) : (
        <EmptyState
          title={slugA === slugB ? 'Pick two different teams' : 'Team not found'}
          description="Select two distinct national teams above to compare their World Cup records."
        />
      )}
    </div>
  );
}

function TeamSelect({ label, value, teams, onChange }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[0.6rem] font-medium uppercase tracking-[0.18em] text-white/35">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-surface-raised px-4 py-3 text-sm text-white outline-none transition-premium focus:border-pitch/50 focus:ring-2 focus:ring-pitch/20"
      >
        {teams.map((t) => (
          <option key={t.slug} value={t.slug} className="bg-surface-raised text-white">
            {t.name}
          </option>
        ))}
      </select>
    </label>
  );
}

function TeamHero({ team, align }) {
  const isRight = align === 'right';
  return (
    <div className={`flex flex-col gap-3 ${isRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <FlagBadge code={team.code} size="lg" />
      <div>
        <h3
          className="font-black text-white leading-tight"
          style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            letterSpacing: '-0.03em',
          }}
        >
          {team.name}
        </h3>
        <p className="text-xs text-white/35 mt-0.5">{team.confederation}</p>
      </div>
    </div>
  );
}

function StatCompareRow({ label, valueA, valueB, renderA, renderB, last }) {
  return (
    <div
      className={`grid grid-cols-[1fr_auto_1fr] items-center gap-4 bg-surface-raised/40 px-6 py-4 ${
        !last ? 'border-b border-white/[0.055]' : ''
      }`}
    >
      <div className="flex justify-end">{renderA(valueA)}</div>
      <div className="px-4 text-center">
        <span className="text-[0.6rem] uppercase tracking-[0.15em] text-white/25 whitespace-nowrap">
          {label}
        </span>
      </div>
      <div className="flex justify-start">{renderB(valueB)}</div>
    </div>
  );
}
