# The Narration Network — Signal Atlas

Static site, no build step. Open `index.html` directly, or serve the folder
with any static server.

## Structure

```
index.html    — markup (one file, no templating)
styles.css    — all styles, one file, organized top to bottom in the
                order sections appear on the page (see the banner
                comments inside: BASE, BRAND CARDS, VISUAL ENHANCEMENTS,
                SIGNAL CONSTELLATION, POLISH LAYER)
script.js     — all behavior, no dependencies, no build step
*.jpeg/.jpg/.webp — image assets, referenced by relative path
```

## Notes for whoever picks this up

- **No framework, no bundler.** Plain HTML/CSS/JS on purpose — drop it
  behind any static host as-is, or lift sections into a framework later.
- **Fonts** load from Google Fonts (Manrope + Sora) via the `<link>` tags
  in `<head>`. Swap for self-hosted fonts if you need to drop the
  external request.
- **`styles.css`** is written as layered sections (later sections in the
  file intentionally refine/override earlier ones — e.g. POLISH LAYER at
  the bottom fixes accessibility, mobile nav and a couple of visual bugs
  found in the sections above it). If you're hunting for a rule, check
  the bottom of the file first — it usually has the final word.
- **Mobile navigation** (`#menu-toggle` / `#mobile-menu`) is hand-rolled,
  no library. Logic lives in the "Mobile menu" block in `script.js`.
- **Scroll reveal** — elements get a `.reveal` class and animate in via
  `IntersectionObserver` (see bottom of `script.js`). Items sharing a
  parent stagger in sequence using a `--reveal-delay` CSS variable set
  per element. Respects `prefers-reduced-motion`.
- **Image fallback** — if a platform logo fails to load, JS swaps it for
  a colored initial tile instead of a broken-image icon (see the
  `.card>img` error handler in `script.js`).
- **Known gap**: all six "Website coming soon" cards currently link to
  `#`. Swap in real URLs once each sub-brand site is live.
