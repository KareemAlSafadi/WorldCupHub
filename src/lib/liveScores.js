import { useEffect, useState } from 'react';
import { GROUPS, computeStandings, wc2026 } from '../data/tournaments/wc2026.js';

const API_KEY = import.meta.env.VITE_FOOTBALL_API_KEY;
const BASE = 'https://api.football-data.org/v4';
const CACHE_TTL = 60 * 1000; // 1 minute

// football-data.org TLA → our FIFA code (where they differ)
const TLA_MAP = {
  SAU: 'KSA',  // Saudi Arabia
  IRI: 'IRN',  // Iran
  RSA: 'RSA',  // South Africa (same, just explicit)
  CRC: 'CRC',  // Costa Rica (same)
  USA: 'USA',  // United States (same)
};
const normTla = (tla) => TLA_MAP[tla] || tla;

// Shared matches cache
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
      if (!res.ok) throw new Error(`football-data HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log('[LiveScores] API response:', data);
      const matches = data.matches || [];
      _cache = matches;
      _cacheAt = Date.now();
      return matches;
    })
    .catch((err) => {
      console.error('[LiveScores] fetch failed:', err.message);
      throw err;
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
    // During PAUSED (halftime), fullTime may be null — fall back to halfTime score
    const homeScore = finished || live
      ? (m.score?.fullTime?.home ?? m.score?.halfTime?.home ?? null)
      : null;
    const awayScore = finished || live
      ? (m.score?.fullTime?.away ?? m.score?.halfTime?.away ?? null)
      : null;
    map[`${home}-${away}`] = {
      homeScore,
      awayScore,
      liveNow: live,
      minute: live ? (m.minute ?? null) : null,
    };
  }
  return map;
}

function countLive(apiMatches) {
  return apiMatches.filter((m) => m.status === 'IN_PLAY' || m.status === 'PAUSED').length;
}

/**
 * Fetches live 2026 WC scores and patches the static tournament data.
 * Only fires when tournament.detailLevel === 'preview' and API key is set.
 * Polls every 30s during live matches, 60s otherwise. Falls back silently on error.
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
    let timer;

    const applyMatches = (apiMatches) => {
      const scoreMap = buildScoreMap(apiMatches);
      const patched = tournament.matches.map((m) => {
        const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
        return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow, minute: s.minute } : m;
      });
      setLiveMatches(patched);
      setLiveStandings(computeStandings(GROUPS, patched));
      return apiMatches;
    };

    const poll = () => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          applyMatches(apiMatches);
          timer = setTimeout(poll, countLive(apiMatches) > 0 ? 30_000 : 60_000);
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    setLoading(true);
    fetchApiMatches()
      .then((apiMatches) => {
        if (cancelled) return;
        applyMatches(apiMatches);
        timer = setTimeout(poll, countLive(apiMatches) > 0 ? 30_000 : 60_000);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; clearTimeout(timer); };
  }, [isPreview, tournament]);

  return { liveMatches, liveStandings, loading, error };
}

/**
 * Returns today's 2026 WC matches with live scores merged in.
 * Polls every 30s during live matches, 60s otherwise. Returns static data while fetching.
 */
export function useTodayMatches() {
  const today = new Date().toISOString().slice(0, 10);
  const [todayMatches, setTodayMatches] = useState(() =>
    wc2026.matches.filter((m) => m.date === today)
  );

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;
    let timer;

    const applyTodayMatches = (apiMatches) => {
      const scoreMap = buildScoreMap(apiMatches);
      setTodayMatches(
        wc2026.matches
          .filter((m) => m.date === today)
          .map((m) => {
            const s = scoreMap[`${m.homeCode}-${m.awayCode}`];
            return s ? { ...m, homeScore: s.homeScore, awayScore: s.awayScore, liveNow: s.liveNow, minute: s.minute } : m;
          })
      );
      return apiMatches;
    };

    const poll = () => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          applyTodayMatches(apiMatches);
          timer = setTimeout(poll, countLive(apiMatches) > 0 ? 30_000 : 60_000);
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    fetchApiMatches()
      .then((apiMatches) => {
        if (cancelled) return;
        applyTodayMatches(apiMatches);
        timer = setTimeout(poll, countLive(apiMatches) > 0 ? 30_000 : 60_000);
      })
      .catch(() => {});

    return () => { cancelled = true; clearTimeout(timer); };
  }, [today]);

  return todayMatches;
}

/**
 * Returns the number of currently live matches (IN_PLAY or PAUSED).
 * Polls adaptively. Returns 0 when API key is missing or on error.
 */
export function useLiveCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;
    let timer;

    const poll = () => {
      fetchApiMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          const live = countLive(apiMatches);
          setCount(live);
          timer = setTimeout(poll, live > 0 ? 30_000 : 60_000);
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    fetchApiMatches()
      .then((apiMatches) => {
        if (cancelled) return;
        const live = countLive(apiMatches);
        setCount(live);
        timer = setTimeout(poll, live > 0 ? 30_000 : 60_000);
      })
      .catch(() => {});

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return count;
}

/**
 * Fetches the live 2026 Golden Boot top-scorer leaderboard.
 * Returns { scorers: [], loading }. Polls every 60s.
 */
export function useLiveScorers() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(!!API_KEY);

  useEffect(() => {
    if (!API_KEY) return;
    let cancelled = false;
    let timer;

    const mapScorers = (raw) =>
      raw.map((s) => ({
        name: s.player?.name || [s.player?.firstName, s.player?.lastName].filter(Boolean).join(' ') || '—',
        teamName: s.team?.shortName || s.team?.name || '',
        teamCode: normTla(s.team?.tla || ''),
        goals: s.goals ?? 0,
        assists: s.assists ?? 0,
        penalties: s.penalties ?? 0,
      }));

    const poll = () => {
      fetchApiScorers()
        .then((raw) => {
          if (!cancelled) { setScorers(mapScorers(raw)); timer = setTimeout(poll, 60_000); }
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    fetchApiScorers()
      .then((raw) => {
        if (cancelled) return;
        setScorers(mapScorers(raw));
        setLoading(false);
        timer = setTimeout(poll, 60_000);
      })
      .catch(() => {
        if (!cancelled) { setScorers([]); setLoading(false); }
      });

    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  return { scorers, loading };
}
