/**
 * GET INSPIRED — Cannes Lions 2026
 * Prompt builder for FLUX.2 [pro] on fal.ai
 *
 * FLUX.2 [pro] optimal prompt structure (per fal.ai docs):
 * 1. Core entity — who/what is in the image
 * 2. Action/pose — what they're doing
 * 3. Aesthetic/style — photographic treatment
 * 4. Environment — where they are
 * 5. Lighting — what light does physically
 * 6. Color — specific palette
 * 7. Mood — emotional register
 *
 * FLUX.2 also supports structured JSON prompts for precise control.
 * We use prose optimised for this token order.
 */

export interface PromptInput {
  inspiration: string
  inspirationWords: string
  charityName?: string
  personName?: string
  hasPhoto: boolean
}

export interface BuiltPrompt {
  positive: string
  debug: {
    theme: string
    subject: string
    aesthetic: string
    environment: string
    lighting: string
    color: string
    mood: string
    personalVoice: string
    charity: string
  }
}

// ── THEME DEFINITIONS ─────────────────────────────────────────────────────────
// Ordered per FLUX.2 optimal token priority:
// entity → action → aesthetic → environment → lighting → color → mood

const THEMES: Record<string, {
  entity: string       // who is in the image (used when no photo)
  action: string       // what they're doing / pose
  aesthetic: string    // photographic / artistic treatment
  environment: string  // where they are
  lighting: string     // what the light physically does
  color: string        // specific palette with hex-adjacent language
  mood: string         // emotional register
}> = {

  creativity: {
    entity:      'a visionary artist, paint splattered on skin and hands',
    action:      'arms outstretched mid-creation, head thrown back in expressive abandon',
    aesthetic:   'editorial fashion photography, 85mm f/1.4, ultra-sharp subject against dissolved painterly background',
    environment: 'floating abstract pigment and ink blooming through dark water surrounds them',
    lighting:    'violet and cyan studio rim lights cut hard through deep shadow, paint particles suspended in light like sparks, single warm key light raking across the face',
    color:       'deep violet #2D1B69, electric cyan #00E5FF, molten gold #FFB300, rich magenta #E91E8C, near-black background',
    mood:        'euphoric, electric, completely liberated — pure creative flow',
  },

  nature: {
    entity:      'a lone human figure, dressed simply, face upturned',
    action:      'standing still with arms slightly open, breathing it in',
    aesthetic:   'environmental portraiture, 35mm f/2, deep depth of field, National Geographic style',
    environment: 'threshold of an ancient cathedral forest, old-growth trees soaring into canopy, morning mist across mossy floor, ferns and roots',
    lighting:    'golden morning sun drives volumetric shafts through the canopy, dappled amber patches on the figure, cool blue shadow fills the deep forest behind',
    color:       'deep forest green #1B4332, ochre earth #C4842A, warm amber #F59E0B, dappled sage #6B8F4E, figure in warm gold against cool shadow',
    mood:        'reverent, grounded, deeply present — small inside something ancient and vast',
  },

  community: {
    entity:      'a diverse group of five people, different ages and backgrounds',
    action:      'standing shoulder to shoulder facing forward, bodies overlapping slightly, genuine warm smiles',
    aesthetic:   'documentary portrait photography, 50mm f/1.8, candid energy, shallow depth of field on faces',
    environment: 'sun-drenched open urban plaza, soft out-of-focus crowd behind in golden bokeh, wide open sky above',
    lighting:    'golden hour backlight wraps warm halos around the group, diffused fill illuminates all faces evenly, soft lens flare cuts across frame, skin tones glow sun-kissed',
    color:       'warm terracotta #C4622D, honey gold #F59E0B, soft coral #FF6B6B, rich warm skin tones, cream white #FFF8F0',
    mood:        'joyful, inclusive, deeply connected — belonging to something bigger',
  },

  justice: {
    entity:      'a single determined person',
    action:      'standing perfectly upright, chin lifted, gaze direct and unflinching into camera, fist raised',
    aesthetic:   'high-contrast editorial photography, 50mm slightly low angle looking up, bold confrontational framing',
    environment: 'stark minimal space, strong repeating vertical architectural lines receding to deep shadow',
    lighting:    'single harsh key light from directly above, deep dramatic shadow under brow and jaw, thin white rim light traces exact silhouette edge, zero fill — pure chiaroscuro',
    color:       'near-monochrome deep black #0A0A0A and bright white #F5F5F5, single sharp crimson accent #DC2626',
    mood:        'fierce, righteous, unbreakable — dignified power',
  },

  innovation: {
    entity:      'a lone visionary, clean modern clothing',
    action:      'standing still, gaze fixed forward with quiet certainty, surrounded by flowing light',
    aesthetic:   'sci-fi editorial photography, 85mm f/1.2, tight portrait crop, cinematic depth of field',
    environment: 'floating geometric light structures dissolving into absolute dark, circuit-like patterns fading into the void',
    lighting:    'cool blue-white LED practicals cast precise technical light, holographic data reflections shimmer across face and clothing, faint underglow from a screen below',
    color:       'midnight blue #0F172A, silver chrome #CBD5E1, neon cyan #00E5FF hairlines, electric white #F8FAFC, absolute black #000000',
    mood:        'quietly awe-inspiring, pioneering — standing at the edge of what is possible',
  },

  hope: {
    entity:      'a young person, open expression of wonder',
    action:      'face turned upward, arms open wide, completely receptive',
    aesthetic:   'aspirational editorial photography, 110mm f/2, centered composition, ample sky, ethereal atmosphere',
    environment: 'sweeping open landscape, vivid sunrise breaking at the horizon, atmospheric morning haze in foreground',
    lighting:    'rising sun directly behind creates a warm golden halo around the silhouette, soft diffused fill on the face, thin warm rim traces outstretched arms, haze catches light between subject and horizon',
    color:       'champagne gold #F59E0B, blush rose #FDA4AF, pale cerulean #BAE6FD, warm ivory #FEFCE8, luminous white haze',
    mood:        'tender, transcendent, quietly triumphant — brimming with possibility',
  },
}

