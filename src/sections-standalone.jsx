// sections.jsx — Hero / Agenda / Invite, two variations on Agenda + Invite.

// ─── Shared ────────────────────────────────────────────────────────────────

// Highlights of the week — themes + signature moments. Not a confirmed daily schedule.
const HIGHLIGHTS = [
  {
    when: 'Live Moment',
    kind: 'Live · On Deck',
    title: 'World Cup Viewing Aboard',
    detail: 'Global sport, conversation, culture, and connection aboard.',
    accent: true,
  },
  {
    when: 'Across the Week',
    kind: 'Theme',
    title: 'The Future of Power',
    detail: 'AI, attention, influence, fandom and the forces reshaping industries and culture.',
  },
  {
    when: 'Signature Evening',
    kind: 'Flagship Gathering',
    title: 'The GET INSPIRED Celebration',
    detail: 'An intimate evening bringing together leaders across media, creativity, technology, philanthropy, and culture.',
    accent: true,
  },
  {
    when: 'Across the Week',
    kind: 'Theme',
    title: 'The New Creative Economy',
    detail: 'Creators, brands, AI, monetization, and the evolving architecture of cultural relevance.',
  },
];

// Ways to engage — partner / sponsor / activate / host / attend.
const OPPORTUNITIES = [
  {
    n: '01',
    kind: 'For Brands & Hosts',
    title: 'VIP Hosting',
    detail:
      'Curate your own delegation. Host a private breakfast, lunch, or dinner aboard for your clients, partners, or invited guests.',
    cta: 'Discuss hosting',
    interest: 'VIP hosting opportunity',
  },
  {
    n: '02',
    kind: 'For Brands & Agencies',
    title: 'Yacht Activations',
    detail:
      'Use the yacht as a canvas — installations, launches, demos, takeovers. High-touch, high-trust, walking distance from the Palais.',
    cta: 'Discuss an activation',
    interest: 'Yacht activation / brand presence',
  },
  {
    n: '03',
    kind: 'For Partners',
    title: 'Sponsor & Programming',
    detail:
      'Sponsor a theme, session, or evening. Co-create programming alongside our editorial partners and senior conveners.',
    cta: 'Discuss partnership',
    interest: 'Sponsorship / programming partner',
  },
  {
    n: '04',
    kind: 'For Individuals',
    title: 'Guest Attendance',
    detail:
      'Join as an invited guest. A small, hand-picked room of leaders shaping how brands and culture move.',
    cta: 'Request a guest invite',
    interest: 'Attending as a guest',
  },
];


const SectionLabel = ({ index, label }) =>
<div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
    <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.04em' }}>
      {String(index).padStart(2, '0')}
    </span>
    <span style={{ height: 0.5, width: 36, background: 'var(--rule)' }} />
    <span className="eyebrow">{label}</span>
  </div>;


// Film-grain texture for luxe feel
const Grain = () =>
<svg
  aria-hidden
  style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', opacity: 0.08, mixBlendMode: 'overlay'
  }}>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
      <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" />
  </svg>;


// ─── HERO ───────────────────────────────────────────────────────────────────

function Hero({ t }) {
  if (t.heroTreatment === 'typefirst') return <HeroTypeFirst t={t} />;
  if (t.heroTreatment === 'split') return <HeroSplit t={t} />;
  return <HeroCover t={t} />;
}

