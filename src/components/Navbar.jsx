import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { List, MagnifyingGlass, SoccerBall, X } from '@phosphor-icons/react';
import SearchModal from './SearchModal';

const links = [
  { to: '/', label: 'Home' },
  { to: '/tournaments', label: 'Tournaments' },
  { to: '/teams', label: 'Teams' },
  { to: '/records', label: 'Records' },
  { to: '/compare', label: 'Compare' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (
        (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) ||
        (e.key === 'k' && (e.metaKey || e.ctrlKey))
      ) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-6">
        <nav className="pointer-events-auto mx-auto flex w-max max-w-full items-center gap-1 rounded-full border border-white/10 bg-surface/80 px-2 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
          <Link
            to="/"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white transition-premium hover:bg-white/5 active:scale-95"
          >
            <SoccerBall size={18} weight="fill" className="text-pitch" />
            <span className="hidden sm:inline">World Cup Hub</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition-premium active:scale-95 ${
                    isActive
                      ? 'bg-pitch text-white'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="ml-1 flex items-center gap-2 rounded-full px-3 py-2 text-white/50 ring-1 ring-white/10 transition-premium hover:bg-white/5 hover:text-white active:scale-95"
            aria-label="Search"
          >
            <MagnifyingGlass size={16} />
            <span className="hidden text-[0.6rem] tracking-widest text-white/25 lg:inline">/</span>
          </button>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="ml-1 rounded-full p-2.5 text-white/70 transition-premium hover:bg-white/5 hover:text-white active:scale-95 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <X size={20} className="rotate-0 transition-transform duration-300" />
            ) : (
              <List size={20} />
            )}
          </button>
        </nav>

        {open && (
          <div className="pointer-events-auto mx-auto mt-3 w-max overflow-hidden rounded-3xl border border-white/10 bg-surface/95 p-3 shadow-2xl backdrop-blur-3xl md:hidden">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block rounded-2xl px-6 py-3 text-sm font-medium transition-premium ${
                    isActive ? 'bg-pitch text-white' : 'text-white/70 hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              type="button"
              onClick={() => { setOpen(false); setSearchOpen(true); }}
              className="flex w-full items-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium text-white/70 transition-premium hover:bg-white/5"
            >
              <MagnifyingGlass size={16} />
              Search
            </button>
          </div>
        )}
      </header>
    </>
  );
}
