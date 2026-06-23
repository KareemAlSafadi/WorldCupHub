import { useEffect, useState } from 'react';
import { GROUPS, computeStandings, wc2026 } from '../data/tournaments/wc2026.js';

// Scores are fetched server-side by GitHub Actions every 5 minutes and stored
// in the data branch. We read from there to avoid CORS restrictions on the
// football-data.org free tier (which only allows http://localhost).
const DATA_URL = 'https://raw.githubusercontent.com/kareemalsafadi/WorldCupHub/data';
const CACHE_TTL = 60 * 1000;

// football-data.org TLA → our FIFA code (where they differ)
const TLA_MAP = { SAU: 'KSA', IRI: 'IRN' };
const normTla = (tla) => TLA_MAP[tla] || tla;

let _cache = null;
let _cacheAt = 0;
let _scorerCache = null;
let _scorerCacheAt = 0;

function fetchMatches() {
  if (_cache && Date.now() - _cacheAt < CACHE_TTL) return Promise.resolve(_cache);
  return fetch(`${DATA_URL}/matches.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(({ matches }) => {
      const result = matches || [];
      _cache = result;
      _cacheAt = Date.now();
      return result;
    });
}

function fetchScorers() {
  if (_scorerCache && Date.now() - _scorerCacheAt < CACHE_TTL) return Promise.resolve(_scorerCache);
  return fetch(`${DATA_URL}/scorers.json`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
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

export function useLive2026(tournament) {
  const isPreview = tournament?.detailLevel === 'preview';
  const [liveMatches, setLiveMatches] = useState(null);
  const [liveStandings, setLiveStandings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isPreview) return;

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
      fetchMatches()
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
    fetchMatches()
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

export function useTodayMatches() {
  const today = new Date().toISOString().slice(0, 10);
  const [todayMatches, setTodayMatches] = useState(() =>
    wc2026.matches.filter((m) => m.date === today)
  );

  useEffect(() => {
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
      fetchMatches()
        .then((apiMatches) => {
          if (cancelled) return;
          applyTodayMatches(apiMatches);
          timer = setTimeout(poll, countLive(apiMatches) > 0 ? 30_000 : 60_000);
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    fetchMatches()
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

export function useLiveCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timer;

    const poll = () => {
      fetchMatches()
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

    fetchMatches()
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

export function useLiveScorers() {
  const [scorers, setScorers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      fetchScorers()
        .then((raw) => {
          if (!cancelled) { setScorers(mapScorers(raw)); timer = setTimeout(poll, 60_000); }
        })
        .catch(() => {
          if (!cancelled) timer = setTimeout(poll, 60_000);
        });
    };

    fetchScorers()
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