// Cover — full-bleed Riviera scene at golden hour
function HeroCover({ t }) {
  return (
    <section
      className="r-hero-cover"
      data-screen-label="01 Hero · Cover"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src={window.__resources && window.__resources.heroImg}
        alt="Super yacht on the French Riviera at golden hour"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 35%'
        }} />
      
      <Grain />
      {/* sky-to-water gradient suggestion */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
        'linear-gradient(180deg, rgba(8,10,18,0.30) 0%, rgba(8,10,18,0.10) 22%, rgba(8,10,18,0.15) 52%, rgba(8,10,18,0.62) 82%, rgba(8,10,18,0.85) 100%)'
      }} />
      {/* warm rim light from the right */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(60% 80% at 95% 30%, rgba(255,196,120,0.20), transparent 60%)',
        mixBlendMode: 'screen', pointerEvents: 'none'
      }} />

      <div style={{
        position: 'relative', minHeight: '100vh',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
        padding: 'clamp(20px, 3vw, 36px) clamp(20px, 4vw, 56px)',
        color: 'var(--hero-fg)'
      }}>
        {/* Top header: logo + partner badge */}
        <div className="r-hero-header" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 24, paddingTop: 4,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img
              src={window.__resources && window.__resources.lionLogo}
              alt="Cannes Lions"
              style={{
                width: 'clamp(118px, 11vw, 168px)',
                height: 'auto',
                opacity: 0.95,
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span className="mono" style={{
                fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--accent)', fontWeight: 600,
              }}>
                Official Partner
              </span>
              <span className="mono" style={{
                fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'var(--hero-fg)', opacity: 0.78,
              }}>
                Cannes Lions 2026 · 22 — 26 June
              </span>
            </div>
          </div>
          <a href="#invite" className="r-hero-nav-cta" style={{
            textDecoration: 'none', color: 'var(--hero-fg)',
            border: '0.5px solid currentColor', borderRadius: 999,
            padding: '10px 16px', fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: 10, opacity: 0.92,
          }}>
            Get involved →
          </a>
        </div>

        {/* Centerpiece */}
        <div className="r-hero-centerpiece" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 'clamp(16px, 2vw, 28px)', paddingBottom: 'clamp(8px, 1.5vw, 20px)' }}>
          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display), serif',
            fontWeight: 400,
            lineHeight: 0.86,
            letterSpacing: '-0.025em',
            fontSize: 'clamp(72px, 16vw, 280px)', color: "rgb(154, 114, 53)"

          }}>
            <span style={{ color: '#f5f4f1' }}>Get</span><br />
            <em style={{ fontStyle: 'italic', color: "rgb(245, 244, 241)" }}>Inspired.</em>
          </h1>

          <div className="r-hero-cta-row" style={{
            display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', alignItems: 'end',
            gap: 32, marginTop: 'clamp(8px, 1.5vw, 24px)'
          }}>
            <p className="display ital" style={{
              margin: 0, maxWidth: 560, fontSize: 'clamp(20px, 1.9vw, 30px)',
              lineHeight: 1.25, fontStyle: 'italic', color: 'var(--hero-fg)', opacity: 0.95
            }}>
              A first-of-its-kind impact initiative during Cannes Lions.
            </p>
            <a
              href="#invite"
              style={{
                textDecoration: 'none', color: 'var(--ink)', background: 'var(--accent)',
                borderRadius: 999,
                padding: '15px 24px', fontSize: 12, letterSpacing: '0.14em',
                textTransform: 'uppercase', whiteSpace: 'nowrap', fontWeight: 600,
                display: 'inline-flex', alignItems: 'center', gap: 12
              }}>
              Request an invite
              <span aria-hidden style={{ fontSize: 14 }}>→</span>
            </a>
          </div>
        </div>

        {/* Footer strip */}
        <div className="r-grid-4" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18,
          paddingTop: 24, borderTop: '0.5px solid rgba(255,255,255,0.25)',
          color: 'var(--hero-fg)', opacity: 0.92
        }}>
          <Stat label="Hosted by" value="FMC × FBRC.ai × INSPIRED" />
          <Stat label="Vessel" value="Yacht · Vieux Port" />
          <Stat label="Location" value="Walking distance from the Palais" />
          <Stat label="Attendance" value="By invitation" emph />
        </div>
      </div>
    </section>);

}

function Stat({ label, value, emph }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>{label}</span>
      <span className={emph ? 'display ital r-stat-emph' : ''} style={{
        fontSize: emph ? 22 : 13,
        fontWeight: emph ? 400 : 500,
        letterSpacing: emph ? '-0.01em' : '0',
        color: emph ? 'var(--accent)' : 'inherit'
      }}>{value}</span>
    </div>);

}

