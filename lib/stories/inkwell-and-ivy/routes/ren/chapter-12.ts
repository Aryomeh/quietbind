import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 12 — "Recipe for Trouble" (REN ROUTE)
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 3B.
 *
 * First route-specific chapter. Ren teaches the player his family's old
 * recipe, the one tied to the storefront his family lost. High
 * vulnerability for him. Kai still appears this chapter but the scene
 * belongs to Ren.
 */
export const chapter12Ren: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 12,
  title: "Recipe for Trouble",
  act: 3,
  route: "ren",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c12r-n1",
      speaker: "narrator",
      text: "Kai takes it the way you thought he might: no scene, no argument, just a long look and a quiet \"okay\" before he checks out three books he doesn't need and leaves earlier than usual. Something closes gently. Something else opens louder than you expect.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c12r-n2",
      speaker: "narrator",
      text: "Ren shows up an hour later carrying a paper sack instead of his usual delivery box, and there's a nervousness in him you haven't seen before, not even the day Thorne's letter arrived.",
    },
    {
      type: "dialogue",
      id: "c12r-n3",
      speaker: "ren",
      emotion: "neutral",
      text: "\"Kitchen's closed for the morning. I told the staff to take it. I want to show you something and I don't want an audience while I do it.\" He sets the sack down like it might bruise. \"Family recipe. The one from the old storefront.\"",
    },
    {
      type: "dialogue",
      id: "c12r-n4",
      speaker: "narrator",
      text: "You know enough by now to understand what that costs him. He's talked about the bakery Thorne's company took from his grandmother easily enough, in the way people talk about old scars. He's never once offered to open one back up in front of you.",
    },
    {
      type: "dialogue",
      id: "c12r-n5",
      speaker: "ren",
      emotion: "serious",
      text: "\"Nobody outside the family's made this in eleven years. I could probably do it in my sleep and I still haven't, not once, since we lost the place.\" He starts pulling flour and butter from the sack, hands already moving out of old habit. \"Figured it was time it existed somewhere again.\"",
    },
    {
      type: "dialogue",
      id: "c12r-n6",
      speaker: "ren",
      text: "\"My grandmother used to fold the dough while she talked, like it kept her hands busy enough that she'd actually say what she meant. I never understood that until just now, trying to explain this to you.\"",
    },
    {
      type: "choice",
      id: "c12r-c1",
      prompt: "This clearly isn't just about the recipe. How do you meet him here?",
      options: [
        {
          id: "workAlongside",
          text: "Roll up your sleeves and ask him to actually teach you, step by step.",
          affectionDelta: { ren: 4 },
          setsFlag: "ch12RenWorkedAlongside",
        },
        {
          id: "letHimLead",
          text: "Stay close and let him talk while he works, without pushing to join in.",
          affectionDelta: { ren: 2 },
          setsFlag: "ch12RenLetHimLead",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c12r-n7a",
      speaker: "ren",
      emotion: "happy",
      text: "He laughs, some of the tension finally leaving his shoulders, and hands you a measuring cup like a challenge. \"Fine, but you fold gently, not like you're mad at it.\" For a while the two of you get it wrong together, flour on the counter, on your hands, once on his cheek, and somewhere in the mess the nervousness in him quietly disappears.",
      requiresFlag: "ch12RenWorkedAlongside",
    },
    {
      type: "dialogue",
      id: "c12r-n7b",
      speaker: "ren",
      emotion: "neutral",
      text: "He glances over like he's checking you're still there, and something in his shoulders eases when he finds you watching instead of looking away. \"You don't have to say anything,\" he says, working the dough with steadier hands now. \"Just, thanks for letting this be a little bigger than pastry.\"",
      requiresFlag: "ch12RenLetHimLead",
    },
    {
      type: "dialogue",
      id: "c12r-n8",
      speaker: "narrator",
      text: "By the time the first batch comes out of the shop's small oven, uneven and a little too golden on one side, the shop smells like something it never has before. Ren cuts a piece for you before he even tastes it himself, watching your face too closely for someone who claims not to care what you think.",
    },
    {
      type: "dialogue",
      id: "c12r-n9",
      speaker: "narrator",
      text: "It's good. Not perfect, he tells you later, not the way his grandmother made it, but close enough that for a second his eyes go somewhere you can't follow him to.",
    },
    {
      type: "dialogue",
      id: "c12r-n10",
      speaker: "narrator",
      text: "That evening, closing alone, you find a small handwritten card tucked next to the register, the recipe copied out in his handwriting, and at the bottom, an addition that clearly wasn't part of the original: a note asking whether you'd want to make it again sometime, just the two of you.",
      background: "shop-interior-evening",
    },
  ],
};
