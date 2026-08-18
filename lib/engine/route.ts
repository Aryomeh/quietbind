import type { RouteId, CharacterId } from "@/lib/engine/types";

/** One candidate route in a route-split chapter — e.g. "kai" wins if his
 * tracked affection is highest, with a flag-based tiebreaker if it's tied
 * with another candidate. */
export interface RouteCandidate {
  route: RouteId;
  affectionKey: CharacterId;
  /** Story flag that breaks a tie in this candidate's favor (e.g. set by
   * an earlier chapter's "who do you lean on" choice). */
  tiebreakerFlag: string;
}

/** Config for a story's single route-split chapter — story-agnostic, so any
 * story can define its own candidates via its manifest. */
export interface RouteSplitConfig {
  /** Chapter number where the split is decided (Inkwell & Ivy: 11). */
  chapter: number;
  candidates: RouteCandidate[];
}

/**
 * Picks the winning route once a route-split chapter completes, by comparing
 * each candidate's affection total. Ties are broken by whichever candidate's
 * tiebreakerFlag is set. If it's still ambiguous (e.g. no tiebreaker flag was
 * ever set), falls back to the first candidate in the list — deterministic,
 * so the same playthrough always resolves the same way.
 */
export function resolveLockedRoute(
  affection: Record<string, number>,
  flags: Set<string>,
  config: RouteSplitConfig
): RouteId {
  let winners = [config.candidates[0]];
  let best = affection[config.candidates[0].affectionKey] ?? 0;

  for (const candidate of config.candidates.slice(1)) {
    const score = affection[candidate.affectionKey] ?? 0;
    if (score > best) {
      winners = [candidate];
      best = score;
    } else if (score === best) {
      winners.push(candidate);
    }
  }

  if (winners.length === 1) return winners[0].route;

  const tiebreakWinner = winners.find((c) => flags.has(c.tiebreakerFlag));
  return (tiebreakWinner ?? winners[0]).route;
}
