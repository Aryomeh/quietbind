import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 14 — "Festival Eve" (REN ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3B.
 *
 * Ren and the player prep the booth together late into the night, a
 * lighter, banter-heavy near-confession than the Kai route's version.
 */
export const chapter14Ren: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 14,
  title: "Festival Eve",
  act: 3,
  route: "ren",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c14r-n1",
      speaker: "narrator",
      text: "The booth's mostly done, but Ren insists on one more pass at the pastry display after everyone else has gone home, convinced the arrangement is \"fighting him,\" whatever that means. You stay to hold the flashlight, which somehow turns into staying for the whole thing.",
      background: "town-square-evening",
    },
    {
      type: "dialogue",
      id: "c14r-n2",
      speaker: "ren",
      emotion: "happy",
      text: "\"Higher on the left. No, my left.\" He's got flour on his sleeve and a smear of something on his jaw he clearly doesn't know about. \"You're supposed to be helping, not judging my life choices.\"",
    },
    {
      type: "dialogue",
      id: "c14r-n3",
      speaker: "narrator",
      text: "You point out the flour. He looks personally betrayed by its existence, swipes at the wrong cheek entirely, and gives up when you can't stop laughing at him.",
    },
    {
      type: "dialogue",
      id: "c14r-n4",
      speaker: "ren",
      emotion: "neutral",
      text: "\"Fine. You get it, since apparently I can't be trusted with my own face.\" He leans down without thinking twice about it, tilting his jaw toward you, easy as anything.",
    },
    {
      type: "dialogue",
      id: "c14r-n5",
      speaker: "narrator",
      text: "It's a small, ordinary thing, wiping flour off someone's face, except it isn't, not with how close he's standing and how neither of you moves back once it's done.",
    },
    {
      type: "dialogue",
      id: "c14r-n6",
      speaker: "ren",
      emotion: "blushing",
      text: "\"You're staring,\" he says, echoing Kai's old line back at you without seeming to realize it, quieter than his usual teasing. \"I can feel it.\"",
    },
    {
      type: "choice",
      id: "c14r-c1",
      prompt: "The joke's still hanging there, but the moment underneath it isn't a joke. What do you do?",
      options: [
        {
          id: "meetItHead-on",
          text: "\"Maybe I like what I'm looking at.\" Stay right where you are.",
          affectionDelta: { ren: 4 },
          setsFlag: "ch14RenMetHeadOn",
        },
        {
          id: "keepItLight",
          text: "Laugh it off, but don't step back either. \"Can't help it, you're a mess.\"",
          affectionDelta: { ren: 2 },
          setsFlag: "ch14RenKeptItLight",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c14r-n7a",
      speaker: "ren",
      emotion: "blushing",
      text: "Whatever he was expecting, it wasn't that. He goes quiet for a second, something unguarded crossing his face before the grin comes back, softer than usual. \"Yeah?\" He leans in slow, like he's giving himself one more chance to chicken out and isn't taking it.",
      requiresFlag: "ch14RenMetHeadOn",
    },
    {
      type: "dialogue",
      id: "c14r-n7b",
      speaker: "ren",
      emotion: "happy",
      text: "He laughs, but it comes out a little unsteady, and he doesn't step back either. \"Rude,\" he says, without any heat behind it, close enough now that the joke's clearly not doing the work it's supposed to anymore.",
      requiresFlag: "ch14RenKeptItLight",
    },
    {
      type: "dialogue",
      id: "c14r-n8",
      speaker: "narrator",
      text: "It doesn't quite happen. A car door slams somewhere across the square, one of the festival committee dropping off last-minute banners, and Ren jerks back half a step, laughing at himself under his breath.",
    },
    {
      type: "dialogue",
      id: "c14r-n9",
      speaker: "ren",
      emotion: "neutral",
      text: "\"Of course.\" He runs a hand through his hair, still grinning, a little breathless about it. \"Universe's got a real sense of humor. For the record, I'm not letting that one go unfinished.\"",
    },
    {
      type: "dialogue",
      id: "c14r-n10",
      speaker: "narrator",
      text: "He walks you home anyway once the booth's finally, actually done, taking the long way without either of you saying so out loud, and says goodnight at your door a beat later than he probably needs to.",
      background: "shop-interior-evening",
    },
  ],
};
