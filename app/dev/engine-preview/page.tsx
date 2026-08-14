import { ChapterPlayer } from "@/components/engine/ChapterPlayer";
import { dummyChapter } from "@/lib/engine/__fixtures__/dummyChapter";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";

/**
 * Internal-only route to sanity-check the VN engine against a dummy
 * chapter while real chapter content doesn't exist yet. Not linked from
 * the story picker.
 */
export default function EnginePreviewPage() {
  return (
    <ChapterPlayer chapter={dummyChapter} characters={inkwellAndIvyManifest.characters} />
  );
}
