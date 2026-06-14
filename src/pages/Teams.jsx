import { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar';
import TeamCard from '../components/TeamCard';
import usePageTitle from '../lib/usePageTitle';
import useInView from '../lib/useInView';
import { filterTeams } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';
const CONFEDERATIONS = ['UEFA', 'CONMEBOL', 'CONCACAF', 'AFC', 'CAF'];

export default function Teams() {
  usePageTitle('Teams');
  const [search, setSearch] = useState('');
  const [confederation, setConfederation] = useState(null);

  const chips = CONFEDERATIONS.map((c) => ({ value: c, label: c }));

  const teams = useMemo(
    () => filterTeams({ search, confederation }),
    [search, confederation]
  );

  return (
    <div className="animate-fade-up">

      {/* Hero */}
      <section className="pt-10 pb-16 md:pb-20">
        <div className="mb-3 font-mono text-[0.63rem] tracking-[0.2em] text-pitch/60">
          Nations · 6 confederations
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
          Every<br />Nation.
        </h1>
        <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/45">
          All national teams — past and present — that have competed in the World Cup, across
          every confederation.
        </p>
      </section>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search teams..."
          chips={chips}
          activeChip={confederation}
          onChipChange={setConfederation}
        />
      </div>

      <div className="mb-10 border-t border-white/[0.055]" />

      {teams.length === 0 ? (
        <p className="py-16 text-center text-white/45">No teams match your search.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <RevealCard key={team.slug} index={i}>
              <TeamCard team={team} />
            </RevealCard>
          ))}
        </div>
      )}
    </div>
  );
}

function RevealCard({ children, index }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      data-inview={inView ? 'true' : 'false'}
      style={{ '--reveal-delay': `${Math.min(index * 30, 300)}ms` }}
    >
      {children}
    </div>
  );
}