// Type-first — manifesto on cream
function HeroTypeFirst({ t }) {
  return (
    <section
      data-screen-label="01 Hero · Type-first"
      style={{
        minHeight: '100vh', position: 'relative',
        padding: 'clamp(24px, 4vw, 56px)',
        display: 'grid', gridTemplateRows: 'auto 1fr auto',
        background: 'var(--bg)', color: 'var(--ink)'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="display ital" style={{ fontSize: 22 }}>Inspired</span>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
          CANNES LIONS 2026
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'clamp(20px, 3vw, 40px)' }}>
        <SectionLabel index={0} label="An invitation, before a programme" />
        <h1 style={{
          margin: 0,
          fontFamily: 'var(--font-display), serif',
          fontWeight: 400,
          lineHeight: 0.94,
          letterSpacing: '-0.025em',
          fontSize: 'clamp(40px, 6.6vw, 112px)',
          maxWidth: '17ch'
        }}>
          Five days <em style={{ color: 'var(--accent)' }}>aboard.</em><br />
          One <em style={{ color: 'var(--accent)' }}>super yacht.</em><br />
          The conversations<br />
          Cannes can't hold on land.
        </h1>
        <div className="r-grid-2" style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(20px, 3vw, 60px)',
          maxWidth: 1100, marginTop: 12
        }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink)' }}>
            Get Inspired is a curated, invite-only programme aboard a super yacht
            on the French Riviera during Cannes Lions 2026. A focused week of small-room
            sessions, closed-door conversations, and a signature evening.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)' }}>
            We keep the room small on purpose. If you'd like to be part of it — as a guest,
            partner, or host — request an invite below.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 24, flexWrap: 'wrap' }}>
        <a href="#invite" style={{
          textDecoration: 'none', color: 'var(--bg)', background: 'var(--ink)',
          padding: '16px 28px', borderRadius: 999, fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase'
        }}>Request an invite →</a>
        <div className="mono" style={{ fontSize: 10, color: 'var(--ink-2)', letterSpacing: '0.14em' }}>
          HOSTED BY FMC × FBRC.AI × INSPIRED
        </div>
      </div>
    </section>);

}

// Split — image left, type right
function HeroSplit({ t }) {
  return (
    <section
      data-screen-label="01 Hero · Split"
      className="r-split"
      style={{
        minHeight: '100vh', display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
        background: 'var(--bg)', color: 'var(--ink)'
      }}>
      <div className="r-split-img" style={{ position: 'relative', flex: 1, minHeight: '100vh' }}>
        <img
          src={window.__resources && window.__resources.heroImg}
          alt="Super yacht on the French Riviera at golden hour"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }} />
        
        <Grain />
        <div style={{
          position: 'absolute', left: 28, bottom: 28, right: 28,
          color: 'var(--hero-fg)', display: 'flex',
          justifyContent: 'space-between', alignItems: 'end', gap: 16
        }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.85 }}>
            43°33′N · 7°01′E
          </span>
          <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.85 }}>
            JUNE 2026
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(28px, 5vw, 72px)', gap: 'clamp(16px, 2vw, 28px)'
      }}>
        <SectionLabel index={0} label="Cannes Lions 2026 · Aboard" />
        <h1 style={{
          margin: 0, fontFamily: 'var(--font-display), serif', fontWeight: 400,
          lineHeight: 0.9, letterSpacing: '-0.025em',
          fontSize: 'clamp(60px, 8vw, 150px)'
        }}>
          Get<br /><em style={{ color: 'var(--accent)' }}>Inspired.</em>
        </h1>
        <p className="display ital" style={{
          margin: 0, fontSize: 'clamp(20px, 2vw, 30px)', lineHeight: 1.3, maxWidth: 28 + 'ch'
        }}>
          Five days aboard a super yacht on the French Riviera — by invitation.
        </p>
        <a href="#invite" style={{
          alignSelf: 'flex-start', marginTop: 14, textDecoration: 'none',
          color: 'var(--ink)', background: 'var(--accent)',
          padding: '15px 26px', borderRadius: 999, fontSize: 12, fontWeight: 600,
          letterSpacing: '0.14em', textTransform: 'uppercase'
        }}>Request an invite →</a>
      </div>
    </section>);

}

