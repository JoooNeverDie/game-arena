"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const games = [
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    icon: "⭕",
    category: "Strategi",
    level: "Mudah",
    description: "Adu tiga simbol sejajar melawan teman di papan klasik 3x3."
  },
  {
    id: "snake",
    title: "Snake",
    icon: "🐍",
    category: "Arcade",
    level: "Sedang",
    description: "Makan buah, perpanjang ekor, dan jangan menabrak dinding."
  },
  {
    id: "memory",
    title: "Memory Match",
    icon: "🧠",
    category: "Puzzle",
    level: "Mudah",
    description: "Buka kartu dan temukan pasangan ikon yang sama."
  },
  {
    id: "guess",
    title: "Tebak Angka",
    icon: "🔢",
    category: "Santai",
    level: "Mudah",
    description: "Cari angka rahasia 1 sampai 100 dengan petunjuk naik atau turun."
  },
  {
    id: "rps",
    title: "Batu Gunting Kertas",
    icon: "✊",
    category: "Cepat",
    level: "Mudah",
    description: "Main cepat melawan komputer dan kumpulkan skor terbaik."
  },
  {
    id: "whack",
    title: "Whack-a-Mole",
    icon: "🕳️",
    category: "Refleks",
    level: "Sedang",
    description: "Klik mole yang muncul sebelum waktunya habis."
  },
  {
    id: "twenty48",
    title: "2048 Mini",
    icon: "🧩",
    category: "Puzzle",
    level: "Sedang",
    description: "Geser kotak angka, gabungkan nilai, dan kejar tile 2048."
  },
  {
    id: "mines",
    title: "Minesweeper Lite",
    icon: "💣",
    category: "Logika",
    level: "Sedang",
    description: "Buka petak aman dan hindari ranjau tersembunyi."
  },
  {
    id: "quiz",
    title: "Quiz Cepat",
    icon: "⚡",
    category: "Trivia",
    level: "Mudah",
    description: "Jawab pertanyaan ringan dan lihat skor akhir kamu."
  },
  {
    id: "scramble",
    title: "Susun Kata",
    icon: "🔤",
    category: "Kata",
    level: "Mudah",
    description: "Tebak kata asli dari huruf yang diacak."
  },
  {
    id: "reaction",
    title: "Tes Refleks",
    icon: "🎯",
    category: "Refleks",
    level: "Mudah",
    description: "Tunggu warna hijau lalu klik secepat mungkin."
  }
];

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

function PrimaryButton({ children, onClick, type = "button", disabled = false, variant = "" }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls("btn", variant)}>
      {children}
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

