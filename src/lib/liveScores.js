import { useEffect, useState } from 'react';
import { GROUPS, computeStandings, wc2026 } from '../data/tournaments/wc2026.js';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const BASE = 'https://api.football-data.org/v4';
const CACHE_TTL = 60 * 1000; // 1 minute

// football-data.org TLA → our FIFA code (where they differ)
const TLA_MAP = { SAU: 'KSA', IRI: 'IRN' };
const normTla = (tla) => TLA_MAP[tla] || tla;

// Matches cache (shared by useLive2026, useTodayMatches, useLiveCount)
let _cache = null;
let _cacheAt = 0;

// Scorers cache
let _scorerCache = null;
let _scorerCacheAt = 0;

function fetchApiMatches() {
  if (_cache && Date.now() - _cacheAt < CACHE_TTL) return Promise.resolve(_cache);
  return fetch(`${BASE}/competitions/WC/matches?season=2026`, {
    headers: { 'X-Auth-Token': API_KEY },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`football-data ${res.status}`);
      return res.json();
    })
    .then(({ matches }) => {
      _cache = matches;
      _cacheAt = Date.now();
      return matches;
    });
}

function fetchApiScorers() {
  if (_scorerCache && Date.now() - _scorerCacheAt < CACHE_TTL) return Promise.resolve(_scorerCache);
  return fetch(`${BASE}/competitions/WC/scorers?season=2026`, {
    headers: { 'X-Auth-Token': API_KEY },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`football-data ${res.status}`);
      return res.json();
    })
    .then(({ scorers }) => {
      const result = scorers || [];
      _scorerCache = result;
      _scorerCacheAt = Date.now();
      return result;
    });
}

function buildScoreMap(apiMatches) {
  const map = {};
  for (const m of apiMatches) {
    const home = normTla(m.homeTeam?.tla || '');
    const away = normTla(m.awayTeam?.tla || '');
    if (!home || !away) continue;
    const finished = m.status === 'FINISHED';
    const live = m.status === 'IN_PLAY' || m.status === 'PAUSED';
    map[`${home}-${away}`] = {
      homeScore: finished || live ? (m.score?.fullTime?.home ?? null) : null,
      awayScore: finished || live ? (m.score?.fullTime?.away ?? null) : null,
      liveNow: live,
    };
  }
  return map;
}

/**
 * Fetches live 2026 WC scores and patches the static tournament data.
 * Only fires when tournament.detailLevel === 'preview' and API key is set.
 * Polls every 60 seconds. Falls back to static data silently on error.
 */
export function useLive2026(tournament) {
  const isPreview = tournament?.detailLevel === 'preview';
  const [liveMatches, setLiveMatches] = useState(null);
  const [liveStandings, setLiveStandings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPreview || !API_KEY) return;

    let cancelled = false;

    Promise.resolve()
      .then(() => { if (!cancelled) setLoading(true); })
      .then(() => fetchApiMatches())
      .then((apiMatches) => {
        if (cancelled) return;
        const scoreMap = buildScoreMap(apiMatches);
        const patched = tournament.matches.map((m) => {
          const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
          return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow } : m;
        });
        setLiveMatches(patched);
        setLiveStandings(computeStandings(GROUPS, patched));
      })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });

    const interval = setInterval(() => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          const scoreMap = buildScoreMap(apiMatches);
          const patched = tournament.matches.map((m) => {
            const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
            return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow } : m;
          });
          setLiveMatches(patched);
          setLiveStandings(computeStandings(GROUPS, patched));
        })
        .catch(() => {});
    }, 60_000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [isPreview, tournament]);

  return { liveMatches, liveStandings, loading, error };
}

/**
 * Returns today's 2026 WC matches with live scores merged in.
 * Updates every 60 seconds. Returns static data immediately while fetching.
 */
export function useTodayMatches() {
  const today = new Date().toISOString().slice(0, 10);
  const [todayMatches, setTodayMatches] = useState(() =>
    wc2026.matches.filter((m) => m.date === today)
  );

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;

    Promise.resolve()
      .then(() => fetchApiMatches())
      .then((apiMatches) => {
        if (cancelled) return;
        const scoreMap = buildScoreMap(apiMatches);
        setTodayMatches(
          wc2026.matches
            .filter((m) => m.date === today)
            .map((m) => {
              const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
              return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow } : m;
            })
        );
      })
      .catch(() => {});

    const interval = setInterval(() => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          const scoreMap = buildScoreMap(apiMatches);
          setTodayMatches(
            wc2026.matches
              .filter((m) => m.date === today)
              .map((m) => {
                const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
                return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow } : m;
              })
          );
        })
        .catch(() => {});
    }, 60_000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [today]);

  return todayMatches;
}

/**
 * Returns the number of currently live matches (IN_PLAY or PAUSED).
 * Polls every 60 seconds. Returns 0 when API key is missing or on error.
 */
export function useLiveCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;

    Promise.resolve()
      .then(() => fetchApiMatches())
      .then((apiMatches) => {
        if (cancelled) return;
        setCount(apiMatches.filter((m) => m.status === 'IN_PLAY' || m.status === 'PAUSED').length);
      })
      .catch(() => {});

    const interval = setInterval(() => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          setCount(apiMatches.filter((m) => m.status === 'IN_PLAY' || m.status === 'PAUSED').length);
        })
        .catch(() => {});
    }, 60_000);

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return count;
}

/**
 * Fetches the live 2026 Golden Boot top-scorer leaderboard.
 * Returns { scorers: [], loading } — scorers is [] on error (free-tier silent fallback).
 * Polls every 60 seconds.
 */
export function useLiveScorers() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(!!API_KEY);

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;

    const mapScorers = (raw) =>
      raw.map((s) => ({
        name: s.player?.name || [s.player?.firstName, s.player?.lastName].filter(Boolean).join(' ') || '—',
        teamName: s.team?.shortName || s.team?.name || '',
        teamCode: normTla(s.team?.tla || ''),
        goals: s.goals ?? 0,
        assists: s.assists ?? 0,
        penalties: s.penalties ?? 0,
      }));

    Promise.resolve()
      .then(() => fetchApiScorers())
      .then((raw) => {
        if (cancelled) return;
        setScorers(mapScorers(raw));
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) { setScorers([]); setLoading(false); }
      });

    const interval = setInterval(() => {
      fetchApiScorers()
        .then((raw) => { if (!cancelled) setScorers(mapScorers(raw)); })
        .catch(() => {});
    }, 60_000);

    return () => { cancelled = true; clearInterval(interval); };
  }, []);

  return { scorers, loading };
}
