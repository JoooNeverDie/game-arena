# Vercel Game Hub

Website portal mini-game casual berbasis **Next.js + React**. Cocok untuk deploy di Vercel.

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

1. Upload project ini ke GitHub.
2. Buka https://vercel.com/new.
3. Import repository kamu.
4. Framework akan terdeteksi sebagai **Next.js**.
5. Klik **Deploy**.

Tidak perlu konfigurasi tambahan.

## Kustomisasi

- Edit daftar game dan kartu di `app/page.jsx`.
- Edit warna/desain di `app/globals.css`.
- Ganti nama website pada `app/layout.jsx` dan bagian hero di `app/page.jsx`.
