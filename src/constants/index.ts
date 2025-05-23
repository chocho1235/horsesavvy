// Animation constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.4,
  SLOW: 0.6
} as const;

export const ANIMATION_EASE = {
  EASE_OUT: "easeOut",
  EASE_IN: "easeIn",
  EASE_IN_OUT: "easeInOut"
} as const;

// Breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
} as const;

// Contact information
export const CONTACT = {
  PHONE: "+44 7506 600 222",
  EMAIL: "Penelopepleasant@gmail.com"
} as const;

// Course pricing
export const COURSE_PRICES = {
  HORSE_KNOWLEDGE_PART_1: 97,
  HORSE_KNOWLEDGE_PART_2: 97,
  BHS_STAGE_1_THEORY: 97,
  BHS_STAGE_2_THEORY: 97,
  BRONZE_AWARD: 97
} as const;

// Common animation variants
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" }
} as const;

export const FADE_IN = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 }
} as const; 