// ─── THE WEEK + OPPORTUNITIES ──────────────────────────────────────────────

// Wrapper that renders both subsections — keeps the public Agenda contract.
function Agenda({ t }) {
  return (
    <React.Fragment>
      <TheWeek t={t} />
      <Opportunities t={t} />
    </React.Fragment>);
}

// ── THE WEEK ──────────────────────────────────────────────────────────────
function TheWeek({ t }) {
  return (
    <section
      id="week"
      data-screen-label="02 The Week"
      style={{
        background: 'var(--bg-2)', color: 'var(--ink)',
        padding: 'clamp(48px, 8vw, 120px) clamp(20px, 4vw, 56px)'
      }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel index={2} label="The Week · Highlights" />

        <div className="r-grid-2" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: 'clamp(20px, 4vw, 60px)', alignItems: 'end',
          margin: 'clamp(24px, 4vw, 56px) 0 clamp(36px, 5vw, 64px)'
        }}>
          <h2 className="display" style={{
            margin: 0, fontWeight: 400,
            fontSize: 'clamp(48px, 6.5vw, 110px)',
            lineHeight: 0.94, letterSpacing: '-0.02em'
          }}>
            Five days,<br />one <em style={{ color: 'var(--accent)' }}>super yacht.</em>
          </h2>
          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)',
            maxWidth: 50 + 'ch', paddingBottom: 12,
          }}>
            A focused programme of themed days, signature moments, and a few live ones
            we wouldn't miss — anchored by one question: how do we move culture forward, on purpose?
          </p>
        </div>

        <div className="r-week-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(14px, 1.6vw, 22px)',
        }}>
          {HIGHLIGHTS.map((h, i) => <HighlightCard key={h.title} h={h} i={i} />)}
        </div>
      </div>
    </section>);
}

function HighlightCard({ h, i }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        background: h.accent ? 'var(--card)' : 'transparent',
        border: '0.5px solid var(--rule)',
        borderColor: hover ? 'var(--accent)' : 'var(--rule)',
        borderRadius: 4,
        padding: 'clamp(22px, 2.4vw, 32px)',
        display: 'flex', flexDirection: 'column', gap: 14,
        minHeight: 220,
        transition: 'border-color 240ms ease, transform 240ms ease',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="mono" style={{
          fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--ink-2)',
        }}>{h.when}</span>
        <span className="mono" style={{
          fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: h.accent ? 'var(--accent)' : 'var(--ink-2)',
          border: '0.5px solid currentColor', padding: '5px 9px', borderRadius: 999,
        }}>{h.kind}</span>
      </div>
      <h3 className="display" style={{
        margin: 0, fontWeight: 400,
        fontSize: 'clamp(30px, 3.2vw, 46px)',
        lineHeight: 1.02, letterSpacing: '-0.015em',
        color: h.accent ? 'var(--ink)' : 'var(--ink)',
      }}>
        {h.accent ? <em style={{ color: 'var(--accent)' }}>{h.title}</em> : h.title}
      </h3>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 56 + 'ch' }}>
        {h.detail}
      </p>
    </article>);
}

