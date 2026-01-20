function BgAnimation() {
  return (
    <svg
      viewBox="0 0 602 602"
      xmlns="https://cdn.svgator.com/images/2022/06/animated-svg-background-css.svg"
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] sm:w-[8zl00px] sm:h-[800px] z-0 opacity-50"
    >
      <defs>
        {/* A subtle gradient for the path lines so they don't look too harsh */}
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="50%" stopColor="white" stopOpacity="0.2" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Glow effect for the moving dots */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background Paths (The Rails) */}
      <g stroke="url(#lineGrad)" strokeWidth="2" fill="none">
        <path id="p0" d="M201 87 L514 400" />
        <path id="p1" d="M514 201 L87 429" />
        <path id="p2" d="M87 172 L400 514" />
      </g>

      {/* Moving dots using mpath */}
      <circle r="5" fill="#fff" filter="url(#glow)">
        <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p0" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#F97316" filter="url(#glow)">
        <animateMotion dur="7s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p1" />
        </animateMotion>
      </circle>

      <circle r="5" fill="#54D6BB" filter="url(#glow)">
        <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
          <mpath href="#p2" />
        </animateMotion>
      </circle>
    </svg>
  );
}

export default BgAnimation;
