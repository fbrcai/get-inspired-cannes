'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { Charity } from '@/lib/types'
import styles from './page.module.css'

/** API routes are mounted under /campaign/api (see src/app/campaign/api). */
const API_BASE = '/campaign/api'

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const INSPIRE_OPTIONS = [
  { value: 'creativity', icon: '✦', label: 'Creativity', desc: 'Art, design & human expression',
    prompt: 'What does creativity mean to you? A sentence or two is perfect.',
    placeholder: 'e.g. The moment a blank page becomes a new world…' },
  { value: 'nature',     icon: '◈', label: 'Nature',     desc: 'The world we must protect',
    prompt: 'What part of the natural world moves you most?',
    placeholder: 'e.g. Standing in an old forest and feeling small in the best way…' },
  { value: 'community',  icon: '◎', label: 'Community',  desc: 'People lifting each other up',
    prompt: 'Who is your community? What does belonging feel like?',
    placeholder: 'e.g. The people who show up without being asked…' },
  { value: 'justice',    icon: '⬡', label: 'Justice',    desc: 'Equality, rights & dignity',
    prompt: 'What does justice look like to you? Share what drives your conviction.',
    placeholder: 'e.g. A world where every voice carries equal weight…' },
  { value: 'innovation', icon: '⟡', label: 'Innovation', desc: 'Ideas that change everything',
    prompt: 'What idea or invention has changed the way you see the world?',
    placeholder: 'e.g. The moment I realised technology could be deeply human…' },
  { value: 'hope',       icon: '✧', label: 'Hope',       desc: 'A better tomorrow, today',
    prompt: 'What gives you hope right now? Describe it in your own words.',
    placeholder: 'e.g. The people already building what comes next…' },
]

type Page = 'hero' | 'flow' | 'generating' | 'result' | 'gallery'

interface FlowState {
  inspiration: typeof INSPIRE_OPTIONS[0] | null
  inspirationWords: string
  charity: Charity | null
  photoDataUrl: string | null
  email: string
  name: string
}

