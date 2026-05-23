// sections.jsx — Hero / Agenda / Invite, two variations on Agenda + Invite.

// ─── Shared ────────────────────────────────────────────────────────────────
const AGENDA = [
{
  day: 'Monday',
  date: 'June 22',
  title: 'The Future of Power',
  blurb: 'AI, attention, influence, and the shifting dynamics reshaping every corner of our industry.',
  aside: 'World Cup · Argentina v. Austria · France v. Iraq',
  tag: 'Curated session'
},
{
  day: 'Tuesday',
  date: 'June 23',
  title: 'The New Creative Economy',
  blurb: 'Creators, brands, monetisation, and the mechanics of cultural relevance in a post-platform world.',
  aside: 'Daytime programme',
  tag: 'Curated session'
},
{
  day: 'Tuesday',
  date: 'Evening',
  title: 'Get Inspired Celebration',
  blurb: 'A curated, invite-only gathering celebrating the collective impact created throughout the week.',
  aside: 'Sunset',
  tag: 'Signature evening'
},
{
  day: 'Wednesday',
  date: 'June 24',
  title: 'Closed-Door Conversations',
  blurb: 'High-trust, invite-only sessions where leaders discuss what is rarely said publicly.',
  aside: 'Off the record',
  tag: 'Off the record'
},
{
  day: 'Thursday',
  date: 'June 25',
  title: 'The Work that Moves Culture',
  blurb: 'A working roundtable on the campaigns and ideas reshaping how brands earn attention.',
  aside: 'Working session · invited only',
  tag: 'Curated session'
},
{
  day: 'Friday',
  date: 'June 26',
  title: 'Final Reflections, At Sea',
  blurb: 'Rose and ... ',
  aside: 'Touch Grass',
  tag: 'Closing'
}];


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
      data-screen-label="01 Hero · Cover"
      style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      <img
        src="https://images.unsplash.com/photo-1775822993886-bb598906bca3?auto=format&fit=crop&w=2400&q=80"
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
        display: 'grid', gridTemplateRows: '1fr auto',
        padding: 'clamp(20px, 3vw, 36px) clamp(20px, 4vw, 56px)',
        color: 'var(--hero-fg)'
      }}>
        {/* Centerpiece */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 'clamp(16px, 2vw, 28px)', paddingBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="eyebrow" style={{ color: 'var(--hero-fg)', opacity: 0.9 }}>
            <span style={{ display: 'inline-block', marginRight: 14 }}>Cannes Lions 2026</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span style={{ display: 'inline-block', margin: '0 14px' }}>June 22 — 26</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span style={{ display: 'inline-block', marginLeft: 14 }}>ARE YOU READY?</span>
          </div>

          <h1 style={{
            margin: 0,
            fontFamily: 'var(--font-display), serif',
            fontWeight: 400,
            lineHeight: 0.86,
            letterSpacing: '-0.025em',
            fontSize: 'clamp(72px, 16vw, 280px)', color: "rgb(154, 114, 53)"

          }}>
            Get<br />
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
              A first-of-its-kind impact initiative during Cannes Lions.<br />
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
          <Stat label="Vessel" value="Super Yacht · Vieux Port" />
          <Stat label="Programme" value="5 days curated" />
          <Stat label="Attendance" value="By invitation" emph />
        </div>
      </div>
    </section>);

}

function Stat({ label, value, emph }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span className="mono" style={{ fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase', opacity: 0.7 }}>{label}</span>
      <span className={emph ? 'display ital' : ''} style={{
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
          CANNES LIONS · 22 — 26 JUNE 2026
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
            partner, or host — request an invite below. We review every request personally.
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
          src="https://images.unsplash.com/photo-1775822993886-bb598906bca3?auto=format&fit=crop&w=2400&q=80"
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
            JUNE 22 — 26
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

// ─── AGENDA ────────────────────────────────────────────────────────────────

function Agenda({ t }) {
  return t.variation === 'B' ? <AgendaTimeline t={t} /> : <AgendaEditorial t={t} />;
}

// A — Editorial schedule: day-on-left, session-on-right list
function AgendaEditorial({ t }) {
  return (
    <section
      id="agenda"
      data-screen-label="02 Agenda · Editorial"
      style={{
        background: 'var(--bg-2)', color: 'var(--ink)',
        padding: 'clamp(48px, 8vw, 120px) clamp(20px, 4vw, 56px)'
      }}>
      <div style={{ maxWidth: 1480, margin: '0 auto' }}>
        <SectionLabel index={2} label="Agenda" />

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
            Five days,<br />one <em style={{ color: 'var(--accent)' }}>super yacht.</em>
          </h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 50 + 'ch', paddingBottom: 12 }}>A focused programme of curated sessions, closed-door conversations, and a celebrations — anchored by one question:
how do we move culture forward, on purpose?


          </p>
        </div>

        <ol style={{
          listStyle: 'none', margin: 0, padding: 0,
          borderTop: '0.5px solid var(--rule)'
        }}>
          {AGENDA.map((s, i) =>
          <AgendaRow key={s.title} s={s} i={i} />
          )}
        </ol>
      </div>
    </section>);

}

function AgendaRow({ s, i }) {
  const [hover, setHover] = React.useState(false);
  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '64px minmax(0, 200px) minmax(0, 2.4fr) minmax(0, 1fr)',
        gap: 'clamp(20px, 3vw, 48px)',
        padding: 'clamp(22px, 3vw, 36px) 4px',
        borderBottom: '0.5px solid var(--rule)',
        alignItems: 'baseline',
        transition: 'padding 240ms ease, background 240ms ease',
        background: hover ? 'var(--card)' : 'transparent',
        paddingLeft: hover ? 18 : 4
      }}
      className="r-agenda-row">
      <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span className="display ital" style={{
          fontSize: 'clamp(24px, 2.4vw, 32px)', lineHeight: 1.05,
          color: hover ? 'var(--accent)' : 'var(--ink)',
          transition: 'color 220ms ease'
        }}>{s.day}</span>
        <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
          {s.date}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h3 className="display" style={{
          margin: 0, fontWeight: 400,
          fontSize: 'clamp(28px, 3vw, 44px)',
          lineHeight: 1.05, letterSpacing: '-0.01em'
        }}>{s.title}</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-2)', maxWidth: 60 + 'ch' }}>
          {s.blurb}
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end', textAlign: 'right' }}>
        <span className="mono" style={{
          fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--accent)', border: '0.5px solid currentColor',
          padding: '6px 10px', borderRadius: 999
        }}>{s.tag}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-2)', letterSpacing: '0.06em' }}>
          {s.aside}
        </span>
      </div>
    </li>);

}

