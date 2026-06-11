import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { PageSkeleton, TeamDetailSkeleton, TournamentDetailSkeleton } from './components/Skeleton';

const Home = lazy(() => import('./pages/Home'));
const Tournaments = lazy(() => import('./pages/Tournaments'));
const TournamentDetail = lazy(() => import('./pages/TournamentDetail'));
const Teams = lazy(() => import('./pages/Teams'));
const TeamDetail = lazy(() => import('./pages/TeamDetail'));
const Records = lazy(() => import('./pages/Records'));
const Compare = lazy(() => import('./pages/Compare'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <BrowserRouter basename="/world-cup-hub">
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="tournaments"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Tournaments />
              </Suspense>
            }
          />
          <Route
            path="tournaments/:year"
            element={
              <Suspense fallback={<TournamentDetailSkeleton />}>
                <TournamentDetail />
              </Suspense>
            }
          />
          <Route
            path="teams"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Teams />
              </Suspense>
            }
          />
          <Route
            path="teams/:slug"
            element={
              <Suspense fallback={<TeamDetailSkeleton />}>
                <TeamDetail />
              </Suspense>
            }
          />
          <Route
            path="records"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Records />
              </Suspense>
            }
          />
          <Route
            path="compare"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <Compare />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