export default function Home() {
  const [selected, setSelected] = useState(games[0].id);
  const activeGame = games.find((game) => game.id === selected) ?? games[0];
  const ActiveComponent = gameComponents[activeGame.id] ?? TicTacToe;

  const chooseGame = (id) => {
    setSelected(id);
    window.setTimeout(() => {
      document.getElementById("play")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Portal mini-game siap deploy ke Vercel</p>
          <h1>Vercel Game Hub</h1>
          <p className="hero-text">
            Satu website berisi banyak game casual ringan. Dibuat dengan Next.js, responsif untuk desktop dan mobile,
            serta mudah dikembangkan dengan game baru.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#games">
              Pilih Game
            </a>
            <a className="btn ghost" href="#play">
              Main Sekarang
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Ringkasan website">
          <div className="floating-card main-card">
            <span className="big-icon">🎮</span>
            <div>
              <strong>{games.length} Mini Game</strong>
              <p>Arcade, puzzle, trivia, refleks, dan game santai.</p>
            </div>
          </div>
          <div className="mini-stats">
            <Stat value="0" label="aset eksternal" />
            <Stat value="100%" label="React" />
            <Stat value="Vercel" label="ready" />
          </div>
        </div>
      </section>

      <section id="games" className="section-block">
        <div className="section-heading">
          <p className="eyebrow">Katalog game</p>
          <h2>Pilih game yang ingin dimainkan</h2>
          <p>Semua game berjalan langsung di browser, tanpa login dan tanpa database.</p>
        </div>

        <div className="game-grid">
          {games.map((game) => (
            <button
              type="button"
              key={game.id}
              className={cls("game-card", selected === game.id && "active")}
              onClick={() => chooseGame(game.id)}
            >
              <span className="game-icon">{game.icon}</span>
              <span className="pill-row">
                <span>{game.category}</span>
                <span>{game.level}</span>
              </span>
              <strong>{game.title}</strong>
              <small>{game.description}</small>
            </button>
          ))}
        </div>
      </section>

      <section id="play" className="play-section">
        <div className="play-header">
          <div>
            <p className="eyebrow">Sedang dimainkan</p>
            <h2>
              <span>{activeGame.icon}</span> {activeGame.title}
            </h2>
            <p>{activeGame.description}</p>
          </div>
          <div className="play-badges">
            <span>{activeGame.category}</span>
            <span>{activeGame.level}</span>
          </div>
        </div>
        <ActiveComponent key={activeGame.id} />
      </section>

      <footer className="footer">
        <strong>Vercel Game Hub</strong>
        <span>Next.js mini-game portal. Tambahkan game baru lewat komponen React di app/page.jsx.</span>
      </footer>
    </main>
  );
}

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");

  const winner = getTicTacToeWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const status = winner ? `Pemenang: ${winner}` : isDraw ? "Seri!" : `Giliran: ${turn}`;

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
        <p>Tips: blokir jalur lawan sebelum ia membuat tiga simbol sejajar.</p>
        <PrimaryButton onClick={reset}>Reset papan</PrimaryButton>
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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
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
      setMessage("Angkanya harus 1 sampai 100 ya.");
      return;
    }
    setTries((count) => count + 1);
    if (value === target) {
      setMessage(`Benar! Angkanya ${target}. Kamu menebak dalam ${tries + 1} percobaan.`);
    } else if (value < target) {
      setMessage("Terlalu kecil. Coba angka yang lebih besar.");
    } else {
      setMessage("Terlalu besar. Coba angka yang lebih kecil.");
    }
  };

  const reset = () => {
    setTarget(newTarget());
    setGuess("");
    setTries(0);
    setMessage("Game baru dimulai. Tebak angka antara 1 sampai 100.");
  };

  return (
    <div className="game-surface compact-game">
      <div className="score-strip">
        <span>Percobaan</span>
        <strong>{tries}</strong>
      </div>
      <form className="guess-form" onSubmit={submit}>
        <input
          type="number"
          min="1"
          max="100"
          value={guess}
          onChange={(event) => setGuess(event.target.value)}
          placeholder="Contoh: 42"
        />
        <PrimaryButton type="submit">Tebak</PrimaryButton>
      </form>
      <p className="game-message">{message}</p>
      <PrimaryButton variant="ghost small" onClick={reset}>
        Angka baru
      </PrimaryButton>
    </div>
  );
}

function RockPaperScissors() {
  const choices = [
    { name: "Batu", icon: "✊" },
    { name: "Gunting", icon: "✌️" },
    { name: "Kertas", icon: "✋" }
  ];
  const [round, setRound] = useState({ player: "?", bot: "?", result: "Pilih salah satu untuk mulai." });
  const [score, setScore] = useState({ player: 0, bot: 0, draw: 0 });

  const play = (choice) => {
    const bot = choices[Math.floor(Math.random() * choices.length)].name;
    const beats = { Batu: "Gunting", Gunting: "Kertas", Kertas: "Batu" };
    let result = "Seri!";
    let key = "draw";

    if (choice !== bot) {
      const playerWins = beats[choice] === bot;
      result = playerWins ? "Kamu menang!" : "Komputer menang.";
      key = playerWins ? "player" : "bot";
    }

    setRound({ player: choice, bot, result });
    setScore((current) => ({ ...current, [key]: current[key] + 1 }));
  };

  return (
    <div className="game-surface compact-game">
      <div className="rps-score">
        <span>Kamu: {score.player}</span>
        <span>Seri: {score.draw}</span>
        <span>Bot: {score.bot}</span>
      </div>
      <div className="rps-actions">
        {choices.map((choice) => (
          <button type="button" key={choice.name} className="choice-button" onClick={() => play(choice.name)}>
            <span>{choice.icon}</span>
            {choice.name}
          </button>
        ))}
      </div>
      <div className="versus-card">
        <p>
          Kamu <strong>{round.player}</strong> vs Bot <strong>{round.bot}</strong>
        </p>
        <h3>{round.result}</h3>
      </div>
    </div>
  );
}

