import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-[100dvh] bg-surface">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-pitch/8 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-pitch/5 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-6 md:pt-32">
        <Outlet />
      </main>

      <footer className="relative border-t border-white/6 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-white/35 md:px-6">
          FIFA World Cup history hub — curated historical data for educational purposes.
        </div>
      </footer>
    </div>
  );
}