// ── CHARITY ACCENTS ───────────────────────────────────────────────────────────
const CHARITY_ACCENTS: Record<string, string> = {
  'charity: water':          'a clear stream of clean water catching light in the background',
  'American Diabetes Association': 'a soft blue circular motif echoing in the background light',
  'Trees for the Future':    'a lush canopy of young saplings filling the background',
  'Team Rubicon':            'urgent purposeful energy in the composition, red and black in the background shadows',
  'Baby2Baby':               'a warm protective soft-pastel atmosphere, tenderness in every element of the light',
  'Partnership for a Healthier America': 'vibrant fresh produce implied in the background bokeh',
  'To Write Love On Her Arms': 'a single word written in light in the background, intimate and redemptive atmosphere',
  'Malala Fund':             'an open book and pencil suggested in the background, hopeful amber light',
  'International Justice Mission': 'a shield motif implied in background geometry, protective energy',
  'NextStep':                'athletic energy and forward movement, empowering light from below',
  'Playing For Change':      'musical notes and sound waves shimmering in background bokeh, warm stage light',
  'Coral Reef Alliance':     'iridescent teal and coral ocean colors refracting through the background',
  'PeacePlayers International': 'a basketball hoop silhouette in background shadows, urban court energy',
  'National Urban League':   'strong urban architecture framing the background, bold geometric shadows',
  'Equality Now':            'perfectly balanced symmetrical composition, equal light on both sides of the frame',
  'Crisis Text Line':        'a glowing phone screen light in the background bokeh, intimate supportive warmth',
  'USA for UNHCR':           'an open horizon suggesting journey and new beginnings, soft dawn light',
  'Action Against Hunger':   'golden grain fields in background bokeh, warm earth tones, abundance in the light',
  'Big Brothers Big Sisters of America': 'two silhouettes — an adult and child — suggested warmly in background bokeh',
  'Amnesty International USA': 'a single lit candle flame glowing in the deep background, thin wire texture in shadow',
}

// ── ASSEMBLER ─────────────────────────────────────────────────────────────────
export function buildPrompt(input: PromptInput): BuiltPrompt {
  const key = input.inspiration.toLowerCase()
  const theme = THEMES[key] || THEMES['hope']

  // Subject — photo or archetype
  const subject = input.hasPhoto
    ? `the person in the reference photo${input.personName ? ` (${input.personName})` : ''}`
    : `${theme.entity}${input.personName ? ` — ${input.personName}` : ''}`

  // Personal voice — user's own words embedded directly
  const personalVoice = input.inspirationWords?.trim()
    ? `The image must make this specific feeling visible: "${input.inspirationWords.trim()}"`
    : ''

  // Charity scene accent
  const charity = input.charityName
    ? `Background detail: ${CHARITY_ACCENTS[input.charityName] || `a subtle visual reference to ${input.charityName}`}. The subject advocates for ${input.charityName}.`
    : ''

  // Assemble in FLUX.2 optimal token order:
  // entity → action → aesthetic → environment → lighting → color → mood → personal voice → charity → quality stamp
  const parts = [
    // 1. Entity + action (highest weight — first tokens)
    `${subject}, ${theme.action}.`,

    // 2. Aesthetic/photographic treatment
    `${theme.aesthetic}.`,

    // 3. Environment
    `Environment: ${theme.environment}.`,

    // 4. Lighting (described as physical action, not label)
    `Lighting: ${theme.lighting}.`,

    // 5. Color palette with specifics
    `Colors: ${theme.color}.`,

    // 6. Mood
    `Mood: ${theme.mood}.`,

    // 7. Personal voice (user's own words — unique per generation)
    personalVoice,

    // 8. Charity accent
    charity,

    // 9. Quality stamp
    `Photorealistic, ultra-detailed, 8K, professional color grading, award-winning social media campaign portrait for GET INSPIRED at Cannes Lions 2026. Editorial, cinematic, worthy of being shared by thousands.`,
  ].filter(Boolean).join(' ')

  return {
    positive: parts,
    debug: {
      theme: key,
      subject,
      aesthetic: theme.aesthetic,
      environment: theme.environment,
      lighting: theme.lighting,
      color: theme.color,
      mood: theme.mood,
      personalVoice,
      charity,
    },
  }
}
