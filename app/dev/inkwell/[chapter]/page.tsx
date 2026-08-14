import { notFound } from "next/navigation";
import { ChapterPlayer } from "@/components/engine/ChapterPlayer";
import { inkwellAndIvyChapters } from "@/lib/stories/inkwell-and-ivy/chapters";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";

/**
 * Internal-only route to play any written Inkwell & Ivy chapter end-to-end
 * against the real engine, e.g. /dev/inkwell/1, /dev/inkwell/2. Not linked
 * from the story picker (that's step 5).
 */
export default async function InkwellChapterPreviewPage({
  params,
}: {
  params: Promise<{ chapter: string }>;
}) {
  const { chapter: chapterParam } = await params;
  const chapterNumber = Number(chapterParam);
  const chapter = inkwellAndIvyChapters[chapterNumber];

  if (!chapter) notFound();

  return (
    <ChapterPlayer chapter={chapter} characters={inkwellAndIvyManifest.characters} />
  );
}
