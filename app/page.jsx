"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { games } from "./games-data";

const gameComponents = {
  tictactoe: TicTacToe,
  snake: SnakeGame,
  memory: MemoryMatch,
  guess: GuessNumber,
  rps: RockPaperScissors,
  whack: WhackAMole,
  twenty48: TwentyFortyEight,
  mines: MinesweeperLite,
  quiz: QuickQuiz,
  scramble: WordScramble,
  reaction: ReactionTest
};

function cls(...names) {
  return names.filter(Boolean).join(" ");
}

function ActionButton({ children, onClick, type = "button", disabled = false, variant = "primary" }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls("button", variant)}>
      {children}
    </button>
  );
}

function Svg({ children, className = "", title }) {
  return (
    <svg className={cls("svg-icon", className)} viewBox="0 0 64 64" role={title ? "img" : "presentation"} aria-label={title} fill="none">
      {children}
    </svg>
  );
}

function GameIcon({ name, className = "", title }) {
  switch (name) {
    case "portal":
      return (
        <Svg className={className} title={title}>
          <path d="M14 38c-5.5 0-10-4.5-10-10s4.5-10 10-10h36c5.5 0 10 4.5 10 10s-4.5 10-10 10h-5l-5 8-6-8h-4l-6 8-5-8h-5Z" fill="currentColor" opacity="0.12" />
          <path d="M14 38c-5.5 0-10-4.5-10-10s4.5-10 10-10h36c5.5 0 10 4.5 10 10s-4.5 10-10 10h-5l-5 8-6-8h-4l-6 8-5-8h-5Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          <path d="M18 24v8M14 28h8M45 25h.1M51 31h.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "tictactoe":
      return (
        <Svg className={className} title={title}>
          <path d="M20 8v48M44 8v48M8 20h48M8 44h48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
          <path d="M13 12l10 10M23 12 13 22" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="32" cy="32" r="6" stroke="currentColor" strokeWidth="4" />
          <path d="M42 42l10 10M52 42 42 52" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "snake":
      return (
        <Svg className={className} title={title}>
          <path d="M12 42c0-12 12-12 20-12s20 0 20-12c0-6-5-10-12-10H24" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 8 12 18l10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="48" cy="17" r="2" fill="currentColor" />
          <rect x="9" y="46" width="46" height="10" rx="5" fill="currentColor" opacity="0.14" />
        </Svg>
      );
    case "memory":
      return (
        <Svg className={className} title={title}>
          <rect x="12" y="16" width="22" height="32" rx="5" fill="currentColor" opacity="0.13" />
          <rect x="12" y="16" width="22" height="32" rx="5" stroke="currentColor" strokeWidth="3" />
          <rect x="30" y="12" width="22" height="32" rx="5" fill="currentColor" opacity="0.22" />
          <rect x="30" y="12" width="22" height="32" rx="5" stroke="currentColor" strokeWidth="3" />
          <path d="M37 28h8M41 24v8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      );
    case "guess":
      return (
        <Svg className={className} title={title}>
          <circle cx="27" cy="27" r="15" fill="currentColor" opacity="0.12" />
          <circle cx="27" cy="27" r="15" stroke="currentColor" strokeWidth="4" />
          <path d="M39 39 53 53" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M23 23c1.2-3 7.5-3.1 8.4.4.8 3.2-3.7 4.3-4.4 7.1M27 37h.1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "rps":
      return (
        <Svg className={className} title={title}>
          <path d="M14 44h36l-6 10H20l-6-10Z" fill="currentColor" opacity="0.14" />
          <path d="M19 44V26c0-4 6-4 6 0v12-18c0-4 6-4 6 0v18-15c0-4 6-4 6 0v15-10c0-4 6-4 6 0v16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M43 36h8c2.5 0 4 2.5 2.8 4.7L50 48" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "whack":
      return (
        <Svg className={className} title={title}>
          <ellipse cx="32" cy="48" rx="22" ry="7" fill="currentColor" opacity="0.16" />
          <circle cx="32" cy="29" r="14" fill="currentColor" opacity="0.12" />
          <circle cx="32" cy="29" r="14" stroke="currentColor" strokeWidth="4" />
          <path d="M23 20 18 13M41 20l5-7M27 30h.1M37 30h.1M28 38h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "twenty48":
      return (
        <Svg className={className} title={title}>
          {[10, 30].map((x) =>
            [10, 30].map((y) => <rect key={`${x}-${y}`} x={x} y={y} width="24" height="24" rx="6" fill="currentColor" opacity={x === 30 && y === 30 ? "0.26" : "0.12"} />)
          )}
          <path d="M17 25h7M37 25h10M37 39h10M37 49h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M20 39v10M16 45h8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </Svg>
      );
    case "mines":
      return (
        <Svg className={className} title={title}>
          <circle cx="32" cy="34" r="13" fill="currentColor" opacity="0.14" />
          <circle cx="32" cy="34" r="13" stroke="currentColor" strokeWidth="4" />
          <path d="M32 10v8M32 50v6M12 34h7M45 34h7M18 20l5 5M46 20l-5 5M18 48l5-5M46 48l-5-5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <circle cx="37" cy="28" r="2" fill="currentColor" />
        </Svg>
      );
    case "quiz":
      return (
        <Svg className={className} title={title}>
          <path d="M12 14h40v28H29l-9 8v-8h-8V14Z" fill="currentColor" opacity="0.12" />
          <path d="M12 14h40v28H29l-9 8v-8h-8V14Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M25 25h14M25 33h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "scramble":
      return (
        <Svg className={className} title={title}>
          <rect x="8" y="12" width="18" height="18" rx="5" fill="currentColor" opacity="0.12" />
          <rect x="38" y="12" width="18" height="18" rx="5" fill="currentColor" opacity="0.18" />
          <rect x="23" y="34" width="18" height="18" rx="5" fill="currentColor" opacity="0.24" />
          <path d="M15 25 19 17l4 8M16.5 22h5M44 17h4.5c3 0 3 6 0 6H44m0 0h5c3 0 3 6 0 6H44V17M31 39v8m-3-4h6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "reaction":
      return (
        <Svg className={className} title={title}>
          <circle cx="32" cy="32" r="22" fill="currentColor" opacity="0.1" />
          <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="4" />
          <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="4" />
          <circle cx="32" cy="32" r="3" fill="currentColor" />
          <path d="M32 4v9M32 51v9M4 32h9M51 32h9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "sun":
      return (
        <Svg className={className} title={title}>
          <circle cx="32" cy="32" r="11" stroke="currentColor" strokeWidth="4" />
          <path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "moon":
      return (
        <Svg className={className} title={title}>
          <path d="M44 43.5A19 19 0 0 1 21 20.6 19 19 0 1 0 44 43.5Z" fill="currentColor" opacity="0.16" />
          <path d="M44 43.5A19 19 0 0 1 21 20.6 19 19 0 1 0 44 43.5Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        </Svg>
      );
    case "rock":
      return (
        <Svg className={className} title={title}>
          <path d="M18 44V28c0-5 7-5 7 0v-5c0-5 7-5 7 0v4c0-5 7-5 7 0v4c0-5 7-5 7 0v13c0 8-6 13-14 13s-14-5-14-13Z" fill="currentColor" opacity="0.12" />
          <path d="M18 44V28c0-5 7-5 7 0v-5c0-5 7-5 7 0v4c0-5 7-5 7 0v4c0-5 7-5 7 0v13c0 8-6 13-14 13s-14-5-14-13Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "paper":
      return (
        <Svg className={className} title={title}>
          <path d="M19 8h19l11 11v37H19V8Z" fill="currentColor" opacity="0.12" />
          <path d="M19 8h19l11 11v37H19V8Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M38 8v12h11M26 31h16M26 40h16" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
    case "scissors":
      return (
        <Svg className={className} title={title}>
          <circle cx="19" cy="45" r="7" fill="currentColor" opacity="0.12" />
          <circle cx="45" cy="45" r="7" fill="currentColor" opacity="0.12" />
          <circle cx="19" cy="45" r="7" stroke="currentColor" strokeWidth="4" />
          <circle cx="45" cy="45" r="7" stroke="currentColor" strokeWidth="4" />
          <path d="M25 40 49 13M39 40 15 13" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "orbit":
      return (
        <Svg className={className} title={title}>
          <circle cx="32" cy="32" r="7" fill="currentColor" />
          <ellipse cx="32" cy="32" rx="23" ry="9" stroke="currentColor" strokeWidth="4" />
          <ellipse cx="32" cy="32" rx="23" ry="9" stroke="currentColor" strokeWidth="4" transform="rotate(60 32 32)" />
        </Svg>
      );
    case "gem":
      return (
        <Svg className={className} title={title}>
          <path d="M18 13h28l10 14-24 25L8 27l10-14Z" fill="currentColor" opacity="0.14" />
          <path d="M18 13h28l10 14-24 25L8 27l10-14Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M18 13 32 52 46 13M8 27h48" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" opacity="0.75" />
        </Svg>
      );
    case "wave":
      return (
        <Svg className={className} title={title}>
          <path d="M8 38c8-16 16 16 24 0s16 16 24 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M8 25c8-12 16 12 24 0s16 12 24 0" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
        </Svg>
      );
    case "triangle":
      return (
        <Svg className={className} title={title}>
          <path d="M32 9 57 52H7L32 9Z" fill="currentColor" opacity="0.14" />
          <path d="M32 9 57 52H7L32 9Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        </Svg>
      );
    case "bolt":
      return (
        <Svg className={className} title={title}>
          <path d="M36 5 13 36h17l-2 23 23-33H34l2-21Z" fill="currentColor" opacity="0.18" />
          <path d="M36 5 13 36h17l-2 23 23-33H34l2-21Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
        </Svg>
      );
    case "leaf":
      return (
        <Svg className={className} title={title}>
          <path d="M53 11C30 12 14 27 14 45c16 5 34-5 39-34Z" fill="currentColor" opacity="0.14" />
          <path d="M53 11C30 12 14 27 14 45c16 5 34-5 39-34Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <path d="M15 49c11-15 22-23 37-36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "mole":
      return (
        <Svg className={className} title={title}>
          <circle cx="23" cy="21" r="6" fill="currentColor" opacity="0.15" />
          <circle cx="41" cy="21" r="6" fill="currentColor" opacity="0.15" />
          <circle cx="32" cy="34" r="17" fill="currentColor" opacity="0.13" />
          <circle cx="32" cy="34" r="17" stroke="currentColor" strokeWidth="4" />
          <path d="M25 32h.1M39 32h.1M28 41h8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    case "mine-small":
      return (
        <Svg className={className} title={title}>
          <circle cx="32" cy="34" r="14" fill="currentColor" opacity="0.12" />
          <circle cx="32" cy="34" r="14" stroke="currentColor" strokeWidth="4" />
          <path d="M32 12v7M32 49v5M13 34h7M44 34h7M19 21l5 5M45 21l-5 5M19 47l5-5M45 47l-5-5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        </Svg>
      );
    default:
      return <GameIcon name="portal" className={className} title={title} />;
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const saved = window.localStorage.getItem("game-arena-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = saved || preferred;
    document.documentElement.dataset.theme = initial;
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      window.localStorage.setItem("game-arena-theme", next);
      return next;
    });
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-pressed={theme === "dark"}>
      <span className="theme-toggle__icon">
        <GameIcon name={theme === "dark" ? "moon" : "sun"} />
      </span>
      <span>{theme === "dark" ? "Gelap" : "Terang"}</span>
    </button>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

function matchesQuickFilter(game, quickFilter) {
  if (quickFilter === "Semua") return true;
  if (quickFilter === "Populer") return game.views >= 250 || game.likes >= 80;
  if (quickFilter === "Top Views") return game.views >= 300;
  if (quickFilter === "Top Likes") return game.likes >= 90;
  return game.modes.includes(quickFilter);
}

export default function Home() {
  const [selected, setSelected] = useState(games[0].id);
  const [query, setQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("Semua");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [pageSize, setPageSize] = useState(12);
  const [endpoint, setEndpoint] = useState("/api/games");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEndpoint(`${window.location.origin}/api/games`);
  }, []);

  const categories = useMemo(() => ["All", ...Array.from(new Set(games.map((game) => game.category)))], []);
  const quickFilters = ["Semua", "Populer", "Top Views", "Top Likes", "WEB-VIEW", "IN-CHAT"];

  const filteredGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = games.filter((game) => {
      const matchSearch = !normalizedQuery || [game.title, game.description, game.author, game.category, ...game.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      const matchCategory = category === "All" || game.category === category || game.tags.includes(category);
      return matchSearch && matchCategory && matchesQuickFilter(game, quickFilter);
    });

    result.sort((a, b) => {
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "views") return b.views - a.views;
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "az") return a.title.localeCompare(b.title);
      if (sortBy === "za") return b.title.localeCompare(a.title);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return result;
  }, [category, query, quickFilter, sortBy]);

  const visibleGames = filteredGames.slice(0, pageSize);
  const activeGame = games.find((game) => game.id === selected) ?? games[0];
  const ActiveComponent = gameComponents[activeGame.id] ?? TicTacToe;

  const chooseGame = (id) => {
    setSelected(id);
    window.setTimeout(() => {
      document.getElementById("play")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const copyEndpoint = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  const resetFilters = () => {
    setQuery("");
    setQuickFilter("Semua");
    setCategory("All");
    setSortBy("newest");
    setPageSize(12);
  };

  return (
    <main className="page-shell arcade-shell">
      <header className="topbar arcade-topbar">
        <a className="brand" href="#top" aria-label="Game Arena home">
          <span className="brand-mark"><GameIcon name="portal" /></span>
          <span>
            <strong>Game Arena</strong>
            <small>Minigame arcade</small>
          </span>
        </a>
        <nav className="top-nav" aria-label="Navigasi utama">
          <a href="#catalog">Catalog</a>
          <a href="#play">Play</a>
          <ThemeToggle />
        </nav>
      </header>

      <section id="top" className="arcade-hero">
        <div className="arcade-title-block">
          <div>
            <p className="eyebrow">Browser arcade</p>
            <h1>Minigame Arcade</h1>
            <p className="hero-text">Katalog game ringan dengan filter, statistik, tampilan grid/list, dan mode terang-gelap. Main langsung dari browser tanpa login.</p>
          </div>
          <div className="hero-count-card">
            <strong>{games.length}</strong>
            <span>Games</span>
          </div>
        </div>

        <div className="hero-actions arcade-actions">
          <button className="button primary" type="button" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>Lihat catalog</button>
          <button className="button subtle" type="button" onClick={() => window.alert("Slot upload game bisa ditambah nanti kalau kamu mau pakai database atau dashboard admin.")}>Game baru</button>
        </div>
      </section>

      <section className="api-panel" aria-label="API games">
        <div className="api-method">GET</div>
        <div className="api-copy">
          <span>API Minigames Raw JSON</span>
          <code>{endpoint}</code>
        </div>
        <div className="api-actions">
          <button className="button subtle small" type="button" onClick={copyEndpoint}>{copied ? "Tersalin" : "Salin URL"}</button>
          <a className="button subtle small" href="#catalog">Docs API</a>
        </div>
      </section>

      <section id="catalog" className="catalog-section">
        <div className="control-panel">
          <div className="tab-row primary-tabs" role="tablist" aria-label="Filter cepat">
            {quickFilters.map((filter) => (
              <button key={filter} type="button" className={cls("filter-chip", quickFilter === filter && "active")} onClick={() => setQuickFilter(filter)}>
                {filter}
              </button>
            ))}
          </div>

          <div className="filter-grid">
            <label className="search-field">
              <span>Cari game</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Nama, author, kategori..." />
            </label>
            <label className="select-field">
              <span>Urutan</span>
              <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="views">Terbanyak dimainkan</option>
                <option value="likes">Paling disukai</option>
                <option value="az">Abjad: A - Z</option>
                <option value="za">Abjad: Z - A</option>
              </select>
            </label>
            <label className="select-field">
              <span>Tampil</span>
              <select value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                <option value={6}>6 / hal</option>
                <option value={12}>12 / hal</option>
                <option value={24}>24 / hal</option>
              </select>
            </label>
            <div className="view-toggle" aria-label="Mode tampilan">
              <button type="button" className={viewMode === "grid" ? "active" : ""} onClick={() => setViewMode("grid")}>Grid</button>
              <button type="button" className={viewMode === "list" ? "active" : ""} onClick={() => setViewMode("list")}>List</button>
            </div>
          </div>

          <div className="tab-row category-tabs" role="tablist" aria-label="Kategori game">
            {categories.map((item) => (
              <button key={item} type="button" className={cls("filter-chip", category === item && "active")} onClick={() => setCategory(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-meta">
          <div>
            <strong>{formatNumber(filteredGames.length)} Games</strong>
            <span>Menampilkan {filteredGames.length ? `1 - ${Math.min(pageSize, filteredGames.length)}` : "0"} dari {formatNumber(filteredGames.length)}</span>
          </div>
          <button className="button subtle small" type="button" onClick={resetFilters}>Segarkan</button>
        </div>

        <div className={cls("catalog-grid", viewMode === "list" && "list-mode")}> 
          {visibleGames.map((game) => (
            <article key={game.id} className={cls("arcade-card", selected === game.id && "active")}> 
              <div className="card-topline">
                <span className="card-logo"><GameIcon name={game.icon} /></span>
                <div className="mode-stack">
                  {game.modes.map((mode) => <span key={mode}>{mode}</span>)}
                </div>
              </div>

              <div className="card-content">
                <h3>{game.title}</h3>
                <p className="card-author">{game.author} <span>•</span> {game.age}</p>
                <p className="card-description">{game.description}</p>
              </div>

              <div className="card-tags">
                {game.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
              </div>

              <div className="card-stats" aria-label="Statistik game">
                <span>{formatNumber(game.views)} views</span>
                <span>{formatNumber(game.likes)} likes</span>
              </div>

              <div className="card-actions">
                <button className="button primary small" type="button" onClick={() => chooseGame(game.id)}>Main</button>
                <button className="button subtle small" type="button" onClick={() => chooseGame(game.id)}>Detail</button>
              </div>
            </article>
          ))}
        </div>

        {!visibleGames.length && (
          <div className="empty-state">
            <strong>Tidak ada game yang cocok.</strong>
            <p>Coba ubah kata kunci, kategori, atau filter cepat.</p>
            <button className="button primary" type="button" onClick={resetFilters}>Reset filter</button>
          </div>
        )}
      </section>

      <section id="play" className="play-section arcade-play-section">
        <div className="play-header">
          <div className="play-title">
            <span className="play-icon"><GameIcon name={activeGame.icon} /></span>
            <div>
              <p className="eyebrow">Now playing</p>
              <h2>{activeGame.title}</h2>
              <p>{activeGame.description}</p>
            </div>
          </div>
          <div className="play-badges">
            <span>{activeGame.category}</span>
            <span>{activeGame.level}</span>
            {activeGame.modes.map((mode) => <span key={mode}>{mode}</span>)}
          </div>
        </div>
        <ActiveComponent key={activeGame.id} />
      </section>

      <footer className="footer">
        <strong>Game Arena</strong>
        <span>Catalog layout terinspirasi arcade modern, dengan SVG icon dan tanpa emoji.</span>
      </footer>
    </main>
  );
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  const winner = getTicTacToeWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const status = winner ? `Pemenang: ${winner}` : isDraw ? "Seri." : `Giliran: ${turn}`;

  const play = (index) => {
    if (board[index] || winner) return;
    const next = [...board];
    next[index] = turn;
    setBoard(next);
    setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  return (
    <div className="game-surface two-column">
      <div className="info-panel">
        <h3>{status}</h3>
        <p>Blokir jalur lawan sebelum ia membuat tiga simbol sejajar.</p>
        <ActionButton onClick={reset}>Reset papan</ActionButton>
      </div>
      <div className="ttt-board" role="grid" aria-label="Papan Tic Tac Toe">
        {board.map((cell, index) => (
          <button
            type="button"
            key={index}
            className={cls("ttt-cell", cell && `mark-${cell.toLowerCase()}`)}
            onClick={() => play(index)}
            aria-label={`Kotak ${index + 1}`}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

function getTicTacToeWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  return null;
}

function GuessNumber() {
  const newTarget = () => Math.floor(Math.random() * 100) + 1;
  const [target, setTarget] = useState(newTarget);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("Masukkan angka antara 1 sampai 100.");
  const [tries, setTries] = useState(0);

  const submit = (event) => {
    event.preventDefault();
    const value = Number(guess);
    if (!value || value < 1 || value > 100) {
      setMessage("Angkanya harus 1 sampai 100.");
      return;
    }
    setTries((count) => count + 1);
    if (value === target) setMessage(`Benar. Angkanya ${target}. Total percobaan: ${tries + 1}.`);
    else if (value < target) setMessage("Terlalu kecil. Coba angka yang lebih besar.");
    else setMessage("Terlalu besar. Coba angka yang lebih kecil.");
  };

  const reset = () => {
    setTarget(newTarget());
    setGuess("");
    setTries(0);
    setMessage("Game baru dimulai. Tebak angka antara 1 sampai 100.");
  };

  return (
    <div className="game-surface compact-game">
      <div className="score-strip"><span>Percobaan</span><strong>{tries}</strong></div>
      <form className="guess-form" onSubmit={submit}>
        <input type="number" min="1" max="100" value={guess} onChange={(event) => setGuess(event.target.value)} placeholder="Contoh: 42" />
        <ActionButton type="submit">Tebak</ActionButton>
      </form>
      <p className="game-message">{message}</p>
      <ActionButton variant="subtle small" onClick={reset}>Angka baru</ActionButton>
    </div>
  );
}

function RockPaperScissors() {
  const choices = [
    { name: "Batu", icon: "rock" },
    { name: "Gunting", icon: "scissors" },
    { name: "Kertas", icon: "paper" }
  ];
  const [round, setRound] = useState({ player: "-", bot: "-", result: "Pilih salah satu untuk mulai." });
  const [score, setScore] = useState({ player: 0, bot: 0, draw: 0 });

  const play = (choice) => {
    const bot = choices[Math.floor(Math.random() * choices.length)].name;
    const beats = { Batu: "Gunting", Gunting: "Kertas", Kertas: "Batu" };
    let result = "Seri.";
    let key = "draw";
    if (choice !== bot) {
      const playerWins = beats[choice] === bot;
      result = playerWins ? "Kamu menang." : "Komputer menang.";
      key = playerWins ? "player" : "bot";
    }
    setRound({ player: choice, bot, result });
    setScore((current) => ({ ...current, [key]: current[key] + 1 }));
  };

  return (
    <div className="game-surface compact-game">
      <div className="rps-score"><span>Kamu: {score.player}</span><span>Seri: {score.draw}</span><span>Bot: {score.bot}</span></div>
      <div className="rps-actions">
        {choices.map((choice) => (
          <button type="button" key={choice.name} className="choice-button" onClick={() => play(choice.name)}>
            <GameIcon name={choice.icon} />
            <span>{choice.name}</span>
          </button>
        ))}
      </div>
      <div className="versus-card">
        <p>Kamu <strong>{round.player}</strong> vs Bot <strong>{round.bot}</strong></p>
        <h3>{round.result}</h3>
      </div>
    </div>
  );
}

const memorySymbols = ["orbit", "gem", "wave", "triangle", "bolt", "leaf"];

function createMemoryDeck() {
  return memorySymbols
    .flatMap((value) => [{ id: `${value}-a`, value }, { id: `${value}-b`, value }])
    .sort(() => Math.random() - 0.5);
}

function MemoryMatch() {
  const [deck, setDeck] = useState(createMemoryDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (flipped.length !== 2) return undefined;
    const [first, second] = flipped;
    if (deck[first].value === deck[second].value) setMatched((current) => [...current, deck[first].value]);
    const timer = window.setTimeout(() => setFlipped([]), 650);
    return () => window.clearTimeout(timer);
  }, [flipped, deck]);

  const openCard = (index) => {
    if (flipped.length === 2) return;
    if (flipped.includes(index) || matched.includes(deck[index].value)) return;
    setFlipped((current) => [...current, index]);
    if (flipped.length === 1) setMoves((value) => value + 1);
  };

  const reset = () => {
    setDeck(createMemoryDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const completed = matched.length === memorySymbols.length;

  return (
    <div className="game-surface two-column">
      <div className="info-panel">
        <h3>{completed ? "Semua pasangan ditemukan." : "Temukan pasangan kartu"}</h3>
        <p>Gerakan: {moves}</p>
        <p>Pasangan: {matched.length}/{memorySymbols.length}</p>
        <ActionButton onClick={reset}>Acak ulang</ActionButton>
      </div>
      <div className="memory-grid">
        {deck.map((card, index) => {
          const isOpen = flipped.includes(index) || matched.includes(card.value);
          return (
            <button type="button" key={card.id} className={cls("memory-card", isOpen && "open")} onClick={() => openCard(index)}>
              {isOpen ? <GameIcon name={card.value} /> : <span className="card-back" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function WhackAMole() {
  const [playing, setPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30);
  const [mole, setMole] = useState(null);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => {
      setTime((current) => {
        if (current <= 1) {
          setPlaying(false);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return undefined;
    const timer = window.setInterval(() => setMole(Math.floor(Math.random() * 9)), 620);
    return () => window.clearInterval(timer);
  }, [playing]);

  const start = () => {
    setScore(0);
    setTime(30);
    setMole(Math.floor(Math.random() * 9));
    setPlaying(true);
  };

  const hit = (index) => {
    if (!playing || index !== mole) return;
    setScore((value) => value + 1);
    setMole(Math.floor(Math.random() * 9));
  };

  return (
    <div className="game-surface two-column">
      <div className="info-panel">
        <h3>{playing ? "Kejar targetnya" : time === 0 ? "Waktu habis." : "Siap bermain?"}</h3>
        <p>Skor: {score}</p>
        <p>Waktu: {time}s</p>
        <ActionButton onClick={start}>{playing ? "Mulai ulang" : "Mulai"}</ActionButton>
      </div>
      <div className="mole-grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <button type="button" key={index} className="mole-hole" onClick={() => hit(index)}>
            {playing && mole === index ? <GameIcon name="mole" /> : null}
          </button>
        ))}
      </div>
    </div>
  );
}

function SnakeGame() {
  const size = 16;
  const [snake, setSnake] = useState([[8, 8], [7, 8], [6, 8]]);
  const [food, setFood] = useState([12, 8]);
  const [direction, setDirection] = useState([1, 0]);
  const [running, setRunning] = useState(false);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const directionRef = useRef(direction);

  useEffect(() => { directionRef.current = direction; }, [direction]);

  const randomFood = (body) => {
    const available = [];
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        if (!body.some(([sx, sy]) => sx === x && sy === y)) available.push([x, y]);
      }
    }
    return available[Math.floor(Math.random() * available.length)] ?? [0, 0];
  };

  const reset = () => {
    setSnake([[8, 8], [7, 8], [6, 8]]);
    setFood([12, 8]);
    setDirection([1, 0]);
    setRunning(false);
    setAlive(true);
    setScore(0);
  };

  const setSafeDirection = (next) => {
    setDirection((current) => {
      if (current[0] + next[0] === 0 && current[1] + next[1] === 0) return current;
      return next;
    });
    if (alive) setRunning(true);
  };

  useEffect(() => {
    const handleKey = (event) => {
      const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
      const next = map[event.key];
      if (!next) return;
      event.preventDefault();
      setSafeDirection(next);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [alive]);

  useEffect(() => {
    if (!running || !alive) return undefined;
    const timer = window.setInterval(() => {
      setSnake((current) => {
        const [dx, dy] = directionRef.current;
        const [headX, headY] = current[0];
        const head = [headX + dx, headY + dy];
        const willEat = head[0] === food[0] && head[1] === food[1];
        const bodyToCheck = willEat ? current : current.slice(0, -1);
        const hitWall = head[0] < 0 || head[0] >= size || head[1] < 0 || head[1] >= size;
        const hitBody = bodyToCheck.some(([x, y]) => x === head[0] && y === head[1]);
        if (hitWall || hitBody) {
          setAlive(false);
          setRunning(false);
          return current;
        }
        const nextSnake = [head, ...current];
        if (willEat) {
          setScore((value) => value + 10);
          setFood(randomFood(nextSnake));
        } else nextSnake.pop();
        return nextSnake;
      });
    }, 145);
    return () => window.clearInterval(timer);
  }, [running, alive, food]);

  const cellClasses = (x, y) => {
    const snakeIndex = snake.findIndex(([sx, sy]) => sx === x && sy === y);
    return cls("snake-cell", snakeIndex >= 0 && "snake-body", snakeIndex === 0 && "snake-head", food[0] === x && food[1] === y && "food");
  };

  return (
    <div className="game-surface two-column snake-layout">
      <div className="info-panel">
        <h3>{alive ? (running ? "Snake berjalan" : "Tekan start atau arah") : "Game over"}</h3>
        <p>Skor: {score}</p>
        <p>Kontrol: tombol arah, W A S D, atau pad di bawah.</p>
        <div className="button-row">
          <ActionButton onClick={() => alive && setRunning(true)}>Start</ActionButton>
          <ActionButton variant="subtle small" onClick={reset}>Reset</ActionButton>
        </div>
        <div className="pad-controls compact-pad" aria-label="Kontrol snake">
          <span />
          <button type="button" onClick={() => setSafeDirection([0, -1])}>↑</button>
          <span />
          <button type="button" onClick={() => setSafeDirection([-1, 0])}>←</button>
          <button type="button" onClick={() => setSafeDirection([0, 1])}>↓</button>
          <button type="button" onClick={() => setSafeDirection([1, 0])}>→</button>
        </div>
      </div>
      <div className="snake-board" style={{ "--size": size }}>
        {Array.from({ length: size * size }).map((_, index) => {
          const x = index % size;
          const y = Math.floor(index / size);
          return <span key={index} className={cellClasses(x, y)} />;
        })}
      </div>
    </div>
  );
}

function empty2048Board() { return Array.from({ length: 4 }, () => Array(4).fill(0)); }

function add2048Tile(board) {
  const next = board.map((row) => [...row]);
  const empty = [];
  next.forEach((row, r) => row.forEach((value, c) => value === 0 && empty.push([r, c])));
  if (!empty.length) return next;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function create2048Board() { return add2048Tile(add2048Tile(empty2048Board())); }

function slideLine(line) {
  const values = line.filter(Boolean);
  const result = [];
  let gained = 0;
  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === values[index + 1]) {
      const merged = values[index] * 2;
      result.push(merged);
      gained += merged;
      index += 1;
    } else result.push(values[index]);
  }
  while (result.length < 4) result.push(0);
  return { line: result, gained };
}

function move2048(board, direction) {
  const next = empty2048Board();
  let gained = 0;
  for (let i = 0; i < 4; i += 1) {
    const line = direction === "left" || direction === "right" ? board[i] : board.map((row) => row[i]);
    const prepared = direction === "right" || direction === "down" ? [...line].reverse() : [...line];
    const moved = slideLine(prepared);
    const finalLine = direction === "right" || direction === "down" ? moved.line.reverse() : moved.line;
    gained += moved.gained;
    for (let j = 0; j < 4; j += 1) {
      if (direction === "left" || direction === "right") next[i][j] = finalLine[j];
      else next[j][i] = finalLine[j];
    }
  }
  return { board: next, gained, changed: JSON.stringify(board) !== JSON.stringify(next) };
}

function canMove2048(board) {
  if (board.flat().includes(0)) return true;
  for (let r = 0; r < 4; r += 1) {
    for (let c = 0; c < 4; c += 1) {
      if (board[r][c] === board[r]?.[c + 1] || board[r][c] === board[r + 1]?.[c]) return true;
    }
  }
  return false;
}

function TwentyFortyEight() {
  const [board, setBoard] = useState(create2048Board);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [status, setStatus] = useState("playing");

  const reset = () => { setBoard(create2048Board()); setScore(0); setStatus("playing"); };

  const performMove = (direction) => {
    if (status !== "playing") return;
    setBoard((current) => {
      const moved = move2048(current, direction);
      if (!moved.changed) return current;
      const withTile = add2048Tile(moved.board);
      setScore((value) => {
        const nextScore = value + moved.gained;
        setBest((currentBest) => Math.max(currentBest, nextScore));
        return nextScore;
      });
      if (withTile.flat().includes(2048)) setStatus("won");
      else if (!canMove2048(withTile)) setStatus("lost");
      return withTile;
    });
  };

  useEffect(() => {
    const keys = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
    const handleKey = (event) => {
      if (!keys[event.key]) return;
      event.preventDefault();
      performMove(keys[event.key]);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="game-surface two-column game-2048-layout">
      <div className="info-panel">
        <h3>{status === "won" ? "Target 2048 tercapai." : status === "lost" ? "Tidak ada gerakan lagi." : "Gabungkan angka"}</h3>
        <p>Skor: {score}</p>
        <p>Terbaik: {best}</p>
        <ActionButton onClick={reset}>Game baru</ActionButton>
        <div className="pad-controls" aria-label="Kontrol 2048">
          <span /><button type="button" onClick={() => performMove("up")}>↑</button><span />
          <button type="button" onClick={() => performMove("left")}>←</button><button type="button" onClick={() => performMove("down")}>↓</button><button type="button" onClick={() => performMove("right")}>→</button>
        </div>
      </div>
      <div className="board-2048">
        {board.flat().map((value, index) => <span key={index} className={cls("tile-2048", value && `tile-${Math.min(value, 2048)}`)}>{value || ""}</span>)}
      </div>
    </div>
  );
}

function createMineBoard() {
  const size = 6;
  const mineCount = 7;
  const cells = Array.from({ length: size * size }, (_, index) => ({ index, mine: false, count: 0, revealed: false }));
  const mines = new Set();
  while (mines.size < mineCount) mines.add(Math.floor(Math.random() * cells.length));
  mines.forEach((index) => { cells[index].mine = true; });
  cells.forEach((cell) => {
    if (cell.mine) return;
    cell.count = getMineNeighbors(cell.index, size).filter((neighbor) => cells[neighbor].mine).length;
  });
  return cells;
}

function getMineNeighbors(index, size) {
  const row = Math.floor(index / size);
  const col = index % size;
  const neighbors = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) neighbors.push(nr * size + nc);
    }
  }
  return neighbors;
}

function revealCells(cells, index, size) {
  const stack = [index];
  while (stack.length) {
    const currentIndex = stack.pop();
    const cell = cells[currentIndex];
    if (!cell || cell.revealed || cell.mine) continue;
    cell.revealed = true;
    if (cell.count === 0) {
      getMineNeighbors(currentIndex, size).forEach((neighborIndex) => {
        if (!cells[neighborIndex].revealed && !cells[neighborIndex].mine) stack.push(neighborIndex);
      });
    }
  }
}

function MinesweeperLite() {
  const size = 6;
  const mineCount = 7;
  const [board, setBoard] = useState(createMineBoard);
  const [status, setStatus] = useState("playing");

  const reset = () => { setBoard(createMineBoard()); setStatus("playing"); };

  const open = (index) => {
    if (status !== "playing" || board[index].revealed) return;
    const next = board.map((cell) => ({ ...cell }));
    if (next[index].mine) {
      next.forEach((cell) => { if (cell.mine) cell.revealed = true; });
      setBoard(next);
      setStatus("lost");
      return;
    }
    revealCells(next, index, size);
    const safeRevealed = next.filter((cell) => !cell.mine && cell.revealed).length;
    if (safeRevealed === size * size - mineCount) setStatus("won");
    setBoard(next);
  };

  const safeLeft = size * size - mineCount - board.filter((cell) => !cell.mine && cell.revealed).length;

  return (
    <div className="game-surface two-column">
      <div className="info-panel">
        <h3>{status === "won" ? "Semua area aman terbuka." : status === "lost" ? "Kena ranjau." : "Cari petak aman"}</h3>
        <p>Ranjau: {mineCount}</p>
        <p>Petak aman tersisa: {safeLeft}</p>
        <ActionButton onClick={reset}>Papan baru</ActionButton>
      </div>
      <div className="mine-board">
        {board.map((cell) => (
          <button type="button" key={cell.index} className={cls("mine-cell", cell.revealed && "revealed", cell.mine && cell.revealed && "mine")} onClick={() => open(cell.index)}>
            {cell.revealed ? (cell.mine ? <GameIcon name="mine-small" /> : cell.count || "") : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

const quizQuestions = [
  { question: "CSS biasanya dipakai untuk...", options: ["Menata tampilan", "Menghapus file", "Mengisi baterai", "Merekam suara"], answer: "Menata tampilan" },
  { question: "Hasil dari 7 x 8 adalah...", options: ["54", "56", "64", "78"], answer: "56" },
  { question: "HTML dipakai untuk...", options: ["Struktur halaman", "Mengedit video", "Membuat kopi", "Membuka kunci"], answer: "Struktur halaman" },
  { question: "Warna lampu lalu lintas untuk jalan adalah...", options: ["Merah", "Kuning", "Hijau", "Biru"], answer: "Hijau" },
  { question: "React bekerja dengan konsep...", options: ["Komponen", "Kabel", "Batu", "Baterai"], answer: "Komponen" }
];

function QuickQuiz() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const completed = index >= quizQuestions.length;
  const current = quizQuestions[index];

  const choose = (option) => {
    if (selected) return;
    setSelected(option);
    if (option === current.answer) setScore((value) => value + 1);
  };
  const next = () => { setSelected(null); setIndex((value) => value + 1); };
  const reset = () => { setIndex(0); setSelected(null); setScore(0); };

  if (completed) {
    return <div className="game-surface compact-game result-panel"><h3>Quiz selesai.</h3><p>Skor kamu: {score}/{quizQuestions.length}</p><ActionButton onClick={reset}>Main lagi</ActionButton></div>;
  }

  return (
    <div className="game-surface compact-game">
      <div className="quiz-progress">Pertanyaan {index + 1}/{quizQuestions.length}</div>
      <h3>{current.question}</h3>
      <div className="quiz-options">
        {current.options.map((option) => (
          <button type="button" key={option} className={cls("quiz-option", selected && option === current.answer && "correct", selected === option && option !== current.answer && "wrong")} onClick={() => choose(option)}>
            {option}
          </button>
        ))}
      </div>
      {selected && <div className="quiz-feedback"><strong>{selected === current.answer ? "Benar." : "Belum tepat."}</strong><ActionButton onClick={next}>{index === quizQuestions.length - 1 ? "Lihat skor" : "Lanjut"}</ActionButton></div>}
    </div>
  );
}

const wordBank = [
  { word: "vercel", hint: "Platform deploy yang sering dipakai untuk Next.js" },
  { word: "react", hint: "Library UI berbasis komponen" },
  { word: "game", hint: "Permainan di browser" },
  { word: "kode", hint: "Ditulis developer" },
  { word: "puzzle", hint: "Permainan asah otak" },
  { word: "browser", hint: "Tempat membuka website" }
];

function shuffleWord(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  const shuffled = letters.join("");
  return shuffled === word ? `${shuffled.slice(1)}${shuffled[0]}` : shuffled;
}

function WordScramble() {
  const pickWord = () => wordBank[Math.floor(Math.random() * wordBank.length)];
  const [item, setItem] = useState(pickWord);
  const [scrambled, setScrambled] = useState(() => shuffleWord(item.word));
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("Susun huruf menjadi kata yang benar.");
  const [score, setScore] = useState(0);

  const next = () => {
    const nextItem = pickWord();
    setItem(nextItem);
    setScrambled(shuffleWord(nextItem.word));
    setAnswer("");
    setMessage("Kata baru siap ditebak.");
  };

  const check = (event) => {
    event.preventDefault();
    if (answer.trim().toLowerCase() === item.word) {
      setScore((value) => value + 1);
      setMessage("Benar. Klik kata baru untuk lanjut.");
    } else setMessage("Belum tepat. Perhatikan hint-nya.");
  };

  return (
    <div className="game-surface compact-game word-game">
      <div className="score-strip"><span>Skor</span><strong>{score}</strong></div>
      <div className="scrambled-word">{scrambled}</div>
      <p>Hint: {item.hint}</p>
      <form className="guess-form" onSubmit={check}>
        <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Jawaban kamu" />
        <ActionButton type="submit">Cek</ActionButton>
      </form>
      <p className="game-message">{message}</p>
      <ActionButton variant="subtle small" onClick={next}>Kata baru</ActionButton>
    </div>
  );
}

function ReactionTest() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Klik mulai, tunggu hijau, lalu tekan area ini.");
  const [startTime, setStartTime] = useState(0);
  const [last, setLast] = useState(null);
  const [best, setBest] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const start = () => {
    window.clearTimeout(timerRef.current);
    setStatus("waiting");
    setMessage("Tunggu. Jangan tekan dulu.");
    setLast(null);
    const delay = 1000 + Math.random() * 3000;
    timerRef.current = window.setTimeout(() => {
      setStatus("go");
      setStartTime(Date.now());
      setMessage("Sekarang. Tekan secepat mungkin.");
    }, delay);
  };

  const tap = () => {
    if (status === "waiting") {
      window.clearTimeout(timerRef.current);
      setStatus("tooSoon");
      setMessage("Terlalu cepat. Mulai lagi dan tunggu hijau.");
      return;
    }
    if (status !== "go") return;
    const result = Date.now() - startTime;
    setLast(result);
    setBest((current) => (current === null ? result : Math.min(current, result)));
    setStatus("idle");
    setMessage(`Refleks kamu ${result} ms.`);
  };

  return (
    <div className="game-surface compact-game">
      <button type="button" className={cls("reaction-zone", status)} onClick={tap}>
        <strong>{status === "go" ? "TEKAN" : status === "waiting" ? "TUNGGU" : "TES REFLEKS"}</strong>
        <span>{message}</span>
      </button>
      <div className="rps-score"><span>Terakhir: {last ? `${last} ms` : "-"}</span><span>Terbaik: {best ? `${best} ms` : "-"}</span></div>
      <ActionButton onClick={start}>Mulai</ActionButton>
    </div>
  );
}
