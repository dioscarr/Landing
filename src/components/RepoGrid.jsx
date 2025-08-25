import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = 'https://api.github.com';

function timeAgo(iso) {
  try {
    const d = new Date(iso);
    const diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return `${Math.floor(diff)}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return d.toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function RepoGrid({ username, perPage = 100 }) {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('updated'); // 'updated' | 'stars' | 'name'

  useEffect(() => {
    if (!username) {
      setError('Missing GitHub username');
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setError(null);
    const token = import.meta.env.VITE_GITHUB_TOKEN;
    const headers = {
      Accept: 'application/vnd.github+json',
    };
    if (token) headers.Authorization = `token ${token}`;

    fetch(`${API_BASE}/users/${encodeURIComponent(username)}/repos?per_page=${perPage}&sort=updated`, {
      headers,
      signal: ac.signal,
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${res.status} ${res.statusText}: ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        setRepos(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (ac.signal.aborted) return;
        setError(e.message || 'Failed to load repos');
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });
    return () => ac.abort();
  }, [username, perPage]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = repos;
    if (q) {
      list = list.filter((r) =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q))
      );
    }
    if (sort === 'updated') {
      list = [...list].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (sort === 'stars') {
      list = [...list].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0));
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [repos, query, sort]);

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-semibold">GitHub Repositories</h2>
        <div className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repos..."
            className="px-3 py-2 rounded bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded bg-white/5 border border-white/10 text-sm"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Most stars</option>
            <option value="name">Name A→Z</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 animate-pulse h-40" />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-red-400 text-sm bg-red-950/40 border border-red-900/50 rounded p-3">
          Failed to load repos for <strong>{username}</strong>: {error.includes('rate limit') ? 'GitHub API rate limit exceeded. Try again later.' : error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-colors"
            >
              <a
                href={r.html_url}
                target="_blank"
                rel="noreferrer"
                className="block"
                onClick={(e) => {
                  /* allow inner interactive elements to stopPropagation if needed */
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium">{r.name}</h3>
                    {r.description && (
                      <p className="text-sm text-white/70 mt-1 line-clamp-3">{r.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {r.has_pages && (
                      <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-300 border border-green-500/30">
                        Pages ✓
                      </span>
                    )}
                    {r.stargazers_count ? (
                      <span className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                        ★ {r.stargazers_count}
                      </span>
                    ) : null}
                  </div>
                </div>
              </a>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
                {r.language && (
                  <span className="px-2 py-1 rounded bg-white/10 border border-white/10">{r.language}</span>
                )}
                <span>Updated {timeAgo(r.updated_at)}</span>
                {r.homepage && (
                  <a
                    href={r.homepage.startsWith('http') ? r.homepage : `https://${r.homepage}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2 py-1 rounded bg-green-500/20 text-green-300 border border-green-500/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Homepage ↗
                  </a>
                )}

                {/* Edit homepage inline when token is available */}
                <EditHomepageAction repo={r} username={username} onSaved={(newHomepage) => {
                  // update local repo list with new homepage
                  setRepos((prev) => prev.map((x) => (x.id === r.id ? { ...x, homepage: newHomepage } : x)));
                }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

function EditHomepageAction({ repo, username, onSaved }) {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(repo.homepage || '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => setValue(repo.homepage || ''), [repo.homepage]);

  if (!token) {
    return (
      <button
        className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-white/60"
        title="Provide VITE_GITHUB_TOKEN to enable editing"
        onClick={(e) => e.stopPropagation()}
      >
        Edit
      </button>
    );
  }

  const save = async (e) => {
    e.stopPropagation();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ homepage: value || null }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`${res.status} ${res.statusText}: ${txt}`);
      }
      const data = await res.json();
      onSaved(data.homepage || null);
      setEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
      {!editing ? (
        <button
          className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
            setError(null);
          }}
        >
          Edit
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="https://example.com"
            className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs"
          />
          <button className="px-2 py-1 rounded bg-blue-600 text-white text-xs" onClick={save} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs" onClick={(e) => { e.stopPropagation(); setEditing(false); setValue(repo.homepage || ''); }}>
            Cancel
          </button>
        </div>
      )}
      {error && <div className="text-red-400 text-xs">{error}</div>}
    </div>
  );
}
