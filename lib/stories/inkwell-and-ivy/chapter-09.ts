import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 9 — "Festival Prep"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 2.
 * Big group chapter: Priya, Kai, Ren, and townsfolk all pitch in on the
 * festival booth. The choice here determines who the player leans on
 * most, which is the Ch.11 route-split tiebreaker if affection totals
 * are equal.
 */
export const chapter09: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 9,
  title: "Festival Prep",
  act: 2,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c9-n1",
      speaker: "narrator",
      text: "By Saturday morning the shop doesn't look like a shop anymore. Folding tables cover the sidewalk out front, and half the town seems to have found a reason to stop by and help.",
      background: "shop-exterior-morning",
    },
    {
      type: "dialogue",
      id: "c9-n2",
      speaker: "narrator",
      text: "Priya's directing the chaos like she's run a hundred of these, which, as far as you can tell, she basically has. Kai's measuring the booth frame with a level and a tape measure. Ren's already elbow-deep in a tray of samples, muttering to himself about presentation.",
    },
    {
      type: "dialogue",
      id: "c9-n3",
      speaker: "priya",
      emotion: "happy",
      text: "\"Don't just stand there looking useful.\" She shoves a roll of ribbon into your hands without breaking stride. \"Everyone's got a job today. Go find yours.\"",
    },
    {
      type: "dialogue",
      id: "c9-n4",
      speaker: "kai",
      emotion: "neutral",
      text: "\"The signage needs another set of hands if we want it straight.\" He holds up a half-finished banner. \"I could use someone with a steadier eye than mine for the lettering.\"",
    },
    {
      type: "dialogue",
      id: "c9-n5",
      speaker: "ren",
      emotion: "happy",
      text: "\"Or,\" Ren cuts in, sliding a tray toward you, \"you could help me get through four dozen samples before they go stale, and actually have fun while you're at it. Your call.\"",
    },
    {
      type: "choice",
      id: "c9-c1",
      prompt: "Who do you spend the afternoon working alongside?",
      options: [
        {
          id: "helpKai",
          text: "Grab the ribbon and lettering supplies. Kai's booth first.",
          affectionDelta: { kai: 3 },
          setsFlag: "ch9LeanedKai",
        },
        {
          id: "helpRen",
          text: "Pull up a stool at Ren's station. Samples first.",
          affectionDelta: { ren: 3 },
          setsFlag: "ch9LeanedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c9-n6a",
      speaker: "kai",
      emotion: "happy",
      text: "You spend the next two hours hunched over the banner with Kai, trading the pen back and forth so the lettering stays consistent. He doesn't talk much while he works, but somewhere around the third letter he starts humming, low and off-key, and doesn't seem to notice he's doing it.",
      requiresFlag: "ch9LeanedKai",
    },
    {
      type: "dialogue",
      id: "c9-n6b",
      speaker: "kai",
      text: "\"You're better at this than I expected.\" He holds the finished banner up, checking the line. \"Lila would've liked this one. She always said the old signs looked like a toddler wrote them.\"",
      requiresFlag: "ch9LeanedKai",
    },
    {
      type: "dialogue",
      id: "c9-n7a",
      speaker: "ren",
      emotion: "happy",
      text: "You end up on sample duty with Ren for two chaotic, flour-dusted hours, tasting things faster than either of you can keep track of, laughing more than the task strictly calls for.",
      requiresFlag: "ch9LeanedRen",
    },
    {
      type: "dialogue",
      id: "c9-n7b",
      speaker: "ren",
      text: "\"Okay, real talk.\" He hands you the twelfth variation of the same pastry. \"Tell me honestly if this one's worse than the last one, or I'll never trust your taste again.\"",
      requiresFlag: "ch9LeanedRen",
    },
    {
      type: "dialogue",
      id: "c9-n8",
      speaker: "narrator",
      text: "By early evening the booth is standing, the banner's straight, and the samples have somehow survived the afternoon. Priya declares it good enough to stop fussing over, which from her is the highest compliment available.",
    },
    {
      type: "dialogue",
      id: "c9-n9",
      speaker: "narrator",
      text: "The four of you stand back and look at what's basically a small production, built out of one grief and a lot of stubbornness. Whatever happens at the festival, it won't be for lack of people showing up for this place.",
    },
  ],
};
