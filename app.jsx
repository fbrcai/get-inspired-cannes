// app.jsx — root: palettes, type pairings, layout glue, tweaks panel.

const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakRadio,
        TweakSelect, TweakToggle, TweakColor, TweakText, TweakButton } = window;

// ── Themes ────────────────────────────────────────────────────────────────
const PALETTES = {
  ivory: {
    label: 'Ivory & Brass',
    vars: {
      '--bg':              '#F4EFE5',
      '--bg-2':            '#EDE6D6',
      '--bg-deep':         '#171513',
      '--ink':             '#1A1815',
      '--ink-2':           '#6B655B',
      '--accent':          '#9A7235',
      '--rule':            'rgba(26,24,21,0.18)',
      '--card':            '#FAF5E9',
      '--portrait-bg':     '#E6DECA',
      '--portrait-stripe': 'rgba(26,24,21,0.05)',
      '--hero-img-bg':     '#1B2C3E',
      '--hero-img-stripe': 'rgba(245,225,180,0.10)',
      '--hero-fg':         '#F5F1E8',
    },
  },
  midnight: {
    label: 'Midnight Riviera',
    vars: {
      '--bg':              '#0E1B2C',
      '--bg-2':            '#0A1623',
      '--bg-deep':         '#070F1A',
      '--ink':             '#F1EADD',
      '--ink-2':           '#9CA7B3',
      '--accent':          '#D4A857',
      '--rule':            'rgba(241,234,221,0.18)',
      '--card':            '#13243A',
      '--portrait-bg':     '#1A2D45',
      '--portrait-stripe': 'rgba(241,234,221,0.06)',
      '--hero-img-bg':     '#15293F',
      '--hero-img-stripe': 'rgba(212,168,87,0.10)',
      '--hero-fg':         '#F5F1E8',
    },
  },
  bone: {
    label: 'Bone & Cobalt',
    vars: {
      '--bg':              '#F6F4ED',
      '--bg-2':            '#FFFFFF',
      '--bg-deep':         '#0B1B3E',
      '--ink':             '#0F1A2E',
      '--ink-2':           '#5A6478',
      '--accent':          '#1F3FA0',
      '--rule':            'rgba(15,26,46,0.16)',
      '--card':            '#FFFFFF',
      '--portrait-bg':     '#E4E0D3',
      '--portrait-stripe': 'rgba(15,26,46,0.07)',
      '--hero-img-bg':     '#16264E',
      '--hero-img-stripe': 'rgba(231,217,178,0.10)',
      '--hero-fg':         '#F6F4ED',
    },
  },
};

const TYPE_PAIRS = {
  editorial: { label: 'Editorial', display: 'DM Serif Display', body: 'DM Sans' },
  classic:   { label: 'Classic Yacht', display: 'Cormorant Garamond', body: 'Geist' },
  modern:    { label: 'Modern Cut', display: 'Playfair Display', body: 'Manrope' },
};

function applyTheme(palette, pairing) {
  const root = document.documentElement;
  const p = PALETTES[palette] || PALETTES.ivory;
  Object.entries(p.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  const pair = TYPE_PAIRS[pairing] || TYPE_PAIRS.editorial;
  root.style.setProperty('--font-display', `'${pair.display}'`);
  root.style.setProperty('--font-body',    `'${pair.body}'`);
}

// ── Footer (minimal — out of scope but anchors the page) ──────────────────
function Footer() {
  return (
    <footer style={{
      background: 'var(--bg-deep)', color: 'var(--bg)',
      padding: 'clamp(36px, 5vw, 56px) clamp(20px, 4vw, 56px)',
    }}>
      <div className="r-footer" style={{
        maxWidth: 1480, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) auto', gap: 28,
        alignItems: 'end',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span className="display ital" style={{ fontSize: 32 }}>Get Inspired.</span>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', opacity: 0.75 }}>
            FMC × FBRC.AI × INSPIRED · CANNES LIONS · 22 — 26 JUNE 2026
          </span>
        </div>
        <a href="#" style={{
          color: 'inherit', textDecoration: 'none',
          padding: '14px 24px', border: '0.5px solid currentColor', borderRadius: 999,
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>fmcpartnerships@franchisemediacollective.com →</a>
      </div>
    </footer>
  );
}

// ── Optional baseline grid overlay ────────────────────────────────────────
function GridOverlay() {
  return (
    <div aria-hidden style={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999,
      background:
        'linear-gradient(to right, rgba(255,80,80,0.08) 0.5px, transparent 0.5px) 0 0 / calc(100% / 12) 100%',
      mixBlendMode: 'multiply',
    }} />
  );
}

// ── App ───────────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  React.useEffect(() => {
    applyTheme(t.palette, t.typePairing);
  }, [t.palette, t.typePairing]);

  // Variation B forces a slightly different palette feel by default? No — keep palette independent.
  return (
    <React.Fragment>
      {t.showGrid && <GridOverlay />}
      <window.Hero t={t} />
      <window.Agenda t={t} />
      <window.Invite t={t} />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction" />
        <TweakRadio
          label="Variation"
          value={t.variation}
          options={[
            { value: 'A', label: 'A · Postcard' },
            { value: 'B', label: 'B · Manifesto' },
          ]}
          onChange={(v) => setTweak('variation', v)}
        />

        <TweakSection label="Hero" />
        <TweakSelect
          label="Treatment"
          value={t.heroTreatment}
          options={[
            { value: 'cover',     label: 'Cover · full-bleed' },
            { value: 'typefirst', label: 'Type-first · manifesto' },
            { value: 'split',     label: 'Split · image + type' },
          ]}
          onChange={(v) => setTweak('heroTreatment', v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Pairing"
          value={t.typePairing}
          options={[
            { value: 'editorial', label: 'Editorial · DM Serif + DM Sans' },
            { value: 'classic',   label: 'Classic Yacht · Cormorant + Geist' },
            { value: 'modern',    label: 'Modern Cut · Playfair + Manrope' },
          ]}
          onChange={(v) => setTweak('typePairing', v)}
        />

        <TweakSection label="Palette" />
        <TweakRadio
          label="Theme"
          value={t.palette}
          options={[
            { value: 'ivory',    label: 'Ivory' },
            { value: 'midnight', label: 'Midnight' },
            { value: 'bone',     label: 'Bone' },
          ]}
          onChange={(v) => setTweak('palette', v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'comfy']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakToggle
          label="Show 12-col grid"
          value={t.showGrid}
          onChange={(v) => setTweak('showGrid', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
