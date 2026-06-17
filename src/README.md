# Get Inspired — Cannes Lions 2026

Landing page for the **Get Inspired** initiative at Cannes Lions 2026 — a 5-day, invite-only programme aboard a super yacht on the French Riviera.

## Live structure

Three sections:

1. **Hero** — French Riviera scene with Cannes lion + "Official Cannes Lions Partner" badge; three treatments (Cover / Type-first / Split)
2. **The Week** — themed highlights (World Cup, Get Inspired Celebration, themes)
3. **Get Involved** — 4 opportunity cards (VIP hosting, yacht activations, sponsor & programming, guest attendance) that deep-link to the Invite form with the right interest pre-selected
4. **Request an Invite** — capture form, two layouts (Dispatch / Letterpress)

A floating **Tweaks** panel exposes variation, hero treatment, type pairing, palette, density.

## Files

```
index.html              Entry point — loads React, Babel, fonts, and the JSX modules
app.jsx                 Root component, theme/palette + type pairing, Tweaks panel
sections.jsx            Hero / The Week / Get Involved / Invite components (all variations)
riviera.jsx             SVG fallback Riviera scene (currently unused — photo is on)
tweaks-panel.jsx        Tweaks panel shell + form-control helpers

Inspired (standalone source).html   Source for the offline bundle (rewritten to use
                                    window.__resources for the Unsplash hero image)
sections-standalone.jsx             Auto-generated companion for the offline source
Get Inspired.html                   Pre-built standalone HTML (3.3 MB, fully offline)

assets/                 Local images — Cannes lion logo, hero photo
uploads/                Raw uploads
```

## Bundling for deploy

`/index.html` (at the project root) is the single-file deployable bundle generated from `src/Inspired (standalone source).html`.

**Deploy targets (inspiredcannes.com root):**
- `index.html` — the bundle (everything inlined)
- `og.png` — social share image (kept external so crawlers can fetch it)

**To re-bundle after edits:**

1. Edit `.jsx` / source HTML as normal
2. Run super_inline_html on `src/Inspired (standalone source).html` → `index.html`
3. **Re-inject OG meta tags into the outer `<head>` of the bundled `index.html`** (see block below)

### Why the OG meta injection step is required

The bundler wraps the page in a JS "unpacker" shell — the real `<head>` lives inside a `<script type="__bundler/template">` and only materializes at runtime. Social crawlers (Facebook, LinkedIn, Twitter/X, Slack, Discord, iMessage) **do not execute JavaScript**, so any `og:` meta we put inside the source HTML is invisible to them.

To fix, after every re-bundle, paste this block into the outer `<head>` of `/index.html` (right after `<title>`):

```html
<meta name="description" content="A first-of-its-kind impact initiative aboard a super yacht on the French Riviera during Cannes Lions 2026. By invitation." />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://inspiredcannes.com/" />
<meta property="og:title" content="Get Inspired — Cannes Lions 2026" />
<meta property="og:description" content="A first-of-its-kind impact initiative aboard a super yacht on the French Riviera during Cannes Lions 2026. By invitation." />
<meta property="og:image" content="https://inspiredcannes.com/og.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Get Inspired — Cannes Lions 2026, super yachts on the French Riviera" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Get Inspired — Cannes Lions 2026" />
<meta name="twitter:description" content="A first-of-its-kind impact initiative aboard a super yacht on the French Riviera. By invitation." />
<meta name="twitter:image" content="https://inspiredcannes.com/og.png" />
```

### Validating after deploy

- Facebook / Instagram / Messenger: https://developers.facebook.com/tools/debug
- LinkedIn: https://www.linkedin.com/post-inspector/
- Twitter / X: https://cards-dev.twitter.com/validator

If a platform caches an old preview, use each tool's "Scrape Again" / refresh button.

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

Hosted by **FMC × FBRC.ai × INSPIRED** at Cannes Lions 2026.
