# Metaminds Cybernetic Dark Luxury: Visual Design System

This design system codifies the exact tokens, color variables, typography scales, glassmorphism filters, glowing perimeter borders, and spatial grids extracted from `metaminds.studio/ai-mumbai`.

---

## 1. Color Palette Tokens

```css
:root {
  /* ==========================================================================
     Base Backgrounds & Void Tones
     ========================================================================== */
  --color-bg-base:        #08080c;  /* Primary background (deep midnight void) */
  --color-bg-surface:     #0d0e15;  /* Section secondary surface */
  --color-bg-card:        #141522;  /* Elevated card background */
  --color-bg-card-hover:  #191b2c;  /* Elevated card hover */
  --color-bg-translucent: rgba(20, 21, 34, 0.75); /* Frosted surface */

  /* ==========================================================================
     Luminous Accent Palette
     ========================================================================== */
  --color-accent-indigo:   #373782;  /* Badge fill, primary brand anchor */
  --color-accent-electric: #6d6dff;  /* Hero gradient spot, active highlights */
  --color-accent-deep-blue:#3418ce;  /* Ambient back-glow stop */
  --color-accent-magenta:  #ff00e5;  /* Cyber pink perimeter glow */
  --color-accent-cyan:     #00f0ff;  /* Tertiary edge reflection */

  /* ==========================================================================
     High-Contrast Typography Palette
     ========================================================================== */
  --color-text-primary:    rgba(255, 255, 255, 0.95); /* 95% White */
  --color-text-secondary:  rgba(201, 201, 255, 0.90); /* Lavender-tinted white */
  --color-text-body:       rgba(255, 255, 255, 0.75); /* 75% White for paragraphs */
  --color-text-muted:      rgba(255, 255, 255, 0.50); /* 50% White for subtext */
  --color-text-faint:      rgba(255, 255, 255, 0.25); /* 25% White for borders/lines */

  /* ==========================================================================
     Glassmorphism Borders & Outlines
     ========================================================================== */
  --border-subtle:         1px solid rgba(255, 255, 255, 0.08);
  --border-glass:          1px solid rgba(255, 255, 255, 0.15);
  --border-pill:           1px solid rgba(255, 255, 255, 0.30);
  --border-active:         1px solid rgba(255, 255, 255, 0.60);

  /* ==========================================================================
     Depth & Blur Variables
     ========================================================================== */
  --blur-pill:             blur(20px);
  --blur-navbar:           blur(10px);
  --blur-card:             blur(15px);
  --blur-ambient:          blur(24px);

  /* ==========================================================================
     Border Radii
     ========================================================================== */
  --radius-pill:           9999px;
  --radius-card-lg:        24px;
  --radius-card:           20px;
  --radius-card-sm:        14px;
  --radius-badge:          80px;
}
```

---

## 2. Typography Hierarchy

### Font Families
1. **Primary Headline & UI**: `'Manrope', -apple-system, BlinkMacSystemFont, sans-serif`
2. **Tech & Data Accents**: `'Inconsolata', monospace`
3. **Editorial Numerics**: `'Oswald', sans-serif`
4. **Alternative Modern**: `'Matter', 'Montserrat', sans-serif`

### Fluid Typography Scale
| Element | Desktop Size | Mobile Size | Line Height | Letter Spacing | Font Weight |
|---|---|---|---|---|---|
| **Hero H1** | `min(9.74vh, 4.75rem)` (~76px) | `2.5rem` (40px) | `1.08` | `-0.025em` | `600` (SemiBold) |
| **Section H2** | `min(5vh, 2.75rem)` (~44px) | `1.75rem` (28px) | `1.15` | `-0.02em` | `500` (Medium) |
| **Card H3** | `1.75rem` (28px) | `1.25rem` (20px) | `1.25` | `-0.015em` | `600` (SemiBold) |
| **Feature H4**| `1.25rem` (20px) | `1.125rem` (18px)| `1.30` | `normal` | `600` (SemiBold) |
| **Body Large**| `1.125rem` (18px)| `1.0rem` (16px)  | `1.55` | `normal` | `400` (Regular) |
| **Body Base** | `1.0rem` (16px)  | `0.9375rem` (15px)|`1.50` | `normal` | `400` (Regular) |
| **Badge / Tag**| `0.875rem` (14px)| `0.75rem` (12px) | `1.00` | `+0.02em` | `500` (Medium) |
| **Giant Marquee**| `clamp(64px, 9vw, 128px)` | `48px` | `1.00` | `-0.03em` | `700` (Bold) |

---

## 3. Chrome Metallic Heading Effect

```css
.heading-chrome-silver {
  background-image: linear-gradient(180deg, #ffffff 15%, #9e9eb0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}
```

---

## 4. Glassmorphic Capsule Badges & Navigation

```css
/* Navigation Capsule Bar */
.navbar-capsule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 10px 6px 20px;
  background-color: rgba(31, 31, 31, 0.65);
  backdrop-filter: var(--blur-navbar);
  -webkit-backdrop-filter: var(--blur-navbar);
  border: var(--border-subtle);
  border-radius: var(--radius-pill);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
}

/* Hero Pill Badge */
.badge-capsule {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  height: 36px;
  padding: 3px 16px 3px 4px;
  background-color: var(--color-bg-translucent);
  backdrop-filter: var(--blur-pill);
  -webkit-backdrop-filter: var(--blur-pill);
  border: var(--border-pill);
  border-radius: var(--radius-pill);
}

.badge-counter {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: var(--color-accent-indigo);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}
```

---

## 5. Glowing Mask Perimeter Formula

```css
.glowing-card {
  position: relative;
  background: var(--color-bg-card);
  border-radius: var(--radius-card);
  padding: 32px 28px;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
}

.glowing-card::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: calc(var(--radius-card) + 1px);
  padding: 1px;
  background: linear-gradient(
    145deg,
    rgba(255, 0, 229, 0.8) 0%,
    rgba(20, 21, 34, 0.9) 30%,
    rgba(10, 10, 14, 0.95) 50%,
    rgba(109, 109, 255, 0.8) 75%,
    rgba(0, 240, 255, 0.5) 100%
  );
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
}

.glowing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(109, 109, 255, 0.15), 0 5px 20px rgba(255, 0, 229, 0.1);
}
```
