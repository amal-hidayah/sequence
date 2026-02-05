# Kopi Kenangan Website

Website scrollytelling untuk Kopi Kenangan dengan animasi sequence yang immersive.

## Deploy ke Netlify

### Cara 1: Deploy via Git (Recommended)

1. **Push ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect ke Netlify**
   - Login ke [netlify.com](https://netlify.com)
   - Klik "Add new site" > "Import an existing project"
   - Pilih GitHub dan authorize
   - Pilih repository Anda
   - Build settings akan otomatis terdeteksi dari `netlify.toml`
   - Klik "Deploy site"

### Cara 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login ke Netlify**
   ```bash
   netlify login
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Cara 3: Manual Deploy

1. **Build project**
   ```bash
   npm run build
   ```

2. **Drag & Drop**
   - Login ke [netlify.com](https://netlify.com)
   - Drag folder `.next` ke Netlify dashboard

## Environment Variables

Tidak ada environment variables yang diperlukan untuk project ini.

## Tech Stack

- **Framework**: Next.js 16
- **Styling**: Tailwind CSS 4
- **Animation**: Motion (Framer Motion)
- **Fonts**: Caveat (handwritten), Poppins (body)
- **Smooth Scroll**: Lenis

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Features

- ✨ Scrollytelling dengan 240 frame sequence
- 🎨 Design sesuai identitas Kopi Kenangan (hitam, merah, cream)
- 📱 Fully responsive (mobile-first)
- ⚡ Smooth scrolling dengan Lenis
- 🎭 Animasi handwritten typography
- 🖼️ Lazy loading images dari Unsplash

## Performance Tips

- Gambar sequence sudah dioptimasi (240 frames @ ~800KB total)
- Next.js Image optimization untuk gambar statis
- Lazy loading untuk components
- CSS animations menggunakan GPU acceleration

---

Made with ❤️ for Kopi Kenangan
