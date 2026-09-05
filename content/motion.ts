import type { CSSProperties } from "react";

/**
 * The opening sequence, in milliseconds. The stylesheet reads these as custom
 * properties and the accent canvas reads them as numbers, so this is the only
 * place any of them are set.
 */
export const OPEN = {
  void: 400,
  field: 1000,
  wordStart: 540,
  wordStep: 76,
  wordDur: 700,
  fire: 1300,
  volt: 850,
} as const;

/** When the last word of an n-word headline finishes its wipe. */
export function landAfter(words: number) {
  return OPEN.wordStart + (words - 1) * OPEN.wordStep + OPEN.wordDur;
}

export const OPENING_VARS = {
  "--open-void": `${OPEN.void}ms`,
  "--open-field": `${OPEN.field}ms`,
  "--word-start": `${OPEN.wordStart}ms`,
  "--word-step": `${OPEN.wordStep}ms`,
  "--word-dur": `${OPEN.wordDur}ms`,
  "--fire-dur": `${OPEN.fire}ms`,
  "--volt-dur": `${OPEN.volt}ms`,
} as CSSProperties;