// ── OPPORTUNITIES ─────────────────────────────────────────────────────────
function Opportunities({ t }) {
  const goto = (interest) => () => {
    try {
      window.dispatchEvent(new CustomEvent('inspired:set-interest', { detail: interest }));
    } catch (e) {}
    const el = document.getElementById('invite');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section
      id="involved"
      data-screen-label="03 Get Involved"
      style={{
        background: 'var(--bg-deep)', color: 'var(--bg)',
        padding: 'clamp(56px, 9vw, 140px) clamp(20px, 4vw, 56px)',
        position: 'relative', overflow: 'hidden',
      }}>
      <Grain />
      <div style={{ maxWidth: 1480, margin: '0 auto', position: 'relative' }}>
        <SectionLabel index={3} label="Get Involved" />

        <div className="r-grid-2" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
          gap: 'clamp(20px, 4vw, 60px)', alignItems: 'end',
          margin: 'clamp(24px, 4vw, 56px) 0 clamp(36px, 5vw, 64px)'
        }}>
          <h2 className="display" style={{
            margin: 0, fontWeight: 400,
            fontSize: 'clamp(48px, 6.5vw, 110px)',
            lineHeight: 0.94, letterSpacing: '-0.02em'
          }}>
            Be <em style={{ color: 'var(--accent)' }}>part</em> of it.
          </h2>
          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.55, opacity: 0.88,
            maxWidth: 52 + 'ch', paddingBottom: 12,
          }}>
            Brands, agencies, partners, and individuals shape Get Inspired together.
            Four ways in — pick the one that fits, or tell us your own.
          </p>
        </div>

        <div className="r-opps-grid" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'clamp(14px, 1.4vw, 18px)',
        }}>
          {OPPORTUNITIES.map((o) => <OpportunityCard key={o.title} o={o} goto={goto(o.interest)} />)}
        </div>
      </div>
    </section>);
}

function OpportunityCard({ o, goto }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column',
        background: hover ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.015)',
        border: '0.5px solid rgba(255,255,255,0.16)',
        borderColor: hover ? 'var(--accent)' : 'rgba(255,255,255,0.16)',
        borderRadius: 4,
        padding: 'clamp(22px, 2.2vw, 32px)',
        gap: 18,
        minHeight: 360,
        transition: 'border-color 240ms ease, background 240ms ease, transform 240ms ease',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: '0.14em', color: 'var(--accent)',
        }}>{o.n}</span>
        <span className="mono" style={{
          fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          opacity: 0.7,
        }}>{o.kind}</span>
      </div>

      <h3 className="display" style={{
        margin: '6px 0 0', fontWeight: 400,
        fontSize: 'clamp(28px, 2.6vw, 36px)',
        lineHeight: 1.02, letterSpacing: '-0.015em',
        color: 'var(--bg)',
      }}>{o.title}</h3>

      <p style={{
        margin: 0, fontSize: 14.5, lineHeight: 1.55, opacity: 0.86, flex: 1,
      }}>{o.detail}</p>

      <button
        type="button"
        onClick={goto}
        style={{
          appearance: 'none', border: 0, cursor: 'pointer',
          alignSelf: 'flex-start',
          background: hover ? 'var(--accent)' : 'transparent',
          color: hover ? 'var(--ink)' : 'var(--bg)',
          padding: '12px 20px', borderRadius: 999,
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          fontWeight: 600,
          border: '0.5px solid ' + (hover ? 'transparent' : 'rgba(255,255,255,0.4)'),
          transition: 'all 220ms ease',
          display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
        {o.cta}
        <span aria-hidden style={{ fontSize: 13 }}>→</span>
      </button>
    </article>);
}

// ── PRESS ───────────────────────────────────────────────────────────────────
function Press({ t }) {
  return (
    <section
      id="press"
      data-screen-label="04 Press"
      style={{
        background: 'var(--bg-2)', color: 'var(--ink)',
        padding: 'clamp(48px, 8vw, 120px) clamp(20px, 4vw, 56px)'
      }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel index={4} label="Press · In the News" />

        <div className="r-grid-2" style={{
          display: 'grid', gridTemplateColumns: 'minmax(0, 1.25fr) minmax(0, 1fr)',
          gap: 'clamp(20px, 4vw, 60px)', alignItems: 'end',
          margin: 'clamp(24px, 4vw, 56px) 0 clamp(36px, 5vw, 64px)'
        }}>
          <h2 className="display" style={{
            margin: 0, fontWeight: 400,
            fontSize: 'clamp(48px, 6.5vw, 110px)',
            lineHeight: 0.94, letterSpacing: '-0.02em'
          }}>
            In the <em style={{ color: 'var(--accent)' }}>press.</em>
          </h2>
          <p style={{
            margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)',
            maxWidth: 50 + 'ch', paddingBottom: 12,
          }}>
            Our media partner ADWEEK broke the story — a first-of-its-kind philanthropic
            model bringing real charitable dollars to the Croisette.
          </p>
        </div>

        <ArticleFeature />
      </div>
    </section>);
}

