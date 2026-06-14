import { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar';
import TournamentCard from '../components/TournamentCard';
import usePageTitle from '../lib/usePageTitle';
import useInView from '../lib/useInView';
import { filterTournaments, getDecades } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

export default function Tournaments() {
  usePageTitle('Tournaments');
  const [search, setSearch] = useState('');
  const [decade, setDecade] = useState(null);

  const decades = getDecades();
  const chips = decades.map((d) => ({ value: d, label: `${d}s` }));

  const tournaments = useMemo(
    () => filterTournaments({ decade, search }),
    [decade, search]
  );

  return (
    <div className="animate-fade-up">

      {/* Hero */}
      <section className="pt-10 pb-16 md:pb-20">
        <div className="mb-3 font-mono text-[0.63rem] tracking-[0.2em] text-pitch/60">
          Archive · 22 editions
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
          Every<br />Edition.
        </h1>
        <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-white/45">
          From Uruguay 1930 to the 2026 tournament across North America — the complete
          World Cup archive.
        </p>
      </section>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          placeholder="Search by year, host, or champion..."
          chips={chips}
          activeChip={decade}
          onChipChange={setDecade}
        />
      </div>

      <div className="mb-10 border-t border-white/[0.055]" />

      {tournaments.length === 0 ? (
        <p className="py-16 text-center text-white/45">No tournaments match your search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((t, i) => (
            <RevealCard key={t.year} index={i}>
              <TournamentCard tournament={t} />
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
      style={{ '--reveal-delay': `${Math.min(index * 55, 350)}ms` }}
    >
      {children}
    </div>
  );
}