// ── COMPONENT ───────────────────────────────────────────────────────────────
export default function Home() {
  const [page, setPage] = useState<Page>('hero')
  const [step, setStep] = useState(1)
  const [flow, setFlow] = useState<FlowState>({
    inspiration: null, inspirationWords: '', charity: null,
    photoDataUrl: null, email: '', name: '',
  })

  // Popover
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [popoverWords, setPopoverWords] = useState('')

  // Charities
  const [charities, setCharities] = useState<Charity[]>([])
  const [charitiesLoading, setCharitiesLoading] = useState(false)

  // Camera
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraActive, setCameraActive] = useState(false)

  // Result
  const [resultImageUrl, setResultImageUrl] = useState('')
  const [genStatus, setGenStatus] = useState('Composing your vision…')

  // Gallery
  const [galleryItems, setGalleryItems] = useState<Array<{
    id: string; image_url: string; inspiration: string; charity_name: string | null
  }>>([])

  // ── CHARITIES ──
  const loadCharities = useCallback(async () => {
    if (charities.length > 0) return
    setCharitiesLoading(true)
    try {
      const res = await fetch(`${API_BASE}/charities`)
      const data = await res.json()
      setCharities(data)
    } finally {
      setCharitiesLoading(false)
    }
  }, [charities.length])

  // ── GALLERY ──
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [galleryError, setGalleryError] = useState<string | null>(null)
  const loadGallery = useCallback(async () => {
    setGalleryLoading(true)
    setGalleryError(null)
    try {
      const res = await fetch(`${API_BASE}/gallery?limit=50`, { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) { setGalleryError(data.error || 'Failed to load gallery'); return }
      console.log('Gallery loaded:', data.items?.length, 'items')
      setGalleryItems(data.items || [])
    } catch (e) {
      console.error('Gallery fetch error:', e)
      setGalleryError('Could not reach gallery API')
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  // Auto-reload gallery whenever it becomes the active page
  useEffect(() => {
    if (page === 'gallery') loadGallery()
  }, [page, loadGallery])
  function goStep(n: number) {
    setStep(n)
    if (n === 2) loadCharities()
  }

  // ── INSPIRATION SELECT ──
  function selectInspiration(opt: typeof INSPIRE_OPTIONS[0]) {
    setFlow(f => ({ ...f, inspiration: opt }))
    setPopoverWords(flow.inspirationWords)
    setPopoverOpen(true)
  }

  function confirmInspiration(skip = false) {
    if (!skip) setFlow(f => ({ ...f, inspirationWords: popoverWords }))
    setPopoverOpen(false)
    setTimeout(() => goStep(2), 220)
  }

  // ── CAMERA ──
  async function startCamera() {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      streamRef.current = s
      if (videoRef.current) videoRef.current.srcObject = s
      setCameraActive(true)
    } catch {
      document.getElementById('file-input')?.click()
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    setCameraActive(false)
  }

  function capturePhoto() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0)
    setFlow(f => ({ ...f, photoDataUrl: canvas.toDataURL('image/jpeg', 0.85) }))
    stopCamera()
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setFlow(f => ({ ...f, photoDataUrl: ev.target?.result as string }))
    reader.readAsDataURL(file)
  }

  // ── GENERATE ──
  async function generate() {
    setPage('generating')

    const statusSteps = [
      'Uploading your photo…',
      'Building your inspiration prompt…',
      'Generating your social image…',
      'Almost there…',
    ]
    let si = 0
    const statusInterval = setInterval(() => {
      si = (si + 1) % statusSteps.length
      setGenStatus(statusSteps[si])
    }, 3500)

    try {
      // Strip data: prefix from photo
      const photoBase64 = flow.photoDataUrl
        ? flow.photoDataUrl.replace(/^data:image\/\w+;base64,/, '')
        : null

      const genRes = await fetch(`${API_BASE}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inspiration: flow.inspiration?.value,
          inspirationWords: flow.inspirationWords,
          charity: flow.charity,
          photoBase64,
          email: flow.email,
          name: flow.name,
        }),
      })

      const genData = await genRes.json()
      if (!genRes.ok) throw new Error(genData.error)

      setResultImageUrl(genData.imageUrl)
      // Refresh gallery in background so it's ready when user navigates there
      loadGallery()
      setPage('result')
    } catch (err) {
      console.error(err)
      setResultImageUrl('')
      setPage('result')
    } finally {
      clearInterval(statusInterval)
    }
  }

  // ── RESET ──
  function startAgain() {
    setFlow({ inspiration: null, inspirationWords: '', charity: null, photoDataUrl: null, email: '', name: '' })
    setPopoverOpen(false)
    setPopoverWords('')
    setResultImageUrl('')
    setStep(1)
    setPage('flow')
  }

  function emailValid(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) }

  // ── RENDER ──────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── FIXED NAV ── */}
      <nav className={styles.pageNav}>
        <button className={`${styles.navPill} ${page === 'hero' || page === 'flow' || page === 'generating' || page === 'result' ? styles.navPillActive : ''}`}
          onClick={() => setPage('hero')}>Experience</button>
        <button className={`${styles.navPill} ${page === 'gallery' ? styles.navPillActive : ''}`}
          onClick={() => { setPage('gallery'); loadGallery() }}>Gallery</button>
      </nav>

      {/* ══════════════ HERO ══════════════ */}
      {page === 'hero' && (
        <div className={styles.heroPage}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>Cannes Lions 2026</p>
            <h1 className={styles.heroTitle}>GET<br />INSPIRED</h1>
            <p className={styles.heroSubtitle}>
              Tell us what moves you. We&apos;ll create something beautiful — and make sure the causes you care about get seen.
            </p>
            <button className={styles.btnPrimary} onClick={() => { setPage('flow'); goStep(1) }}>
              Begin Your Story →
            </button>
            <div className={styles.cannsBadge}>Cannes Lions 2026</div>
          </div>
        </div>
      )}

      {/* ══════════════ FLOW ══════════════ */}
      {page === 'flow' && (
        <div className={styles.flowPage}>
          <header className={styles.flowHeader}>
            <div className={styles.flowLogo}>GET INSPIRED</div>
            <div className={styles.flowSteps}>
              {[1,2,3,4].map((n, i) => (
                <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {i > 0 && <div className={styles.stepLine} />}
                  <div className={`${styles.stepDot} ${step === n ? styles.stepActive : ''} ${step > n ? styles.stepDone : ''}`}>{n}</div>
                </div>
              ))}
            </div>
          </header>

          <div className={styles.flowMain}>

            {/* STEP 1 */}
            {step === 1 && (
              <div className={styles.flowCard}>
                <p className={styles.flowQuestion}>Step 1 of 4</p>
                <h2 className={styles.flowHeading}>What Inspires You?</h2>
                <p className={styles.flowBody}>Choose the spark that drives you. This shapes the visual world we create for you.</p>
                <div className={styles.inspireGrid}>
                  {INSPIRE_OPTIONS.map(opt => (
                    <div key={opt.value}
                      className={`${styles.inspireCard} ${flow.inspiration?.value === opt.value ? styles.inspireSelected : ''}`}
                      onClick={() => selectInspiration(opt)}>
                      <div className={styles.inspireIcon}>{opt.icon}</div>
                      <div className={styles.inspireLabel}>{opt.label}</div>
                      <div className={styles.inspireDesc}>{opt.desc}</div>
                      {flow.inspiration?.value === opt.value && <div className={styles.inspireCheck}>✓</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className={styles.flowCard}>
                <p className={styles.flowQuestion}>Step 2 of 4</p>
                <h2 className={styles.flowHeading}>Your Cause</h2>
                <p className={styles.flowBody}>Which charity do you want to amplify? Your image will carry their message.</p>
                <div className={styles.charityGrid}>
                  {charitiesLoading && <p className={styles.loadingMsg}>Loading charities…</p>}
                  {charities.map(c => (
                    <div key={c.name}
                      className={`${styles.charityCard} ${flow.charity?.name === c.name ? styles.charitySelected : ''}`}
                      onClick={() => setFlow(f => ({ ...f, charity: c }))}>
                      <div className={styles.charityLogoWrap}>
                        <img src={c.logo} alt={c.name} className={styles.charityLogo}
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'flex'
                          }} />
                        <div className={styles.charityLogoFallback} style={{ display: 'none' }}>
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                      <div>
                        <div className={styles.charityCause}>{c.cause}</div>
                        <div className={styles.charityName}>{c.name}</div>
                      </div>
                      {flow.charity?.name === c.name && <div className={styles.charityCheck}>✓</div>}
                    </div>
                  ))}
                </div>
                <div className={styles.flowNav}>
                  <button className={styles.btnBack} onClick={() => goStep(1)}>← Back</button>
                  <button className={styles.btnNext} onClick={() => goStep(3)} disabled={!flow.charity}>Continue →</button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className={styles.flowCard}>
                <p className={styles.flowQuestion}>Step 3 of 4</p>
                <h2 className={styles.flowHeading}>Add Your Face</h2>
                <p className={styles.flowBody}>Optional: take or upload a photo. Your likeness becomes part of the art.</p>

                {/* Show preview or camera or placeholder */}
                {flow.photoDataUrl ? (
                  <div className={styles.photoPreviewWrap}>
                    <img src={flow.photoDataUrl} alt="Your photo" className={styles.photoPreview} />
                    <button className={styles.photoRemove} onClick={() => setFlow(f => ({ ...f, photoDataUrl: null }))}>✕ Remove</button>
                  </div>
                ) : cameraActive ? (
                  <div className={styles.photoPreviewWrap}>
                    <video ref={videoRef} autoPlay muted playsInline className={styles.videoEl} />
                    <div className={styles.cameraControls}>
                      <button className={styles.btnNext} onClick={capturePhoto}>📸 Take Photo</button>
                      <button className={styles.btnBack} onClick={stopCamera}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.photoButtons}>
                    <button className={styles.photoBtn} onClick={startCamera}>
                      <span className={styles.photoBtnIcon}>📷</span>
                      <span className={styles.photoBtnLabel}>Take a photo</span>
                      <span className={styles.photoBtnSub}>Use your camera</span>
                    </button>
                    <button className={styles.photoBtn} onClick={() => document.getElementById('file-input')?.click()}>
                      <span className={styles.photoBtnIcon}>🖼</span>
                      <span className={styles.photoBtnLabel}>Upload a photo</span>
                      <span className={styles.photoBtnSub}>From your device</span>
                    </button>
                  </div>
                )}

                <input id="file-input" type="file" accept="image/*" capture="user" style={{ display: 'none' }} onChange={handleFile} />

                <div className={styles.flowNav} style={{ marginTop: '1.5rem' }}>
                  <button className={styles.btnBack} onClick={() => goStep(2)}>← Back</button>
                  <button className={styles.btnNext} onClick={() => goStep(4)}>Continue →</button>
                  {!flow.photoDataUrl && !cameraActive && (
                    <button className={styles.btnSkip} onClick={() => goStep(4)}>Skip photo</button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className={styles.flowCard}>
                <p className={styles.flowQuestion}>Step 4 of 4</p>
                <h2 className={styles.flowHeading}>Send It to You</h2>
                <p className={styles.flowBody}>Enter your email and we&apos;ll send your personalised social image to your inbox — and add it to our wall.</p>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your email address</label>
                  <input className={styles.formInput} type="email" placeholder="you@example.com"
                    value={flow.email} onChange={e => setFlow(f => ({ ...f, email: e.target.value }))} />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Your name <span style={{ color: 'var(--muted)', fontSize: 10, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                  <input className={styles.formInput} type="text" placeholder="Your first name"
                    value={flow.name} onChange={e => setFlow(f => ({ ...f, name: e.target.value }))} />
                </div>

                <div className={styles.flowNav}>
                  <button className={styles.btnBack} onClick={() => goStep(3)}>← Back</button>
                  <button className={styles.btnNext} onClick={generate} disabled={!emailValid(flow.email)}>
                    Create My Image →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ══════════════ GENERATING ══════════════ */}
      {page === 'generating' && (
        <div className={styles.generatingPage}>
          <div className={styles.genSpinner} />
          <h2 className={styles.genTitle}>Creating<br />Your Story</h2>
          <p className={styles.genSubtitle}>We&apos;re weaving your inspiration, your cause, and your identity into something worth sharing.</p>
          <p className={styles.genStatus}>{genStatus}</p>
        </div>
      )}

      {/* ══════════════ RESULT ══════════════ */}
      {page === 'result' && (
        <div className={styles.resultPage}>
          <div className={styles.resultInner}>
            <p className={styles.resultEyebrow}>Your image is ready</p>
            <h2 className={styles.resultTitle}>You&apos;re Inspired</h2>

            <div className={styles.resultImageWrap}>
              {resultImageUrl ? (
                <img src={resultImageUrl} alt="Your generated inspiration image" className={styles.resultImg} />
              ) : (
                <div className={styles.resultPlaceholder}>
                  <p style={{ color: 'var(--gold)' }}>Generation failed — please try again</p>
                </div>
              )}
              {flow.charity && (
                <div className={styles.charityBadge}>
                  {flow.charity.logo && <img src={flow.charity.logo} alt={flow.charity.name} onError={e => (e.currentTarget.style.display='none')} />}
                  <span>{flow.charity.name}</span>
                </div>
              )}
            </div>

            {flow.email && <p className={styles.emailSentNote}>Your image has been emailed to {flow.email} ✓</p>}

            <div className={styles.resultActions}>
              {resultImageUrl && (
                <a href={resultImageUrl} download="get-inspired.jpg" className={styles.btnOutline}>↓ Download</a>
              )}
              <button className={styles.btnOutline} onClick={() => { loadGallery(); setPage('gallery') }}>View the Wall →</button>
              <button className={styles.btnOutline} onClick={startAgain}>Start Again</button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════ GALLERY ══════════════ */}
      {page === 'gallery' && (
        <div className={styles.galleryPage}>
          <div className={styles.galleryHeader}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1>The Wall</h1>
                <p>Cannes Lions 2026 · What inspires us{galleryItems.length > 0 ? ` · ${galleryItems.length} images` : ''}</p>
              </div>
              <button className={styles.btnOutline} onClick={loadGallery} disabled={galleryLoading}
                style={{ marginBottom: '0.5rem' }}>
                {galleryLoading ? 'Loading…' : '↻ Refresh'}
              </button>
            </div>
          </div>
          <div className={styles.galleryGrid}>
            {galleryLoading && galleryItems.length === 0 ? (
              <div className={styles.galleryEmpty}>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>Loading images…</p>
              </div>
            ) : galleryError ? (
              <div className={styles.galleryEmpty}>
                <div className={styles.galleryEmptyTitle}>Error</div>
                <p style={{ fontSize: 14, color: '#E24B4A' }}>{galleryError}</p>
              </div>
            ) : galleryItems.length === 0 ? (
              <div className={styles.galleryEmpty}>
                <div className={styles.galleryEmptyTitle}>Be First</div>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>No images yet — be the first to get inspired.</p>
              </div>
            ) : galleryItems.map(item => (
              <div key={item.id} className={styles.galleryItem}>
                <img src={item.image_url} alt={`Inspired by ${item.inspiration}`} loading="lazy"
                  onError={(e) => { e.currentTarget.style.outline = '2px solid red'; e.currentTarget.alt = 'Failed to load' }} />
                <div className={styles.galleryItemMeta}>
                  <span className={styles.galleryTag}>{item.inspiration.charAt(0).toUpperCase() + item.inspiration.slice(1)}</span>
                  {item.charity_name && <span style={{ fontSize: 11, color: 'var(--muted)' }}>· {item.charity_name}</span>}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.galleryNav}>
            <button className={styles.btnNext} onClick={() => { setPage('hero') }}>← Get Inspired</button>
          </div>
        </div>
      )}

      {/* ══════════════ POPOVER ══════════════ */}
      {popoverOpen && (
        <div className={styles.popoverBackdrop} onClick={e => { if (e.target === e.currentTarget) setPopoverOpen(false) }}>
          <div className={styles.popover}>
            <button className={styles.popoverClose} onClick={() => setPopoverOpen(false)}>✕</button>
            <p className={styles.popoverEyebrow}>You chose</p>
            <span className={styles.popoverIcon}>{flow.inspiration?.icon}</span>
            <h3 className={styles.popoverHeading}>{flow.inspiration?.label}</h3>
            <p className={styles.popoverPrompt}>{flow.inspiration?.prompt}</p>
            <textarea
              className={styles.popoverTextarea}
              placeholder={flow.inspiration?.placeholder}
              maxLength={280}
              value={popoverWords}
              onChange={e => setPopoverWords(e.target.value)}
              autoFocus
            />
            <p className={styles.charCount}>{popoverWords.length} / 280</p>
            <div className={styles.popoverNav}>
              <button className={styles.btnNext} onClick={() => confirmInspiration(false)}>Next: Choose Your Cause →</button>
              <button className={styles.btnSkip} onClick={() => confirmInspiration(true)}>Skip</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
