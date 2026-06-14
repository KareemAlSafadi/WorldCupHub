import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from '@phosphor-icons/react';
import EmptyState from '../components/EmptyState';
import FixturesList from '../components/FixturesList';
import FlagBadge from '../components/FlagBadge';
import KnockoutBracket from '../components/KnockoutBracket';
import QualificationPanel from '../components/QualificationPanel';
import { TournamentTabSkeleton } from '../components/Skeleton';
import StandingsTable from '../components/StandingsTable';
import usePageTitle from '../lib/usePageTitle';
import { getTournamentByYear } from '../lib/data';
import { useLive2026, useLiveScorers } from '../lib/liveScores';

const BASE_TABS = ['Overview', 'Fixtures', 'Standings', 'Bracket'];
const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function TournamentDetail() {
  const { year } = useParams();
  const tournament = getTournamentByYear(year);

  if (!tournament) {
    return (
      <EmptyState
        title="Tournament not found"
        description="We couldn't find a World Cup for that year. Try browsing all tournaments."
      />
    );
  }

  return <TournamentView key={tournament.year} tournament={tournament} />;
}

function TournamentView({ tournament }) {
  usePageTitle(`World Cup ${tournament.year}`);
  const [tab, setTab] = useState('Overview');
  const [tabLoading, setTabLoading] = useState(false);

  const handleTabChange = (nextTab) => {
    if (nextTab === tab) return;
    setTabLoading(true);
    setTab(nextTab);
    setTimeout(() => setTabLoading(false), 180);
  };

  const isPreview = tournament.detailLevel === 'preview';
  const { liveMatches, liveStandings, loading: liveLoading } = useLive2026(tournament);
  const { scorers, loading: scorerLoading } = useLiveScorers();

  const matches = (isPreview && liveMatches) ? liveMatches : (tournament.matches || []);
  const standings = (isPreview && liveStandings) ? liveStandings : tournament.standings;

  const hasMatches = matches.length > 0;
  const hasStandings = !!standings && Object.keys(standings).length > 0;
  const hasBracket = !!tournament.bracket?.length;

  // Show Golden Boot tab on 2026 while loading or when scorers are available
  const showGoldenBoot = isPreview && (scorerLoading || scorers.length > 0);
  const TABS = showGoldenBoot ? [...BASE_TABS, 'Golden Boot'] : BASE_TABS;

  return (
    <div className="animate-fade-up">
      <Link
        to="/tournaments"
        className="mb-10 inline-flex items-center gap-2 text-sm text-white/45 transition-premium hover:text-white"
      >
        <ArrowLeft size={16} />
        All tournaments
      </Link>

      {/* Hero */}
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-surface-raised ring-1 ring-white/8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 100% 0%, rgba(31,164,99,0.07) 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(255,255,255,0.015) 0%, transparent 50%)',
          }}
        />
        <div className="relative flex flex-col gap-8 p-8 md:flex-row md:items-end md:justify-between md:p-12">
          <div>
            {isPreview ? (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-pitch/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-pitch animate-pulse-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-pitch" />
                Live · Group Stage
              </span>
            ) : (
              <span className="mb-4 inline-block rounded-full bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white/35">
                FIFA World Cup
              </span>
            )}
            <h1
              className="font-black text-white leading-none"
              style={{
                fontFamily: DISPLAY,
                fontSize: 'clamp(4rem, 10vw, 8rem)',
                letterSpacing: '-0.05em',
              }}
            >
              {tournament.year}
            </h1>
            <p className="mt-3 font-mono text-sm text-white/40">{tournament.host}</p>
          </div>

          {tournament.winnerCode && (
            <div className="flex items-center gap-5 rounded-2xl bg-surface-overlay px-6 py-5 ring-1 ring-white/8 shrink-0">
              <FlagBadge code={tournament.winnerCode} size="lg" />
              <div>
                <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/30">Champion</p>
                <p
                  className="font-black text-white mt-0.5"
                  style={{ fontFamily: DISPLAY, fontSize: '1.2rem', letterSpacing: '-0.03em' }}
                >
                  {tournament.winner}
                </p>
                {tournament.runnerUp && (
                  <p className="text-xs text-white/35 mt-0.5">def. {tournament.runnerUp}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTabChange(t)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-premium active:scale-95 ${
              tab === t
                ? 'bg-white/12 text-white ring-1 ring-white/15'
                : 'text-white/40 hover:text-white/75 hover:bg-white/5'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'Overview' && !tabLoading && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl bg-surface-raised p-6 ring-1 ring-white/8">
              <h2 className="mb-4 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-pitch/80">
                About this edition
              </h2>
              <p className="leading-relaxed text-white/65 text-sm">{tournament.fact}</p>
              {tournament.format && (
                <p className="mt-4 text-xs text-white/35 border-t border-white/[0.06] pt-4">{tournament.format}</p>
              )}
            </div>

            {tournament.runnerUp && (
              <div className="grid gap-3 sm:grid-cols-2">
                <InfoTile label="Winner" value={tournament.winner} code={tournament.winnerCode} />
                <InfoTile label="Runner-up" value={tournament.runnerUp} code={tournament.runnerUpCode} />
              </div>
            )}
          </div>

          <div className="space-y-3">
            {tournament.topScorer && (
              <MetaRow icon={Users} label="Top scorer" value={tournament.topScorer} />
            )}
            {tournament.teamsCount && (
              <MetaRow icon={Users} label="Teams" value={String(tournament.teamsCount)} />
            )}
            {tournament.attendance && (
              <MetaRow icon={Calendar} label="Attendance" value={tournament.attendance} />
            )}
            {tournament.cities && (
              <MetaRow icon={MapPin} label="Host cities" value={tournament.cities.join(', ')} />
            )}
            {isPreview && tournament.hosts && (
              <MetaRow icon={MapPin} label="Host nations" value={tournament.hosts.join(', ')} />
            )}
          </div>
        </div>
      )}

      {tab === 'Fixtures' &&
        (tabLoading ? (
          <TournamentTabSkeleton type="fixtures" />
        ) : hasMatches ? (
          <FixturesList matches={matches} />
        ) : (
          <EmptyState
            title="No fixtures recorded"
            description="No match records are available for this edition yet."
          />
        ))}

      {tab === 'Standings' &&
        (tabLoading || (isPreview && liveLoading) ? (
          <TournamentTabSkeleton type="standings" />
        ) : hasStandings ? (
          <StandingsTable standings={standings} />
        ) : (
          <EmptyState
            title="No group stage"
            description="This edition was played as a straight knockout — there were no groups to rank."
          />
        ))}

      {tab === 'Bracket' &&
        (tabLoading ? (
          <TournamentTabSkeleton type="bracket" />
        ) : hasBracket ? (
          <KnockoutBracket bracket={tournament.bracket} matches={matches} />
        ) : isPreview ? (
          <div>
            <div className="mb-8">
              <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-pitch/70">
                Road to the Round of 32
              </p>
              <h2
                className="font-black text-white"
                style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', letterSpacing: '-0.03em' }}
              >
                Qualification Standings
              </h2>
              <p className="mt-2 text-sm text-white/40">
                Top 2 from each group qualify automatically. The 8 best third-placed teams also advance to the Round of 32.
              </p>
            </div>
            <QualificationPanel standings={standings} />
          </div>
        ) : (
          <EmptyState
            title="Bracket unavailable"
            description="This edition had no knockout bracket — it was decided by a final group stage."
          />
        ))}

      {tab === 'Golden Boot' && (
        scorerLoading ? (
          <TournamentTabSkeleton type="standings" />
        ) : (
          <GoldenBootLeaderboard scorers={scorers} />
        )
      )}
    </div>
  );
}

function GoldenBootLeaderboard({ scorers }) {
  if (!scorers.length) return (
    <EmptyState
      title="Scorer data unavailable"
      description="The Golden Boot leaderboard will appear once scoring data is available from the API."
    />
  );

  const max = scorers[0]?.goals || 1;

  return (
    <div className="space-y-3">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-pitch/70">Live · 2026</p>
          <h2
            className="font-black text-white"
            style={{ fontFamily: DISPLAY, fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', letterSpacing: '-0.03em' }}
          >
            Golden Boot Race
          </h2>
        </div>
        <span className="font-mono text-[0.6rem] text-white/25 animate-pulse-soft">Updates every 60s</span>
      </div>

      <div className="overflow-hidden rounded-2xl ring-1 ring-white/8">
        {scorers.map((s, idx) => (
          <div
            key={`${s.name}-${s.teamCode}`}
            className="relative flex items-center gap-4 border-b border-white/[0.05] bg-surface-raised/40 px-5 py-4 last:border-0 transition-premium hover:bg-white/3"
          >
            {/* Goal bar behind row */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 bg-pitch/[0.06] transition-all duration-700"
              style={{ width: `${(s.goals / max) * 100}%` }}
            />
            <span
              className="relative w-6 shrink-0 font-mono text-sm text-white/25"
            >
              {idx + 1}
            </span>
            <FlagBadge code={s.teamCode} />
            <div className="relative flex-1 min-w-0">
              <p
                className="truncate font-black text-white"
                style={{ fontFamily: DISPLAY, fontSize: '1rem', letterSpacing: '-0.02em' }}
              >
                {s.name}
              </p>
              <p className="text-xs text-white/35">{s.teamName}</p>
            </div>
            <div className="relative flex items-baseline gap-3 shrink-0">
              <div className="text-right">
                <span
                  className="font-black text-white"
                  style={{ fontFamily: DISPLAY, fontSize: '1.6rem', letterSpacing: '-0.04em', lineHeight: 1 }}
                >
                  {s.goals}
                </span>
                <span className="ml-1 text-[0.6rem] font-semibold uppercase tracking-wider text-white/30">
                  goals
                </span>
              </div>
              {s.assists > 0 && (
                <div className="text-right text-white/40">
                  <span className="text-sm font-semibold">{s.assists}</span>
                  <span className="ml-1 text-[0.55rem] uppercase tracking-wider">ast</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoTile({ label, value, code }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-surface-raised p-5 ring-1 ring-white/8">
      {code && <FlagBadge code={code} size="lg" />}
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/30">{label}</p>
        <p className="font-semibold text-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function MetaRow({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-4 rounded-2xl bg-surface-raised/60 p-4 ring-1 ring-white/8">
      <Icon size={18} className="mt-0.5 shrink-0 text-pitch" />
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/35">{label}</p>
        <p className="text-sm text-white/65 mt-0.5">{value}</p>
      </div>
    </div>
  );
}
