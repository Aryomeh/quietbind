import { ChapterPlayer } from "@/components/engine/ChapterPlayer";
import { chapter01 } from "@/lib/stories/inkwell-and-ivy/chapter-01";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";

/**
 * Internal-only route to play Inkwell & Ivy Chapter 1 end-to-end against
 * the real engine. Not linked from the story picker (that's step 5).
 */
export default function InkwellChapter1Page() {
  return (
    <ChapterPlayer chapter={chapter01} characters={inkwellAndIvyManifest.characters} />
  );
}