function ArticleFeature() {
  const URL = 'https://www.adweek.com/media/what-if-cannes-used-its-influence-for-something-bigger/';
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="r-press-feature"
      style={{
        display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.05fr)',
        alignItems: 'stretch',
        textDecoration: 'none', color: 'inherit',
        border: '0.5px solid var(--rule)',
        borderColor: hover ? 'var(--accent)' : 'var(--rule)',
        borderRadius: 4, overflow: 'hidden',
        transition: 'border-color 240ms ease',
      }}>
      {/* Left: masthead panel */}
      <div style={{
        background: 'var(--bg-deep)', color: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden', minHeight: 300,
      }}>
        <Grain />
        <div style={{
          position: 'relative', flex: 1,
          padding: 'clamp(28px, 3.4vw, 52px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 28,
        }}>
          <div>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600 }}>Media Partner</span>
            <div style={{
              fontFamily: 'var(--font-body), sans-serif', fontWeight: 800,
              fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em',
              marginTop: 12, lineHeight: 1,
            }}>ADWEEK</div>
          </div>
          <blockquote style={{
            margin: 0,
            fontFamily: 'var(--font-display), serif', fontStyle: 'italic',
            fontSize: 'clamp(18px, 1.6vw, 24px)', lineHeight: 1.34, opacity: 0.95,
          }}>
            “If Cannes is the Super Bowl of influence, then maybe it's also the perfect place to put that influence to work.”
          </blockquote>
        </div>
        <img
          src={window.__resources && window.__resources.pressPhotos}
          alt="Get Inspired — FMC, FBRC.ai and Inspired team at Cannes"
          style={{ position: 'relative', display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* Right: article meta */}
      <div style={{
        padding: 'clamp(28px, 3.4vw, 52px)',
        display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center',
      }}>
        <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>Voice · ADWEEK</span>
        <h3 className="display" style={{
          margin: 0, fontWeight: 400,
          fontSize: 'clamp(30px, 3.4vw, 50px)', lineHeight: 1.04, letterSpacing: '-0.015em',
        }}>What If Cannes Used Its <em style={{ color: 'var(--accent)' }}>Influence</em> for Something Bigger?</h3>
        <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.5, color: 'var(--ink-2)' }}>
          We're unlocking $500,000 and need your help directing it to charities during the festival.
        </p>
        <span className="mono" style={{ fontSize: 11.5, letterSpacing: '0.07em', color: 'var(--ink-2)' }}>
          By Frank Jung (FMC) &amp; Will Lee, CEO of ADWEEK
        </span>
        <span style={{
          marginTop: 6, alignSelf: 'flex-start',
          background: hover ? 'var(--accent)' : 'transparent',
          color: 'var(--ink)',
          border: '0.5px solid ' + (hover ? 'transparent' : 'var(--rule)'),
          padding: '13px 22px', borderRadius: 999,
          fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', gap: 10,
          transition: 'all 220ms ease',
        }}>Read the story in ADWEEK <span aria-hidden>→</span></span>
      </div>
    </a>);
}

// ─── REQUEST AN INVITE ──────────────────────────────────────────────────────

function Invite({ t }) {
  return t.variation === 'B' ? <InviteCard t={t} /> : <InviteDispatch t={t} />;
}

const INTERESTS = [
'VIP hosting opportunity',
'Yacht activation / brand presence',
'Sponsorship / programming partner',
'Attending as a guest',
'Press / media',
'Other'];


function useInviteForm() {
  const [form, setForm] = React.useState({
    first: '', last: '', email: '', company: '', role: '', interest: INTERESTS[0], note: ''
  });
  const [submitted, setSubmitted] = React.useState(false);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target ? e.target.value : e }));
  const submit = (e) => {e.preventDefault();setSubmitted(true);};

  // Listen for cross-section interest selection (from Opportunities cards)
  React.useEffect(() => {
    const onSet = (ev) => {
      const v = ev && ev.detail;
      if (typeof v === 'string' && INTERESTS.includes(v)) {
        setForm((f) => ({ ...f, interest: v }));
      }
    };
    window.addEventListener('inspired:set-interest', onSet);
    return () => window.removeEventListener('inspired:set-interest', onSet);
  }, []);

  return { form, update, submit, submitted };
}