// B — Timeline: vertical river-of-days with markers; sticky day header on hover
function AgendaTimeline({ t }) {
  const [active, setActive] = React.useState(0);
  const a = AGENDA[active];
  return (
    <section
      id="agenda"
      data-screen-label="02 Agenda · Timeline"
      style={{
        background: 'var(--bg-deep)', color: 'var(--bg)',
        padding: 'clamp(56px, 9vw, 140px) clamp(20px, 4vw, 56px)',
        position: 'relative', overflow: 'hidden'
      }}>
      <Grain />
      <div style={{ maxWidth: 1480, margin: '0 auto', position: 'relative' }}>
        <SectionLabel index={2} label="Agenda · A river of days" />

        <h2 className="display" style={{
          margin: 'clamp(24px, 4vw, 56px) 0 0',
          fontWeight: 400,
          fontSize: 'clamp(48px, 7vw, 120px)',
          lineHeight: 0.94, letterSpacing: '-0.02em'
        }}>
          Five days,<br />one <em style={{ color: 'var(--accent)' }}>super yacht.</em>
        </h2>

        <div className="r-grid-2" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: 'clamp(24px, 4vw, 72px)',
          marginTop: 'clamp(36px, 5vw, 64px)',
          alignItems: 'start'
        }}>
          {/* Vertical timeline */}
          <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
            {/* vertical rail */}
            <span aria-hidden style={{
              position: 'absolute', left: 7, top: 8, bottom: 8,
              width: 0.5, background: 'rgba(255,255,255,0.18)'
            }} />
            {AGENDA.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.title}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  style={{
                    position: 'relative', paddingLeft: 36,
                    padding: '14px 0 14px 36px',
                    cursor: 'pointer',
                    opacity: isActive ? 1 : 0.55,
                    transition: 'opacity 200ms ease'
                  }}>
                  <span aria-hidden style={{
                    position: 'absolute', left: 0, top: 22,
                    width: 14, height: 14, borderRadius: '50%',
                    background: isActive ? 'var(--accent)' : 'transparent',
                    border: isActive ? 'none' : '0.5px solid rgba(255,255,255,0.4)',
                    boxShadow: isActive ? '0 0 0 6px rgba(212,168,87,0.18)' : 'none',
                    transition: 'all 220ms ease'
                  }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', opacity: 0.7 }}>
                      {s.date.toUpperCase()}
                    </span>
                    <span className="display" style={{
                      fontSize: 'clamp(26px, 2.4vw, 36px)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.01em',
                      fontStyle: isActive ? 'italic' : 'normal',
                      color: isActive ? 'var(--accent)' : 'inherit',
                      transition: 'color 200ms ease'
                    }}>{s.day} — {s.title}</span>
                  </div>
                </li>);

            })}
          </ol>

          {/* Active session card */}
          <aside style={{
            position: 'sticky', top: 24,
            border: '0.5px solid rgba(255,255,255,0.18)',
            borderRadius: 6,
            padding: 'clamp(24px, 3vw, 40px)',
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(4px)',
            display: 'flex', flexDirection: 'column', gap: 18
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.16em', opacity: 0.7 }}>
                {a.date.toUpperCase()} · {a.day.toUpperCase()}
              </span>
              <span className="mono" style={{
                fontSize: 9.5, letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--accent)', border: '0.5px solid currentColor',
                padding: '5px 10px', borderRadius: 999
              }}>{a.tag}</span>
            </div>
            <h3 className="display" style={{
              margin: 0, fontWeight: 400,
              fontSize: 'clamp(40px, 4vw, 64px)',
              lineHeight: 1, letterSpacing: '-0.015em'
            }}>{a.title}</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, opacity: 0.88, maxWidth: 56 + 'ch' }}>
              {a.blurb}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12,
              paddingTop: 14, borderTop: '0.5px solid rgba(255,255,255,0.15)' }}>
              <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', opacity: 0.6 }}>
                ON DECK
              </span>
              <span className="display ital" style={{ fontSize: 20 }}>{a.aside}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>);

}

