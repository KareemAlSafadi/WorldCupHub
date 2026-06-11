import { Link } from 'react-router-dom';
import { SoccerBall } from '@phosphor-icons/react';
import usePageTitle from '../lib/usePageTitle';

export default function NotFound() {
  usePageTitle('404');

  return (
    <div className="animate-fade-up flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pitch/15 ring-1 ring-pitch/25">
        <SoccerBall size={32} weight="fill" className="text-pitch" />
      </div>
      <h1 className="text-6xl font-bold tracking-tighter text-white md:text-7xl">404</h1>
      <p className="mt-3 text-lg font-semibold text-white/80">Page not found</p>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-white/50">
        The page you requested isn't in the archive. It may have moved, or it
        never existed.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center rounded-full bg-pitch px-6 py-3 text-sm font-semibold text-white transition-premium hover:bg-pitch-dim active:scale-[0.98]"
      >
        Back to home
      </Link>
    </div>
  );
}