// A — Dispatch: sticky info column left, form right (editorial newsroom feel)
function InviteDispatch({ t }) {
  const { form, update, submit, submitted } = useInviteForm();
  return (
    <section
      id="invite"
      data-screen-label="03 Invite · Dispatch"
      style={{
        background: 'var(--bg)', color: 'var(--ink)',
        padding: 'clamp(40px, 6vw, 88px) clamp(20px, 4vw, 56px)'
      }}>
      <div className="r-invite-grid" style={{
        maxWidth: 1280, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
        gap: 'clamp(24px, 4vw, 72px)',
        alignItems: 'start'
      }}>
        {/* Editorial column */}
        <div className="r-invite-side" style={{ display: 'flex', flexDirection: 'column', gap: 18, alignSelf: 'start', position: 'sticky', top: 24 }}>
          <SectionLabel index={3} label="Request an Invite" />
          <h2 className="display" style={{
            margin: 0, fontWeight: 400,
            fontSize: 'clamp(40px, 4.6vw, 72px)',
            lineHeight: 0.98, letterSpacing: '-0.02em'
          }}>
            Want to be<br />part of <em style={{ color: 'var(--accent)' }}>it?</em>
          </h2>
          <p style={{
            margin: 0, fontSize: 15.5, lineHeight: 1.55,
            color: 'var(--ink-2)', maxWidth: 40 + 'ch'
          }}>
            Join as a guest, partner, or session host. Space is limited and curated.
          </p>
        </div>

        {/* Form — Tally embed */}
        <div style={{
          border: '0.5px solid var(--rule)', borderRadius: 6,
          background: 'var(--card)',
          padding: 'clamp(20px, 2.4vw, 32px)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 18, borderBottom: '0.5px solid var(--rule)', marginBottom: 22 }}>
            <span className="display ital" style={{ fontSize: 26 }}>The Invite</span>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
              Nº01 / 2026
            </span>
          </div>
          <TallyEmbed />
        </div>
      </div>
    </section>);

}

function TallyEmbed() {
  const SRC = 'https://tally.so/embed/b5K6K2?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';
  React.useEffect(() => {
    const ensure = () => {
      if (typeof window.Tally !== 'undefined') { window.Tally.loadEmbeds(); return; }
      if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
        const s = document.createElement('script');
        s.src = 'https://tally.so/widgets/embed.js';
        s.async = true;
        s.onload = () => { try { window.Tally && window.Tally.loadEmbeds(); } catch (e) {} };
        document.body.appendChild(s);
      }
    };
    ensure();
  }, []);
  return (
    <iframe
      data-tally-src={SRC}
      src={SRC}
      loading="lazy"
      width="100%"
      height="320"
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="Request an invite"
      style={{ display: 'block', border: 0, width: '100%', background: 'transparent' }}
    />
  );
}

function DispatchLine({ k, v, link }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14, alignItems: 'baseline' }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {k}
      </span>
      <span style={{
        fontSize: 15, lineHeight: 1.5,
        color: link ? 'var(--accent)' : 'var(--ink)',
        wordBreak: link ? 'break-all' : 'normal'
      }}>{v}</span>
    </div>);

}

