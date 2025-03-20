# SpaceX Rocket Info

## Overview
SpaceX Rocket Info adalah aplikasi berbasis Vue.js yang menampilkan informasi tentang roket SpaceX menggunakan data dari API SpaceX. Pengguna dapat melihat daftar roket, detail masing-masing roket, serta menambahkan data roket baru.

## Features
- **Daftar Roket**: Menampilkan daftar roket dengan gambar, nama, dan tanggal penerbangan pertama.
- **Detail Roket**: Menyediakan informasi lengkap mengenai setiap roket.
- **Pencarian & Sorting**: Pengguna dapat mencari dan mengurutkan daftar roket berdasarkan nama dan tanggal penerbangan pertama.
- **Tambah Roket**: Form untuk menambahkan roket baru ke dalam daftar.

## Technologies Used
- **Vue.js 3** - Framework utama
- **Vue Router** - Navigasi antar halaman
- **Axios** - Mengambil data dari API SpaceX
- **SCSS** - Styling aplikasi

## Installation
1. Clone repository:
   ```sh
   git clone https://github.com/feyerin/allo-bank-frontend-test
   cd allo-bank-fronend-test
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Jalankan aplikasi:
   ```sh
   npm run dev
   ```

## API
Aplikasi ini menggunakan API SpaceX:
- **Endpoint**: [https://api.spacexdata.com/v4/rockets](https://api.spacexdata.com/v4/rockets)
- **Metode HTTP**:
  - `GET` untuk mengambil daftar roket
  - `POST` untuk menambahkan roket baru

