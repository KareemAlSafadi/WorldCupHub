import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlass, X, Trophy, Calendar } from '@phosphor-icons/react';
import FlagBadge from './FlagBadge';
import { getAllTournaments, getAllTeams } from '../lib/data';

const DISPLAY = '"Cabinet Grotesk", system-ui, sans-serif';

// Rendered only when open (parent conditionally mounts with {open && <SearchModal />})
export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const q = query.trim().toLowerCase();

  const tournaments = useMemo(
    () =>
      q.length >= 1
        ? getAllTournaments()
            .filter(
              (t) =>
                String(t.year).includes(q) ||
                (t.host || '').toLowerCase().includes(q) ||
                (t.winner || '').toLowerCase().includes(q)
            )
            .slice(0, 5)
        : [],
    [q]
  );

  const teams = useMemo(
    () =>
      q.length >= 2
        ? getAllTeams()
            .filter((t) => t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q))
            .slice(0, 5)
        : [],
    [q]
  );

  const results = useMemo(
    () => [
      ...tournaments.map((t) => ({ type: 'tournament', item: t })),
      ...teams.map((t) => ({ type: 'team', item: t })),
    ],
    [tournaments, teams]
  );

  const go = useCallback((result) => {
    onClose();
    if (result.type === 'tournament') {
      navigate(`/tournaments/${result.item.year}`);
    } else {
      navigate(`/teams/${result.item.slug}`);
    }
  }, [onClose, navigate]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selected]) go(results[selected]);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [results, selected, onClose, go]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setSelected(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
      style={{ background: 'rgba(11,15,20,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl bg-surface-raised ring-1 ring-white/12 shadow-2xl"
        style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07]">
          <MagnifyingGlass size={18} className="text-white/40 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search tournaments, teams..."
            className="flex-1 bg-transparent text-white placeholder-white/25 outline-none text-sm"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-white/30 transition-premium hover:text-white hover:bg-white/8"
          >
            <X size={16} />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="py-2 max-h-[60vh] overflow-y-auto">
            {tournaments.length > 0 && (
              <p className="px-5 pb-1 pt-2 text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
                Tournaments
              </p>
            )}
            {tournaments.map((t, i) => (
              <button
                key={t.year}
                type="button"
                onClick={() => go({ type: 'tournament', item: t })}
                onMouseEnter={() => setSelected(i)}
                className={`flex w-full items-center gap-4 px-5 py-3 text-left transition-premium ${
                  selected === i ? 'bg-white/6' : 'hover:bg-white/4'
                }`}
              >
                <Calendar size={16} className="text-pitch shrink-0" />
                <div className="flex-1 min-w-0">
                  <span
                    className="font-black text-white"
                    style={{ fontFamily: DISPLAY, fontSize: '1rem', letterSpacing: '-0.03em' }}
                  >
                    {t.year}
                  </span>
                  <span className="ml-3 text-xs text-white/40">{t.host}</span>
                </div>
                {t.winner && (
                  <span className="text-xs text-white/30 shrink-0">{t.winner}</span>
                )}
              </button>
            ))}

            {teams.length > 0 && (
              <p className="px-5 pb-1 pt-3 text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
                Teams
              </p>
            )}
            {teams.map((t, i) => {
              const idx = tournaments.length + i;
              return (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => go({ type: 'team', item: t })}
                  onMouseEnter={() => setSelected(idx)}
                  className={`flex w-full items-center gap-4 px-5 py-3 text-left transition-premium ${
                    selected === idx ? 'bg-white/6' : 'hover:bg-white/4'
                  }`}
                >
                  <FlagBadge code={t.code} />
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-black text-white"
                      style={{ fontFamily: DISPLAY, fontSize: '0.95rem', letterSpacing: '-0.02em' }}
                    >
                      {t.name}
                    </span>
                    <span className="ml-2 text-xs text-white/35">{t.confederation}</span>
                  </div>
                  {t.titles > 0 && (
                    <span className="flex items-center gap-1 text-pitch shrink-0">
                      <Trophy size={12} weight="fill" />
                      <span className="text-xs font-bold">{t.titles}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {q.length >= 1 && results.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm text-white/30">No results for &ldquo;{query}&rdquo;</p>
          </div>
        )}

        {q.length === 0 && (
          <div className="px-5 py-6 text-center">
            <p className="text-xs text-white/20">Type to search tournaments and teams</p>
          </div>
        )}

        {/* Keyboard hints */}
        <div className="flex items-center justify-end gap-4 border-t border-white/[0.07] px-5 py-3">
          <span className="text-[0.55rem] text-white/20">
            <kbd className="rounded px-1.5 py-0.5 bg-white/8 font-mono text-white/35 text-[0.6rem]">↵</kbd>
            {' '}to select
          </span>
          <span className="text-[0.55rem] text-white/20">
            <kbd className="rounded px-1.5 py-0.5 bg-white/8 font-mono text-white/35 text-[0.6rem]">Esc</kbd>
            {' '}to close
          </span>
        </div>
      </div>
    </div>
  );
}
