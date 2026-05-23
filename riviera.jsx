// riviera.jsx — Stylised French Riviera scene (golden hour, yachts at anchor).
// Used as the Hero background until a real photograph is provided.

function RivieraScene({ style }) {
  return (
    <svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      style={style}
    >
      <defs>
        {/* Sky: deep dusk blue overhead → warm peach → glowing gold at horizon */}
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#1F2E48" />
          <stop offset="30%" stopColor="#3E4D6A" />
          <stop offset="55%" stopColor="#A56F62" />
          <stop offset="78%" stopColor="#E9B074" />
          <stop offset="92%" stopColor="#F4D199" />
          <stop offset="100%" stopColor="#F8E0AF" />
        </linearGradient>
        {/* Sea: reflects sky, deeper at front */}
        <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#C68B5A" />
          <stop offset="22%" stopColor="#7C5871" />
          <stop offset="55%" stopColor="#2C3E5E" />
          <stop offset="100%" stopColor="#0E1B2C" />
        </linearGradient>
        {/* Sun glow */}
        <radialGradient id="sun" cx="0.62" cy="0.55" r="0.55">
          <stop offset="0%"   stopColor="#FFF3C2" stopOpacity="1" />
          <stop offset="22%"  stopColor="#FFD071" stopOpacity="0.9" />
          <stop offset="55%"  stopColor="#E29A55" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E29A55" stopOpacity="0" />
        </radialGradient>
        {/* Vertical sun reflection on water */}
        <linearGradient id="sunpath" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#FFE6A8" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#E29A55" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#E29A55" stopOpacity="0" />
        </linearGradient>
        {/* Distant haze on horizon */}
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#F4D199" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#F4D199" stopOpacity="0" />
        </linearGradient>
        {/* Coastline silhouettes (warm-dark layers) */}
        <linearGradient id="hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E5167" />
          <stop offset="100%" stopColor="#4B3A55" />
        </linearGradient>
        <linearGradient id="hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3C2E45" />
          <stop offset="100%" stopColor="#241C2E" />
        </linearGradient>

        {/* Soft star/light specks pattern */}
        <pattern id="shimmer" width="80" height="6" patternUnits="userSpaceOnUse">
          <rect width="80" height="6" fill="none" />
          <circle cx="10" cy="3" r="0.8" fill="#FFE6A8" opacity="0.55" />
          <circle cx="34" cy="2" r="0.5" fill="#FFE6A8" opacity="0.4" />
          <circle cx="58" cy="4" r="0.6" fill="#FFE6A8" opacity="0.5" />
        </pattern>

        {/* Reusable yacht silhouette */}
        <symbol id="yacht" viewBox="0 0 200 60">
          {/* Hull */}
          <path d="M 6 38 L 18 28 L 175 28 L 195 38 L 188 46 Q 100 56 12 46 Z" fill="currentColor" />
          {/* Lower deck windows strip */}
          <rect x="34" y="32" width="130" height="3" fill="#FFE6A8" opacity="0.6" />
          {/* Mid deck */}
          <path d="M 30 28 L 38 18 L 158 18 L 168 28 Z" fill="currentColor" />
          <rect x="44" y="22" width="110" height="2.5" fill="#FFE6A8" opacity="0.55" />
          {/* Upper deck / bridge */}
          <path d="M 58 18 L 64 8 L 130 8 L 138 18 Z" fill="currentColor" />
          <rect x="68" y="11" width="62" height="2.5" fill="#FFE6A8" opacity="0.5" />
          {/* Mast */}
          <rect x="100" y="-8" width="1.2" height="16" fill="currentColor" />
          {/* Antenna ball */}
          <circle cx="100.6" cy="-10" r="1.2" fill="currentColor" />
        </symbol>
      </defs>

      {/* SKY */}
      <rect width="1600" height="660" fill="url(#sky)" />
      {/* Sun + halo */}
      <rect x="600" y="380" width="700" height="380" fill="url(#sun)" />
      <circle cx="1060" cy="612" r="58" fill="#FFF6D6" opacity="0.95" />
      <circle cx="1060" cy="612" r="92" fill="#FFE39A" opacity="0.45" />

      {/* Far coastline (Esterel-style headlands left + right) */}
      <g opacity="0.85">
        <path d="M 0 640 L 0 580 Q 90 555 180 572 Q 260 588 320 562 Q 380 538 460 558 Q 520 575 580 568 L 580 640 Z"
              fill="url(#hill-far)" />
        <path d="M 1180 640 L 1180 588 Q 1240 558 1290 570 Q 1340 582 1400 562 Q 1470 540 1540 558 Q 1580 568 1600 564 L 1600 640 Z"
              fill="url(#hill-far)" />
      </g>
      {/* Closer headland (left, Cap-style) — slightly warmer/darker */}
      <path d="M 0 660 L 0 612 Q 70 596 150 608 Q 220 618 290 600 Q 350 584 430 600 Q 480 612 540 605 Q 590 600 640 612 L 640 660 Z"
            fill="url(#hill-mid)" opacity="0.95" />
      {/* Closer headland (right) */}
      <path d="M 1100 660 L 1100 616 Q 1170 600 1240 608 Q 1310 614 1380 600 Q 1450 588 1520 608 Q 1570 620 1600 614 L 1600 660 Z"
            fill="url(#hill-mid)" opacity="0.95" />

      {/* Atmospheric haze just above horizon */}
      <rect x="0" y="600" width="1600" height="80" fill="url(#haze)" />

      {/* SEA */}
      <rect y="660" width="1600" height="340" fill="url(#sea)" />
      {/* Sun reflection path on water */}
      <path d="M 990 660 L 1130 660 L 1240 1000 L 880 1000 Z" fill="url(#sunpath)" />
      {/* Subtle horizontal wave shimmer */}
      <rect y="678" width="1600" height="6"  fill="url(#shimmer)" opacity="0.7" />
      <rect y="704" width="1600" height="6"  fill="url(#shimmer)" opacity="0.55" />
      <rect y="740" width="1600" height="6"  fill="url(#shimmer)" opacity="0.45" />
      <rect y="788" width="1600" height="6"  fill="url(#shimmer)" opacity="0.35" />
      <rect y="848" width="1600" height="6"  fill="url(#shimmer)" opacity="0.25" />

      {/* Anchor line and yachts — far to near */}
      {/* Far small yacht (left of sun) */}
      <g color="#2A2230" opacity="0.85">
        <use href="#yacht" x="320" y="638" width="80" height="24" />
      </g>
      {/* Far yacht (right of sun) */}
      <g color="#1F1A28" opacity="0.9">
        <use href="#yacht" x="1280" y="640" width="92" height="28" />
      </g>
      {/* Mid yacht */}
      <g color="#15101C" opacity="0.95">
        <use href="#yacht" x="180" y="680" width="170" height="50" />
        {/* Warm rim light on hull facing sun */}
        <rect x="320" y="697" width="22" height="3" fill="#FFCB7A" opacity="0.6" />
      </g>
      {/* Hero foreground super yacht */}
      <g color="#0B0812">
        <use href="#yacht" x="820" y="710" width="520" height="156" />
        {/* Warm rim light along upper deck facing sun */}
        <g opacity="0.85">
          <rect x="1170" y="735" width="60" height="2.6" fill="#FFD893" />
          <rect x="1170" y="763" width="80" height="2.6" fill="#FFD893" opacity="0.7" />
          <rect x="1170" y="791" width="120" height="2.6" fill="#FFD893" opacity="0.5" />
        </g>
        {/* Reflection underneath */}
        <ellipse cx="1080" cy="870" rx="240" ry="6" fill="#0B0812" opacity="0.55" />
      </g>

      {/* A few birds */}
      <g fill="none" stroke="#1F1A28" strokeWidth="1.4" opacity="0.7" strokeLinecap="round">
        <path d="M 340 420 q 8 -8 16 0 q 8 -8 16 0" />
        <path d="M 410 380 q 6 -6 12 0 q 6 -6 12 0" />
        <path d="M 500 440 q 5 -5 10 0 q 5 -5 10 0" />
      </g>
    </svg>
  );
}

window.RivieraScene = RivieraScene;
