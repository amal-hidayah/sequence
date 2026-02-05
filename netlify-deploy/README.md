# 📦 Manual Deployment ke Netlify - Kopi Kenangan Website

Folder ini berisi semua file yang sudah siap untuk di-deploy ke Netlify secara manual.

## 📂 Struktur Folder

```
netlify-deploy/
├── .next/          # Build output dari Next.js
├── public/         # Asset statis (logo, sequence images, dll)
├── package.json    # Dependencies dan scripts
├── netlify.toml    # Konfigurasi Netlify
└── README.md       # File ini
```

## 🚀 Cara Deploy ke Netlify (Manual)

### Langkah 1: Compress Folder
1. Buka File Explorer
2. Klik kanan folder `netlify-deploy`
3. Pilih **Send to > Compressed (zipped) folder**
4. Atau gunakan software seperti WinRAR/7-Zip untuk compress
5. Nama file ZIP: `netlify-deploy.zip`

### Langkah 2: Deploy ke Netlify
1. Buka https://app.netlify.com
2. Login dengan akun Anda
3. Klik **Add new site** > **Deploy manually**
4. Drag & drop file `netlify-deploy.zip` ke area upload
5. Tunggu proses upload dan build selesai

### Langkah 3: Konfigurasi (Jika Diperlukan)
Jika deployment gagal, periksa Build Settings di Netlify Dashboard:
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 20

## ⚡ Alternative: Netlify CLI

Jika ingin deploy lebih cepat via terminal:

```bash
# Install Netlify CLI (sekali saja)
npm install -g netlify-cli

# Login ke Netlify
netlify login

# Deploy dari folder ini
cd netlify-deploy
netlify deploy --prod
```

## 📝 Catatan Penting

- Folder ini sudah berisi build hasil production (`npm run build`)
- Semua 240 frame sequence images sudah tercopy di `public/sequence/`
- Logo Kopi Kenangan ada di `public/logo/logo.png`
- Jangan edit file di dalam folder ini, edit di folder project utama

## 🔄 Update Website

Jika ada perubahan di website:
1. Edit file di folder project utama (bukan di folder `netlify-deploy`)
2. Jalankan `npm run build` di folder utama
3. Copy ulang file .next dan public ke folder netlify-deploy
4. Upload ulang ke Netlify

## 🆘 Troubleshooting

**Problem**: Upload stuck atau gagal
- **Solusi**: Compress dulu jadi ZIP sebelum upload

**Problem**: Website error setelah deploy
- **Solusi**: Pastikan Node version di Netlify Settings adalah v20

**Problem**: Images tidak muncul
- **Solusi**: Cek apakah folder `public/sequence` tercopy dengan benar (harus ada 240 files)

## 📞 Support

Jika ada masalah saat deploy, hubungi tim developer atau cek dokumentasi Netlify:
- https://docs.netlify.com/site-deploys/create-deploys/

---

✅ **Siap Deploy!** Folder ini sudah lengkap dan siap di-upload ke Netlify.
