# Shashank Chaudhary's Portfolio

A fast, single-page developer portfolio. Plain HTML/CSS/JS with **no build step and no dependencies**, so it deploys anywhere static.

```
index.html      → markup & content (edit your copy here)
styles.css      → all styling (colors live in :root at the top)
script.js       → nav, scroll reveals, count-up stats, typewriter
```

## Run locally
Just open `index.html` in a browser, or serve it:
```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Before you publish
- [ ] Drop your résumé PDF in this folder named **`ShashankBaseResume.pdf`** (the "Résumé" button links to it).
- [ ] Fill in real **GitHub / LinkedIn / LeetCode** URLs in the Contact section of `index.html`.
- [ ] Add real links to the **BitTorrent** repo and the **Springer paper** (the `↗` icons on each project card).
- [ ] Tweak the brand colors in `styles.css` → `:root` (`--accent`, `--accent-2`) if you want.

## Hosting recommendations
All three below are **free**, support custom domains + HTTPS, and host static sites.

| Option | Best for | Notes |
|---|---|---|
| **GitHub Pages** | Simplest, recruiters see your GitHub | Push to a repo, enable Pages. Great default. |
| **Cloudflare Pages** | Fastest global CDN | Connect repo, auto-deploys on push. |
| **Netlify / Vercel** | Nicest DX, instant previews | Drag-and-drop or connect repo. |

**My pick: GitHub Pages.** It keeps everything in one place recruiters already look (your GitHub), and a clean `username.github.io` URL is recognizable. Later, point a custom domain (e.g. `shashankchaudhary.dev`, ~$10/yr) at it for an extra-polished touch.

### Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
# create an empty repo on github.com first, then:
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```
Then on GitHub: **Settings → Pages → Source: `main` / root → Save**.
Live in ~1 min at `https://<your-username>.github.io/<repo>/`.

> Tip: name the repo `<your-username>.github.io` to serve it at the clean root URL with no `/repo/` suffix.
