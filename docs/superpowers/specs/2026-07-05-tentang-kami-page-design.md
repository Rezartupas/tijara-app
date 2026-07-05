# Design: Header Simplification & Halaman Tentang Kami

**Date:** 2026-07-05
**Status:** Approved

## Summary

Menyederhanakan header dengan menghapus teks "Pembiayaan Syariah" dan seluruh menu navigasi, menggantinya dengan satu tombol "Tentang Kami". Membuat halaman `/tentang-kami` sebagai halaman statis profil perusahaan.

## Changes

### 1. Header (`src/app/layout.tsx`)

**Before:**
- Logo + teks "Pembiayaan Syariah"
- Navigasi: Beranda, Simulasi, Pengajuan

**After:**
- Logo saja (tanpa teks tagline)
- Tombol outline "Tentang Kami" yang mengarah ke `/tentang-kami`

### 2. Halaman `/tentang-kami` (file baru)

- Route: `src/app/tentang-kami/page.tsx`
- Layout: Section dengan judul, deskripsi PT. Tumbuh Bangun Sejahtera
- Template standar yang bisa diedit user nanti
- Informasi: profil perusahaan, kontak, dan lokasi

## Components

Tidak ada komponen baru — hanya memodifikasi layout.tsx dan membuat halaman statis.

## Routing

| Route | File | Keterangan |
|-------|------|------------|
| `/tentang-kami` | `src/app/tentang-kami/page.tsx` | Halaman statis tentang perusahaan |