const memorySymbols = ["🍓", "🧁", "🐱", "🚀", "🌻", "🎧"];

function createMemoryDeck() {
  return memorySymbols
    .flatMap((value) => [
      { id: `${value}-a`, value },
      { id: `${value}-b`, value }
    ])
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
    if (deck[first].value === deck[second].value) {
      setMatched((current) => [...current, deck[first].value]);
    }
    const timer = window.setTimeout(() => setFlipped([]), 700);
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
        <h3>{completed ? "Semua pasangan ditemukan!" : "Temukan pasangan kartu"}</h3>
        <p>Gerakan: {moves}</p>
        <p>Pasangan: {matched.length}/{memorySymbols.length}</p>
        <PrimaryButton onClick={reset}>Acak ulang</PrimaryButton>
      </div>
      <div className="memory-grid">
        {deck.map((card, index) => {
          const isOpen = flipped.includes(index) || matched.includes(card.value);
          return (
            <button
              type="button"
              key={card.id}
              className={cls("memory-card", isOpen && "open")}
              onClick={() => openCard(index)}
            >
              {isOpen ? card.value : "?"}
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
    const timer = window.setInterval(() => {
      setMole(Math.floor(Math.random() * 9));
    }, 650);
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
        <h3>{playing ? "Cepat klik mole!" : time === 0 ? "Waktu habis!" : "Siap bermain?"}</h3>
        <p>Skor: {score}</p>
        <p>Waktu: {time}s</p>
        <PrimaryButton onClick={start}>{playing ? "Mulai ulang" : "Mulai"}</PrimaryButton>
      </div>
      <div className="mole-grid">
        {Array.from({ length: 9 }).map((_, index) => (
          <button type="button" key={index} className="mole-hole" onClick={() => hit(index)}>
            <span>{playing && mole === index ? "🐹" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function SnakeGame() {
  const size = 16;
  const [snake, setSnake] = useState([
    [8, 8],
    [7, 8],
    [6, 8]
  ]);
  const [food, setFood] = useState([12, 8]);
  const [direction, setDirection] = useState([1, 0]);
  const [running, setRunning] = useState(false);
  const [alive, setAlive] = useState(true);
  const [score, setScore] = useState(0);
  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

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
    const startSnake = [
      [8, 8],
      [7, 8],
      [6, 8]
    ];
    setSnake(startSnake);
    setFood([12, 8]);
    setDirection([1, 0]);
    setRunning(false);
    setAlive(true);
    setScore(0);
  };

  useEffect(() => {
    const handleKey = (event) => {
      const map = {
        ArrowUp: [0, -1],
        ArrowDown: [0, 1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
        w: [0, -1],
        s: [0, 1],
        a: [-1, 0],
        d: [1, 0]
      };
      const next = map[event.key];
      if (!next) return;
      event.preventDefault();
      setDirection((current) => {
        if (current[0] + next[0] === 0 && current[1] + next[1] === 0) return current;
        return next;
      });
      if (alive) setRunning(true);
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
        } else {
          nextSnake.pop();
        }
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
        <h3>{alive ? (running ? "Snake berjalan" : "Tekan Start atau tombol arah") : "Game over"}</h3>
        <p>Skor: {score}</p>
        <p>Kontrol: tombol panah atau W A S D.</p>
        <div className="button-row">
          <PrimaryButton onClick={() => alive && setRunning(true)}>Start</PrimaryButton>
          <PrimaryButton variant="ghost small" onClick={reset}>Reset</PrimaryButton>
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

function empty2048Board() {
  return Array.from({ length: 4 }, () => Array(4).fill(0));
}

function add2048Tile(board) {
  const next = board.map((row) => [...row]);
  const empty = [];
  next.forEach((row, r) => row.forEach((value, c) => value === 0 && empty.push([r, c])));
  if (!empty.length) return next;
  const [r, c] = empty[Math.floor(Math.random() * empty.length)];
  next[r][c] = Math.random() < 0.9 ? 2 : 4;
  return next;
}

function create2048Board() {
  return add2048Tile(add2048Tile(empty2048Board()));
}

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
    } else {
      result.push(values[index]);
    }
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

  const changed = JSON.stringify(board) !== JSON.stringify(next);
  return { board: next, gained, changed };
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

  const reset = () => {
    setBoard(create2048Board());
    setScore(0);
    setStatus("playing");
  };

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
        <h3>{status === "won" ? "Kamu mencapai 2048!" : status === "lost" ? "Tidak ada gerakan lagi." : "Gabungkan angka"}</h3>
        <p>Skor: {score}</p>
        <p>Terbaik: {best}</p>
        <PrimaryButton onClick={reset}>Game baru</PrimaryButton>
        <div className="pad-controls" aria-label="Kontrol 2048">
          <span />
          <button type="button" onClick={() => performMove("up")}>↑</button>
          <span />
          <button type="button" onClick={() => performMove("left")}>←</button>
          <button type="button" onClick={() => performMove("down")}>↓</button>
          <button type="button" onClick={() => performMove("right")}>→</button>
        </div>
      </div>
      <div className="board-2048">
        {board.flat().map((value, index) => (
          <span key={index} className={cls("tile-2048", value && `tile-${Math.min(value, 2048)}`)}>
            {value || ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function createMineBoard() {
  const size = 6;
  const mineCount = 7;
  const cells = Array.from({ length: size * size }, (_, index) => ({
    index,
    mine: false,
    count: 0,
    revealed: false
  }));

  const mines = new Set();
  while (mines.size < mineCount) mines.add(Math.floor(Math.random() * cells.length));
  mines.forEach((index) => {
    cells[index].mine = true;
  });

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

  const reset = () => {
    setBoard(createMineBoard());
    setStatus("playing");
  };

  const open = (index) => {
    if (status !== "playing" || board[index].revealed) return;
    const next = board.map((cell) => ({ ...cell }));
    if (next[index].mine) {
      next.forEach((cell) => {
        if (cell.mine) cell.revealed = true;
      });
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
        <h3>{status === "won" ? "Semua area aman terbuka!" : status === "lost" ? "Boom! Kena ranjau." : "Cari petak aman"}</h3>
        <p>Ranjau: {mineCount}</p>
        <p>Petak aman tersisa: {safeLeft}</p>
        <PrimaryButton onClick={reset}>Papan baru</PrimaryButton>
      </div>
      <div className="mine-board">
        {board.map((cell) => (
          <button
            type="button"
            key={cell.index}
            className={cls("mine-cell", cell.revealed && "revealed", cell.mine && cell.revealed && "mine")}
            onClick={() => open(cell.index)}
          >
            {cell.revealed ? (cell.mine ? "💣" : cell.count || "") : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

const quizQuestions = [
  {
    question: "Planet terbesar di tata surya adalah...",
    options: ["Mars", "Jupiter", "Venus", "Merkurius"],
    answer: "Jupiter"
  },
  {
    question: "HTML dipakai untuk...",
    options: ["Membuat struktur halaman", "Mengedit video", "Menyimpan uang", "Mengatur baterai"],
    answer: "Membuat struktur halaman"
  },
  {
    question: "Ibu kota Indonesia saat ini adalah...",
    options: ["Bandung", "Surabaya", "Jakarta", "Medan"],
    answer: "Jakarta"
  },
  {
    question: "Hasil dari 7 x 8 adalah...",
    options: ["54", "56", "64", "78"],
    answer: "56"
  },
  {
    question: "CSS berfungsi untuk...",
    options: ["Menata tampilan", "Menyolder kabel", "Memasak nasi", "Mengirim satelit"],
    answer: "Menata tampilan"
  }
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

  const next = () => {
    setSelected(null);
    setIndex((value) => value + 1);
  };

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
  };

  if (completed) {
    return (
      <div className="game-surface compact-game result-panel">
        <h3>Quiz selesai!</h3>
        <p>Skor kamu: {score}/{quizQuestions.length}</p>
        <PrimaryButton onClick={reset}>Main lagi</PrimaryButton>
      </div>
    );
  }

  return (
    <div className="game-surface compact-game">
      <div className="quiz-progress">Pertanyaan {index + 1}/{quizQuestions.length}</div>
      <h3>{current.question}</h3>
      <div className="quiz-options">
        {current.options.map((option) => (
          <button
            type="button"
            key={option}
            className={cls(
              "quiz-option",
              selected && option === current.answer && "correct",
              selected === option && option !== current.answer && "wrong"
            )}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className="quiz-feedback">
          <strong>{selected === current.answer ? "Benar!" : "Belum tepat."}</strong>
          <PrimaryButton onClick={next}>{index === quizQuestions.length - 1 ? "Lihat skor" : "Lanjut"}</PrimaryButton>
        </div>
      )}
    </div>
  );
}

const wordBank = [
  { word: "vercel", hint: "Platform deploy favorit untuk Next.js" },
  { word: "react", hint: "Library UI berbasis komponen" },
  { word: "game", hint: "Sesuatu yang sedang kamu buat" },
  { word: "kode", hint: "Ditulis programmer" },
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
      setMessage("Benar! Klik kata baru untuk lanjut.");
    } else {
      setMessage("Belum tepat. Coba perhatikan hint-nya.");
    }
  };

  return (
    <div className="game-surface compact-game word-game">
      <div className="score-strip">
        <span>Skor</span>
        <strong>{score}</strong>
      </div>
      <div className="scrambled-word">{scrambled}</div>
      <p>Hint: {item.hint}</p>
      <form className="guess-form" onSubmit={check}>
        <input value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Jawaban kamu" />
        <PrimaryButton type="submit">Cek</PrimaryButton>
      </form>
      <p className="game-message">{message}</p>
      <PrimaryButton variant="ghost small" onClick={next}>Kata baru</PrimaryButton>
    </div>
  );
}

function ReactionTest() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Klik mulai, tunggu hijau, lalu tap secepat mungkin.");
  const [startTime, setStartTime] = useState(0);
  const [last, setLast] = useState(null);
  const [best, setBest] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const start = () => {
    window.clearTimeout(timerRef.current);
    setStatus("waiting");
    setMessage("Tunggu... jangan klik dulu.");
    setLast(null);
    const delay = 1000 + Math.random() * 3000;
    timerRef.current = window.setTimeout(() => {
      setStatus("go");
      setStartTime(Date.now());
      setMessage("Sekarang! Klik/tap area ini.");
    }, delay);
  };

  const tap = () => {
    if (status === "waiting") {
      window.clearTimeout(timerRef.current);
      setStatus("tooSoon");
      setMessage("Terlalu cepat! Mulai lagi dan tunggu warna hijau.");
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
        <strong>{status === "go" ? "KLIK!" : status === "waiting" ? "Tunggu..." : "Tes Refleks"}</strong>
        <span>{message}</span>
      </button>
      <div className="rps-score">
        <span>Terakhir: {last ? `${last} ms` : "-"}</span>
        <span>Terbaik: {best ? `${best} ms` : "-"}</span>
      </div>
      <PrimaryButton onClick={start}>Mulai</PrimaryButton>
    </div>
  );
}