// ─── REQUEST AN INVITE ──────────────────────────────────────────────────────

function Invite({ t }) {
  return t.variation === 'B' ? <InviteCard t={t} /> : <InviteDispatch t={t} />;
}

const INTERESTS = [
'Attending as a guest',
'Partnership opportunities',
'Hosting a session',
'Press / media',
'Other'];


function useInviteForm() {
  const [form, setForm] = React.useState({
    first: '', last: '', email: '', company: '', role: '', interest: INTERESTS[0], note: ''
  });
  const [submitted, setSubmitted] = React.useState(false);
  const update = (k) => (e) => setForm({ ...form, [k]: e.target ? e.target.value : e });
  const submit = (e) => {e.preventDefault();setSubmitted(true);};
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
            Join as a guest, partner, or session host. Space is limited and curated —
            we review every request personally.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{
          display: 'flex', flexDirection: 'column', gap: 0,
          border: '0.5px solid var(--rule)', borderRadius: 6,
          background: 'var(--card)',
          padding: 'clamp(20px, 2.4vw, 32px)'
        }}>
          {submitted ?
          <SubmittedState /> :

          <React.Fragment>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 18, borderBottom: '0.5px solid var(--rule)', marginBottom: 22 }}>
                <span className="display ital" style={{ fontSize: 26 }}>The Invite</span>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
                  Nº01 / 2026
                </span>
              </div>
              <FieldRow>
                <Field label="First name" value={form.first} onChange={update('first')} required />
                <Field label="Last name" value={form.last} onChange={update('last')} required />
              </FieldRow>
              <Field label="Work email" value={form.email} onChange={update('email')} type="email" required />
              <FieldRow>
                <Field label="Company" value={form.company} onChange={update('company')} required />
                <Field label="Role" value={form.role} onChange={update('role')} required />
              </FieldRow>
              <SelectField label="I'm interested in" value={form.interest} onChange={update('interest')} options={INTERESTS} />
              <Field label="Anything else (optional)" value={form.note} onChange={update('note')} multiline />

              <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span className="mono" style={{ fontSize: 10.5, letterSpacing: '0.12em', color: 'var(--ink-2)' }}>
                  We review every request personally.
                </span>
                <button type="submit" style={{
                appearance: 'none', border: 0, cursor: 'pointer',
                background: 'var(--ink)', color: 'var(--bg)',
                padding: '15px 26px', borderRadius: 999, fontSize: 12,
                letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 600
              }}>Submit request →</button>
              </div>
            </React.Fragment>
          }
        </form>
      </div>
    </section>);

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
          We review every request personally.
        </p>

        {/* Card */}
        <form onSubmit={submit} style={{
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

          {submitted ?
          <SubmittedState center /> :

          <React.Fragment>
              <div style={{ textAlign: 'center', paddingBottom: 22, borderBottom: '0.5px solid var(--rule)', marginBottom: 22 }}>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--ink-2)' }}>
                  An Invitation to Cannes Lions, MMXXVI
                </span>
                <div className="display ital" style={{ fontSize: 36, marginTop: 4 }}>The Guest List</div>
              </div>
              <FieldRow>
                <Field label="First name" value={form.first} onChange={update('first')} required />
                <Field label="Last name" value={form.last} onChange={update('last')} required />
              </FieldRow>
              <Field label="Work email" value={form.email} onChange={update('email')} type="email" required />
              <FieldRow>
                <Field label="Company" value={form.company} onChange={update('company')} required />
                <Field label="Role" value={form.role} onChange={update('role')} required />
              </FieldRow>
              <SelectField label="I'm interested in" value={form.interest} onChange={update('interest')} options={INTERESTS} />
              <Field label="Anything else (optional)" value={form.note} onChange={update('note')} multiline />

              <div style={{ marginTop: 22, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <button type="submit" style={{
                appearance: 'none', border: 0, cursor: 'pointer',
                background: 'var(--accent)', color: 'var(--ink)',
                padding: '16px 36px', borderRadius: 999, fontSize: 12,
                letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700
              }}>Submit Request →</button>
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--ink-2)' }}>
                  YOU'LL HEAR FROM US WITHIN A FEW DAYS
                </span>
              </div>
            </React.Fragment>
          }
        </form>
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
        We review every request personally. You'll hear from us within a few days
        at the email you provided.
      </p>
    </div>);

}

// Expose to other Babel scripts
Object.assign(window, {
  Hero, Agenda, Invite
});