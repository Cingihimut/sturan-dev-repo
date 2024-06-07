# Sturan E-Crowdfunding Contract

Proyek ini adalah implementasi dari kontrak pintar Ethereum untuk platform E-crowdfunding. Kami menggunakan kerangka kerja Hardhat untuk pengembangan dan pengujian, serta Infura sebagai penyedia API Ethereum.

## Persyaratan

- Node.js v16.0.0 atau lebih baru
- npm v7.0.0 atau lebih baru
- Akun Infura

## Instalasi

1. Clone repositori ini
2. Jalankan `npm install` untuk menginstal dependensi
3. Buat file `.env` di direktori root dan isi dengan kredensial Infura Anda:

```env
INFURA_PROJECT_ID=Your-Infura-Project-Id
PRIVATE_KEY=Your-Ethereum-Private-Key

Penggunaan
Untuk menjalankan skrip Hardhat, Anda dapat menggunakan perintah npx hardhat <command>.

Contoh:

npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network sepolia
```

Kontribusi
Kontribusi dipersilakan! Silakan fork repositori ini dan buat Pull Request jika Anda memiliki perubahan yang ingin Anda tambahkan.

Semua kode ini tersedia secara opensource untuk kepentingan belajar dan tidak di perbolehkan melakukan duplikasi tanpa persetujuan pemilik repo

Lisensi
Proyek ini dilisensikan di bawah MIT License - lihat file LICENSE untuk detail.