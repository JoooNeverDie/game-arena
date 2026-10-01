# Game Arena

Website portal mini-game casual berbasis **Next.js + React**. Sudah memakai tema terang/gelap, ikon SVG custom, dan siap deploy ke Vercel.

## Game yang tersedia

- Tic Tac Toe
- Snake
- Memory Match
- Tebak Angka
- Batu Gunting Kertas
- Whack-a-Mole
- 2048 Mini
- Minesweeper Lite
- Quiz Cepat
- Susun Kata
- Tes Refleks

## Jalankan lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Deploy ke Vercel

1. Upload isi project ini ke GitHub.
2. Buka https://vercel.com/new.
3. Import repository.
4. Pilih framework **Next.js**.
5. Root Directory cukup `./` jika `package.json` ada di folder utama repo.
6. Klik **Deploy**.

Build command default:

```bash
npm run build
```

## Kustomisasi

- Edit daftar game dan komponen di `app/page.jsx`.
- Edit tampilan, animasi, dan warna tema di `app/globals.css`.
- Edit metadata website di `app/layout.jsx`.
