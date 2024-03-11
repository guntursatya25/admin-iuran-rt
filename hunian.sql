-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Waktu pembuatan: 11 Mar 2024 pada 14.23
-- Versi server: 8.0.30
-- Versi PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hunian`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(8, '2024_03_09_003341_penghuni_table', 2),
(9, '2024_03_09_023816_create_rumahs_table', 2),
(10, '2024_03_09_035733_create_riwayat_rumahs_table', 2),
(11, '2024_03_11_061022_create_pembayarans_table', 3);

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id` bigint UNSIGNED NOT NULL,
  `penghuni_id` bigint UNSIGNED DEFAULT NULL,
  `jumlah_iuran` int NOT NULL,
  `jenis_iuran` enum('bulanan','tahunan') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_bayar` enum('lunas','belum') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_uang` enum('masuk','keluar') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'masuk',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pembayaran`
--

INSERT INTO `pembayaran` (`id`, `penghuni_id`, `jumlah_iuran`, `jenis_iuran`, `status_bayar`, `status_uang`, `created_at`, `updated_at`) VALUES
(1, 4, 100000, 'bulanan', 'lunas', 'masuk', '2024-03-11 00:41:04', '2024-03-11 02:53:59'),
(2, NULL, 100000, 'bulanan', 'lunas', 'keluar', '2024-03-11 01:24:54', '2024-03-11 01:24:54'),
(3, 4, 100000, 'bulanan', 'lunas', 'masuk', '2024-03-11 02:51:00', '2024-02-21 02:58:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `penghuni`
--

CREATE TABLE `penghuni` (
  `penghuni_id` bigint UNSIGNED NOT NULL,
  `rumah_id` bigint UNSIGNED NOT NULL,
  `nama` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto_ktp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_huni` enum('kontrak','tetap','pindah') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'kontrak',
  `no_tlp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status_nikah` enum('sudah','belum') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'belum',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `penghuni`
--

INSERT INTO `penghuni` (`penghuni_id`, `rumah_id`, `nama`, `foto_ktp`, `status_huni`, `no_tlp`, `status_nikah`, `created_at`, `updated_at`) VALUES
(3, 1, 'Ahmad', 'foto_ktp/5a22551c-c023-4016-93f5-81b7a71d930b.jpg', 'kontrak', '12312312132', 'sudah', '2024-03-08 23:04:32', '2024-03-10 23:06:22'),
(4, 2, 'Anjayxxx4', 'foto_ktp/Untitled design (2).jpg', 'kontrak', '08943219191', 'sudah', '2024-03-10 01:48:06', '2024-03-10 18:04:38'),
(5, 2, 'Anjayxxx', 'foto_ktp/Untitled design (2).jpg', 'kontrak', '08943219191', 'sudah', '2024-03-10 01:49:25', '2024-03-10 01:49:25'),
(6, 3, 'Anjay2', 'foto_ktp/Anjay2', 'tetap', '08943219191', 'belum', '2024-03-10 18:43:22', '2024-03-10 18:43:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `riwayat_rumah`
--

CREATE TABLE `riwayat_rumah` (
  `riwayat_id` bigint UNSIGNED NOT NULL,
  `penghuni_id` bigint UNSIGNED NOT NULL,
  `rumah_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `riwayat_rumah`
--

INSERT INTO `riwayat_rumah` (`riwayat_id`, `penghuni_id`, `rumah_id`, `created_at`, `updated_at`) VALUES
(1, 3, 1, '2024-03-08 23:04:32', '2024-03-08 23:04:32'),
(2, 4, 2, '2024-03-10 01:48:06', '2024-03-10 01:48:06'),
(3, 5, 2, '2024-03-10 01:49:25', '2024-03-10 01:49:25'),
(4, 6, 3, '2024-03-10 18:43:22', '2024-03-10 18:43:22'),
(5, 3, 1, '2024-03-10 23:06:22', '2024-03-10 23:06:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `rumah`
--

CREATE TABLE `rumah` (
  `rumah_id` bigint UNSIGNED NOT NULL,
  `penghuni_id` bigint UNSIGNED DEFAULT NULL,
  `alamat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('terhuni','tidakhuni') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tidakhuni',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `rumah`
--

INSERT INTO `rumah` (`rumah_id`, `penghuni_id`, `alamat`, `status`, `created_at`, `updated_at`) VALUES
(1, NULL, 'ABC NO 1', 'terhuni', '2024-03-08 22:34:24', '2024-03-08 23:03:55'),
(2, NULL, 'ABC No 2', 'terhuni', '2024-03-08 22:56:30', '2024-03-10 01:48:06'),
(3, NULL, 'ass', 'terhuni', '2024-03-09 16:25:03', '2024-03-10 18:43:22'),
(4, NULL, 'ABC No 4', 'tidakhuni', '2024-03-09 16:28:25', '2024-03-09 16:28:25'),
(5, NULL, 'ABC NO 6', 'tidakhuni', '2024-03-10 18:41:07', '2024-03-10 18:41:07'),
(6, NULL, 'ABC NO 6', 'tidakhuni', '2024-03-10 18:41:12', '2024-03-10 18:41:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$12$TrEemUDgRXzdJVjifeIzZ.ntiahsIe9VKCmizSVcAXp72Sx62D7ze', '2024-03-08 21:21:44', '2024-03-08 21:21:44');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pembayaran_penghuni_id_foreign` (`penghuni_id`);

--
-- Indeks untuk tabel `penghuni`
--
ALTER TABLE `penghuni`
  ADD PRIMARY KEY (`penghuni_id`),
  ADD KEY `rumah_penghuni` (`rumah_id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indeks untuk tabel `riwayat_rumah`
--
ALTER TABLE `riwayat_rumah`
  ADD PRIMARY KEY (`riwayat_id`),
  ADD KEY `riwayat_rumah_penghuni_id_foreign` (`penghuni_id`),
  ADD KEY `riwayat_rumah_rumah_id_foreign` (`rumah_id`);

--
-- Indeks untuk tabel `rumah`
--
ALTER TABLE `rumah`
  ADD PRIMARY KEY (`rumah_id`),
  ADD KEY `rumah_penghuni_id_foreign` (`penghuni_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `penghuni`
--
ALTER TABLE `penghuni`
  MODIFY `penghuni_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `riwayat_rumah`
--
ALTER TABLE `riwayat_rumah`
  MODIFY `riwayat_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `rumah`
--
ALTER TABLE `rumah`
  MODIFY `rumah_id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `pembayaran_penghuni_id_foreign` FOREIGN KEY (`penghuni_id`) REFERENCES `penghuni` (`penghuni_id`);

--
-- Ketidakleluasaan untuk tabel `penghuni`
--
ALTER TABLE `penghuni`
  ADD CONSTRAINT `rumah_penghuni` FOREIGN KEY (`rumah_id`) REFERENCES `rumah` (`rumah_id`);

--
-- Ketidakleluasaan untuk tabel `riwayat_rumah`
--
ALTER TABLE `riwayat_rumah`
  ADD CONSTRAINT `riwayat_rumah_penghuni_id_foreign` FOREIGN KEY (`penghuni_id`) REFERENCES `penghuni` (`penghuni_id`),
  ADD CONSTRAINT `riwayat_rumah_rumah_id_foreign` FOREIGN KEY (`rumah_id`) REFERENCES `rumah` (`rumah_id`);

--
-- Ketidakleluasaan untuk tabel `rumah`
--
ALTER TABLE `rumah`
  ADD CONSTRAINT `rumah_penghuni_id_foreign` FOREIGN KEY (`penghuni_id`) REFERENCES `penghuni` (`penghuni_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