// B — Letterpress: centered single-column invitation card, framed
function InviteCard({ t }) {
  const { form, update, submit, submitted } = useInviteForm();
  return (
    <section
      id="invite"
      data-screen-label="03 Invite · Letterpress"
      style={{
        background: 'var(--bg-2)', color: 'var(--ink)',
        padding: 'clamp(48px, 8vw, 120px) clamp(20px, 4vw, 56px)',
        position: 'relative'
      }}>
      <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center', textAlign: 'center' }}>
        <SectionLabel index={3} label="Request an Invite" />
        <h2 className="display" style={{
          margin: 0, fontWeight: 400,
          fontSize: 'clamp(48px, 6vw, 92px)',
          lineHeight: 0.96, letterSpacing: '-0.02em'
        }}>
          Want to be<br />part of <em style={{ color: 'var(--accent)' }}>it?</em>
        </h2>
        <p className="display ital" style={{
          margin: 0, fontSize: 'clamp(19px, 1.6vw, 24px)',
          lineHeight: 1.4, color: 'var(--ink-2)', maxWidth: 40 + 'ch'
        }}>
          As a guest, partner, or session host. Space is limited and curated.
        </p>

        {/* Card */}
        <div style={{
          width: '100%', textAlign: 'left',
          marginTop: 18,
          border: '0.5px double var(--ink)',
          padding: 'clamp(28px, 4vw, 48px)',
          background: 'var(--card)',
          position: 'relative'
        }}>
          {/* corner ornaments */}
          {['tl', 'tr', 'bl', 'br'].map((c) =>
          <span key={c} aria-hidden style={{
            position: 'absolute', width: 12, height: 12,
            borderColor: 'var(--accent)',
            borderStyle: 'solid',
            borderWidth: 0,
            ...(c[0] === 't' ? { top: -1, borderTopWidth: 1 } : { bottom: -1, borderBottomWidth: 1 }),
            ...(c[1] === 'l' ? { left: -1, borderLeftWidth: 1 } : { right: -1, borderRightWidth: 1 }),
            width: 18, height: 18
          }} />
          )}

          <div style={{ textAlign: 'center', paddingBottom: 22, borderBottom: '0.5px solid var(--rule)', marginBottom: 22 }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
              An Invitation to Cannes Lions, MMXXVI
            </span>
            <div className="display ital" style={{ fontSize: 36, marginTop: 4 }}>The Guest List</div>
          </div>
          <TallyEmbed />
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center' }}>
            <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
              YOU'LL HEAR FROM US WITHIN A FEW DAYS
            </span>
          </div>
        </div>
      </div>
    </section>);

}

// ─── Form primitives ────────────────────────────────────────────────────────
function FieldRow({ children }) {
  return <div className="r-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>{children}</div>;
}

function Field({ label, value, onChange, type = 'text', required, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderBottom: '0.5px solid var(--rule)' }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {label}{required && <span style={{ color: 'var(--accent)' }}> *</span>}
      </span>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        rows={multiline ? 3 : undefined}
        style={{
          appearance: 'none', border: 0, outline: 'none', background: 'transparent',
          color: 'var(--ink)', fontFamily: 'var(--font-display), serif',
          fontSize: 22, lineHeight: 1.3,
          padding: 0, resize: multiline ? 'vertical' : 'none',
          width: '100%'
        }} />
      
    </label>);

}

function SelectField({ label, value, onChange, options }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderBottom: '0.5px solid var(--rule)' }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
        {label}
      </span>
      <div style={{ position: 'relative' }}>
        <select
          value={value}
          onChange={onChange}
          style={{
            appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none',
            border: 0, outline: 'none', background: 'transparent',
            color: 'var(--ink)', fontFamily: 'var(--font-display), serif',
            fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.3, width: '100%', cursor: 'pointer',
            padding: '0 24px 0 0'
          }}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <span aria-hidden style={{
          position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
          color: 'var(--ink-2)', pointerEvents: 'none', fontSize: 14
        }}>▾</span>
      </div>
    </label>);

}

function SubmittedState({ center }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 16,
      alignItems: center ? 'center' : 'flex-start',
      textAlign: center ? 'center' : 'left',
      padding: '12px 0'
    }}>
      <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--accent)' }}>
        REQUEST RECEIVED
      </span>
      <h3 className="display ital" style={{ margin: 0, fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.05 }}>
        Thank you.
      </h3>
      <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 50 + 'ch' }}>
        You'll hear from us within a few days at the email you provided.
      </p>
    </div>);

}

// Expose to other Babel scripts
Object.assign(window, {
  Hero, Agenda, Press, Invite
});