# Get Inspired — Cannes Lions 2026

Landing page for the **Get Inspired** initiative at Cannes Lions 2026 — a 5-day, invite-only programme aboard a super yacht on the French Riviera.

## Live structure

Three sections:

1. **Hero** — French Riviera scene, three treatments (Cover / Type-first / Split)
2. **Agenda** — 5-day programme, two layouts (Editorial / Timeline)
3. **Request an Invite** — capture form, two layouts (Dispatch / Letterpress)

A floating **Tweaks** panel exposes variation, hero treatment, type pairing, palette, density.

## Files

```
index.html              Entry point — loads React, Babel, fonts, and the JSX modules
app.jsx                 Root component, theme/palette + type pairing, Tweaks panel
sections.jsx            Hero / Agenda / Invite components (all variations)
riviera.jsx             SVG fallback Riviera scene (currently unused — photo is on)
tweaks-panel.jsx        Tweaks panel shell + form-control helpers

Inspired (standalone source).html   Source for the offline bundle (rewritten to use
                                    window.__resources for the Unsplash hero image)
sections-standalone.jsx             Auto-generated companion for the offline source
Get Inspired.html                   Pre-built standalone HTML (3.3 MB, fully offline)

assets/                 Local images
uploads/                Raw uploads (Cannes-Event.jpg)
```

## Running locally

No build step. Just serve the folder over any static server:

```bash
# Python
python3 -m http.server 8000

# Or with Node
npx serve .
```

Open `http://localhost:8000`. JSX is compiled in-browser by Babel (dev only — fine for previewing, not for production).

## The standalone export

`Get Inspired.html` is the same site bundled into a single self-contained HTML file with all assets (fonts, hero photo, scripts) inlined. It works offline and from any file:// URL — useful for sharing or pasting into an email.

To re-build it after edits:

1. Edit `sections.jsx` / `app.jsx` / etc. as normal
2. Re-run the build (see comment in `Inspired (standalone source).html`); current pipeline was a one-shot bundler — if you want a reproducible script, ping me

## Notes on production

This is a designer prototype, not a production build:

- **Babel in-browser**: replace with a real bundler (Vite/esbuild) before deploy. Move JSX to compiled JS, drop the Babel script.
- **Fonts**: currently pulled from Google Fonts; consider self-hosting (`woff2`) and using `font-display: swap`.
- **Hero image**: currently hot-linked from Unsplash. For production, download and self-host (see `assets/hero-cannes.jpg` as an alternative).
- **Form submission**: the Invite form is currently a no-op (sets local state). Wire it to your endpoint of choice (Formspree, Netlify Forms, Resend, etc.).
- **Analytics**: none wired in.

## Design system

- **Type pairings**: DM Serif Display + DM Sans (default) / Cormorant Garamond + Geist / Playfair Display + Manrope
- **Palettes**: Ivory & Brass / Midnight Riviera / Bone & Cobalt
- All palette colors are defined as CSS custom properties in `app.jsx` (see `PALETTES`)

## Credits

Hosted by **FMC × FBRC.ai × INSPIRED**. Cannes Lions, 22–26 June 2026.
