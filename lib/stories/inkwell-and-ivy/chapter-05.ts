import type { Chapter } from "@/lib/engine/types";

/**
 * Chapter 5 — "Festival Announcement"
 * Source beat: docs/inkwell-and-ivy-STORY-OUTLINE.md, Act 1.
 * The Hallow's End Autumn Festival is announced — the shop's booth
 * performance could sway public opinion against Thorne's plans. Ends on
 * a community-rallying beat.
 */
export const chapter05: Chapter = {
  storySlug: "inkwell-and-ivy",
  chapterNumber: 5,
  title: "Festival Announcement",
  act: 1,
  route: "shared",
  freeTier: false,
  nodes: [
    {
      type: "dialogue",
      id: "c5-n1",
      speaker: "narrator",
      text: "Ren gets to the shop before Kai for once, which is how you know something's happened before he even says a word.",
      background: "shop-interior-morning",
    },
    {
      type: "dialogue",
      id: "c5-n2",
      speaker: "ren",
      emotion: "happy",
      text: "\"Autumn Festival's back on. Town board just posted it.\" He drops a flyer on the counter, still slightly damp from the tape. \"Same weekend as always. Booths, the whole square, half the town showing up whether they mean to or not.\"",
    },
    {
      type: "dialogue",
      id: "c5-n3",
      speaker: "narrator",
      text: "The bell rings again a few minutes later. Kai reads the flyer over your shoulder before he's even taken his coat off, quiet in the way he gets when he's already three steps ahead of the conversation.",
    },
    {
      type: "dialogue",
      id: "c5-n4",
      speaker: "kai",
      emotion: "serious",
      text: "\"Every shop on the block gets a booth if they want one. Half the town, plus whoever Thorne Holdings sends to smile at people.\" A pause. \"This is the first real chance you'll have to be more than a name on a lease dispute to people.\"",
    },
    {
      type: "dialogue",
      id: "c5-n5",
      speaker: "ren",
      text: "\"It's more than that for me.\" Something flattens in his voice, just for a second. \"Last time Thorne's people showed up smiling at a festival, my family didn't have a storefront by spring. I'd like this one to go differently.\"",
    },
    {
      type: "choice",
      id: "c5-c1",
      prompt: "How do you want to approach the booth?",
      options: [
        {
          id: "strategic",
          text: "\"Let's be smart about it: make the booth about what this shop actually does well, and let that speak for itself.\"",
          affectionDelta: { kai: 2 },
          setsFlag: "ch5LeanedKai",
        },
        {
          id: "bold",
          text: "\"Then let's not be quiet about it this time. Big booth, no apologizing for taking up space.\"",
          affectionDelta: { ren: 2 },
          setsFlag: "ch5LeanedRen",
        },
      ],
    },
    {
      type: "dialogue",
      id: "c5-n6a",
      speaker: "kai",
      emotion: "happy",
      text: "Kai nods slowly, like you've confirmed something he'd already decided about you. \"Good. Loud doesn't win these things. Consistent does.\"",
      requiresFlag: "ch5LeanedKai",
    },
    {
      type: "dialogue",
      id: "c5-n6b",
      speaker: "ren",
      emotion: "happy",
      text: "Ren grins, some of the flatness gone from his voice already. \"Now that's the Lila answer. She never once let anyone tell her to take up less room.\"",
      requiresFlag: "ch5LeanedRen",
    },
    {
      type: "dialogue",
      id: "c5-n7",
      speaker: "narrator",
      text: "Word moves faster through Hallow's End than either of them expected. By afternoon, Priya's dropped off a standing offer of flowers for the booth table, \"whatever's left over, no charge, don't argue with me.\"",
    },
    {
      type: "dialogue",
      id: "c5-n8",
      speaker: "narrator",
      text: "Two of the regulars you don't even know by name yet offer to help carry tables the morning of. Someone leaves a folded twenty in the tip jar with no note, just a small drawing of the shop's awning.",
    },
    {
      type: "dialogue",
      id: "c5-n9",
      speaker: "narrator",
      text: "None of it fixes the lease. None of it makes Thorne Holdings go away. But for the first time since the certified letter arrived, it doesn't feel like something you're facing alone with two men who happened to show up.",
    },
  ],
};
