import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // ─────────────────────────────────────────────
      // COLORS — semantically named, decision-first
      // ─────────────────────────────────────────────
      colors: {
        // Primary — action, identity, focus
        primary: {
          50:  "#EEF4FF",
          100: "#EBF2FF",
          200: "#C3D7FD",
          300: "#93B8FB",
          400: "#5B8FF9", // secondary icons, highlight borders
          500: "#2F6FED", // CTAs, active links, focus rings
          600: "#1A56C4", // hover state, pressed buttons
          700: "#1340A0",
          800: "#102E7A",
          900: "#0A2463", // authoritative text on light bg
        },

        // Score — the product's heartbeat
        score: {
          hot:      "#F5521A", // 🔥 80–100 priority leads
          "hot-bg": "#FFF1EC",
          warm:     "#F5A623", // 🌤 50–79 qualify leads
          "warm-bg":"#FFF8EC",
          cold:     "#6B7C93", // ❄️ 0–49 low priority
          "cold-bg":"#F5F7FA",
        },

        // Semantic feedback
        success: {
          50:  "#F0FDF4",
          100: "#E8F9EE",
          400: "#34D058",
          500: "#1DB954", // active company, confirmed data
          600: "#178F41",
          700: "#126B31",
        },
        warning: {
          50:  "#FFFBEB",
          100: "#FFF8EC",
          400: "#FBBF24",
          500: "#F5A623", // incomplete data, attention
          600: "#D97706",
          700: "#B45309",
        },
        error: {
          50:  "#FFF5F5",
          100: "#FDECEA",
          400: "#F87171",
          500: "#E5303B", // invalid CNPJ, API fail, inactive company
          600: "#C0212A",
          700: "#9B1824",
        },

        // Surface — interface depth layers (dark mode defaults)
        surface: {
          base:    "#0D1117", // root background
          raised:  "#161C26", // cards, panels, modals
          overlay: "#1E2737", // hover, dropdowns, tooltips
          border:  "#2A3548", // dividers, separators
          ghost:   "#111827", // table rows, low-contrast areas
        },

        // Neutral scale — universal text and borders
        neutral: {
          50:  "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B", // placeholders, tertiary text
          600: "#475569",
          700: "#334155", // secondary text, labels
          800: "#1E293B",
          900: "#0F172A", // primary text on light bg
          950: "#020617",
        },

        // Segment badge palettes (CNAE translation)
        segment: {
          tech:    { bg: "#EBF2FF", text: "#1A56C4", border: "#93B8FB" },
          retail:  { bg: "#E8F9EE", text: "#178F41", border: "#34D058" },
          service: { bg: "#FFF8EC", text: "#D97706", border: "#FBBF24" },
          industry:{ bg: "#F1F5F9", text: "#334155", border: "#94A3B8" },
        },
      },

      // ─────────────────────────────────────────────
      // TYPOGRAPHY — decision-first hierarchy
      // ─────────────────────────────────────────────
      fontFamily: {
        display:  ["DM Serif Display", "Georgia", "serif"],
        sans:     ["IBM Plex Sans", "system-ui", "sans-serif"],
        mono:     ["IBM Plex Mono", "Menlo", "monospace"],
      },
      fontSize: {
        // Label — uppercase section headers
        "label":    ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "700" }],
        // Body
        "body-sm":  ["0.75rem",   { lineHeight: "1.5" }],
        "body-md":  ["0.875rem",  { lineHeight: "1.5" }],
        "body-lg":  ["1rem",      { lineHeight: "1.5" }],
        // Insight callouts
        "insight":  ["0.875rem",  { lineHeight: "1.5", fontWeight: "500" }],
        // Data / technical (mono)
        "data":     ["0.8125rem", { lineHeight: "1.4", fontFamily: "IBM Plex Mono" }],
        "data-lg":  ["0.9375rem", { lineHeight: "1.4", fontFamily: "IBM Plex Mono" }],
        // Headings
        "heading-sm": ["0.875rem",  { lineHeight: "1.2", fontWeight: "700" }],
        "heading-md": ["1.125rem",  { lineHeight: "1.2", fontWeight: "600" }],
        "heading-lg": ["1.5rem",    { lineHeight: "1.2", fontWeight: "600" }],
        // Display — score, hero, company name
        "display":    ["2rem",      { lineHeight: "1.1", fontFamily: "DM Serif Display" }],
        "display-lg": ["2.5rem",    { lineHeight: "1.1", fontFamily: "DM Serif Display" }],
      },

      // ─────────────────────────────────────────────
      // SPACING — 4pt base system
      // ─────────────────────────────────────────────
      spacing: {
        px:   "1px",
        0:    "0",
        0.5:  "2px",
        1:    "4px",    // micro — icon + label gap
        1.5:  "6px",
        2:    "8px",    // xs — badge internal padding
        2.5:  "10px",
        3:    "12px",   // sm — group gap
        3.5:  "14px",
        4:    "16px",   // md — card compact padding, form gap
        5:    "20px",   // lg — card section gap
        6:    "24px",   // xl — card default padding
        7:    "28px",
        8:    "32px",   // 2xl — card gap, container padding
        9:    "36px",
        10:   "40px",   // 3xl — page section
        12:   "48px",   // 4xl — block divider
        14:   "56px",
        16:   "64px",   // 5xl — major block spacing
        20:   "80px",
        24:   "96px",
        28:   "112px",
        32:   "128px",
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────
      borderRadius: {
        none:  "0",
        xs:    "4px",   // badges, chips
        sm:    "6px",   // inputs, buttons
        DEFAULT:"8px",
        md:    "10px",  // compact cards
        lg:    "16px",  // main cards
        xl:    "24px",  // modals, panels
        "2xl": "32px",
        full:  "9999px",// score circle, avatars
      },

      // ─────────────────────────────────────────────
      // BOX SHADOW — depth + glows
      // ─────────────────────────────────────────────
      boxShadow: {
        sm:           "0 1px 2px rgba(0,0,0,0.12)",
        DEFAULT:      "0 2px 6px rgba(0,0,0,0.14)",
        md:           "0 4px 12px rgba(0,0,0,0.15)",
        lg:           "0 8px 32px rgba(0,0,0,0.20)",
        xl:           "0 16px 48px rgba(0,0,0,0.24)",
        "glow-hot":   "0 0 20px rgba(245,82,26,0.30), 0 0 40px rgba(245,82,26,0.15)",
        "glow-warm":  "0 0 20px rgba(245,166,35,0.25), 0 0 40px rgba(245,166,35,0.12)",
        "glow-primary":"0 0 20px rgba(47,111,237,0.30), 0 0 40px rgba(47,111,237,0.15)",
        "glow-success":"0 0 16px rgba(29,185,84,0.25)",
        "inner-sm":   "inset 0 1px 3px rgba(0,0,0,0.15)",
        none:         "none",
      },

      // ─────────────────────────────────────────────
      // TRANSITIONS & ANIMATIONS
      // ─────────────────────────────────────────────
      transitionDuration: {
        instant: "0ms",
        fast:    "150ms",   // hover, focus
        normal:  "250ms",   // component transitions
        slow:    "400ms",   // card enter, modals
        score:   "600ms",   // score count-up animation
      },
      transitionTimingFunction: {
        "ease-arrive":  "cubic-bezier(0.0, 0.0, 0.2, 1.0)", // elements entering
        "ease-depart":  "cubic-bezier(0.4, 0.0, 1.0, 1.0)", // elements leaving
        "ease-snappy":  "cubic-bezier(0.4, 0.0, 0.2, 1.0)", // UI controls
        "ease-bounce":  "cubic-bezier(0.34, 1.56, 0.64, 1.0)", // playful entrances
      },
      keyframes: {
        // Skeleton shimmer
        shimmer: {
          "0%":   { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        // Score count-up entrance
        "score-in": {
          "0%":   { opacity: "0", transform: "scale(0.8) translateY(8px)" },
          "60%":  { opacity: "1", transform: "scale(1.05) translateY(-2px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        // Card entrance
        "slide-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Pulse for hot score badge
        "pulse-hot": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(245,82,26,0)" },
          "50%":       { boxShadow: "0 0 0 6px rgba(245,82,26,0.15)" },
        },
        // Fade in
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Insight block entrance (staggered)
        "insight-in": {
          "0%":   { opacity: "0", transform: "translateX(-8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        shimmer:     "shimmer 1.5s linear infinite",
        "score-in":  "score-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "slide-up":  "slide-up 0.4s cubic-bezier(0.0, 0.0, 0.2, 1) both",
        "pulse-hot": "pulse-hot 2s ease-in-out infinite",
        "fade-in":   "fade-in 0.25s ease-out both",
        "insight-in":"insight-in 0.3s ease-out both",
      },

      // ─────────────────────────────────────────────
      // GRID & LAYOUT
      // ─────────────────────────────────────────────
      maxWidth: {
        app: "1280px",
        card: "480px",
        "card-lg": "640px",
      },
      gridTemplateColumns: {
        "result": "1fr 1fr 1fr",
        "result-md": "1fr 1fr",
        "result-sm": "1fr",
        "card-inner": "auto 1fr",
      },

      // ─────────────────────────────────────────────
      // SCREENS — responsive breakpoints
      // ─────────────────────────────────────────────
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      // ─────────────────────────────────────────────
      // OPACITY — consistent usage
      // ─────────────────────────────────────────────
      opacity: {
        disabled: "0.4",   // disabled states
        subtle:   "0.6",   // secondary/deemphasized content
        medium:   "0.8",   // slightly faded
        full:     "1",
      },

      // ─────────────────────────────────────────────
      // Z-INDEX — layering system
      // ─────────────────────────────────────────────
      zIndex: {
        "base":    "0",
        "raised":  "10",
        "dropdown":"100",
        "overlay": "200",
        "modal":   "300",
        "toast":   "400",
        "tooltip": "500",
      },
    },
  },
  plugins: [
    // Utility plugin for skeleton shimmer background
    function ({ addUtilities }: { addUtilities: (u: Record<string, unknown>) => void }) {
      addUtilities({
        ".skeleton": {
          background: "linear-gradient(90deg, #1E2737 25%, #2A3548 50%, #1E2737 75%)",
          backgroundSize: "800px 100%",
          animation: "shimmer 1.5s linear infinite",
          borderRadius: "6px",
        },
        ".skeleton-light": {
          background: "linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%)",
          backgroundSize: "800px 100%",
          animation: "shimmer 1.5s linear infinite",
          borderRadius: "6px",
        },
        // Score temperature utilities
        ".score-hot": {
          color: "#F5521A",
          backgroundColor: "#FFF1EC",
        },
        ".score-warm": {
          color: "#F5A623",
          backgroundColor: "#FFF8EC",
        },
        ".score-cold": {
          color: "#6B7C93",
          backgroundColor: "#F5F7FA",
        },
        // Segment badge base
        ".badge-tech": {
          color: "#1A56C4",
          backgroundColor: "#EBF2FF",
          border: "1px solid #93B8FB",
        },
        ".badge-retail": {
          color: "#178F41",
          backgroundColor: "#E8F9EE",
          border: "1px solid #34D058",
        },
        ".badge-service": {
          color: "#D97706",
          backgroundColor: "#FFF8EC",
          border: "1px solid #FBBF24",
        },
        ".badge-industry": {
          color: "#334155",
          backgroundColor: "#F1F5F9",
          border: "1px solid #94A3B8",
        },
        // Focus ring consistent with primary
        ".focus-ring": {
          outline: "2px solid #2F6FED",
          outlineOffset: "2px",
        },
      });
    },
  ],
};

export default config;
