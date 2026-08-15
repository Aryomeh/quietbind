export interface StoryCatalogEntry {
  slug: string;
  title: string;
  genre: string;
  playable: boolean;
}

/**
 * Platform-wide story list for the picker screen. Sourced from
 * docs/QUIETBIND-STATE.md §4. Only Inkwell & Ivy has chapter data written
 * so far — the rest render as "coming soon" until their chapters exist.
 */
export const storyCatalog: StoryCatalogEntry[] = [
  { slug: "inkwell-and-ivy", title: "Inkwell & Ivy", genre: "Cozy romance / mystery", playable: true },
  { slug: "moonlight-letters", title: "Moonlight Letters", genre: "Romance / mystery / drama", playable: false },
  { slug: "the-midnight-cafe", title: "The Midnight Café", genre: "Fantasy romance", playable: false },
  { slug: "crimson-masquerade", title: "Crimson Masquerade", genre: "Murder mystery / thriller", playable: false },
  { slug: "echoes-of-tomorrow", title: "Echoes of Tomorrow", genre: "Time-loop romance", playable: false },
  { slug: "the-forgotten-garden", title: "The Forgotten Garden", genre: "Cozy family mystery", playable: false },
  { slug: "the-last-train-home", title: "The Last Train Home", genre: "Supernatural romance", playable: false },
];
