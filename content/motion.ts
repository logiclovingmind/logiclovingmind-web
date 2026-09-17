import type { CSSProperties } from "react";

/**
 * The opening sequence, in milliseconds. The stylesheet reads these as custom
 * properties, so this is the only place any of them are set.
 */
export const OPEN = {
  void: 400,
  field: 1000,
  wordStart: 540,
  wordStep: 76,
  wordDur: 700,
} as const;

export const OPENING_VARS = {
  "--open-void": `${OPEN.void}ms`,
  "--open-field": `${OPEN.field}ms`,
  "--word-start": `${OPEN.wordStart}ms`,
  "--word-step": `${OPEN.wordStep}ms`,
  "--word-dur": `${OPEN.wordDur}ms`,
} as CSSProperties;
