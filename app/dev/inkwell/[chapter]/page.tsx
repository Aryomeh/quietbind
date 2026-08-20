import { notFound } from "next/navigation";
import { ChapterPlayer } from "@/components/engine/ChapterPlayer";
import { getInkwellAndIvyChapter } from "@/lib/stories/inkwell-and-ivy/chapters";
import { inkwellAndIvyManifest } from "@/lib/stories/inkwell-and-ivy/manifest";

/**
 * Internal-only route to play any written Inkwell & Ivy chapter end-to-end
 * against the real engine, e.g. /dev/inkwell/1, /dev/inkwell/2. Not linked
 * from the story picker (that's step 5).
 *
 * For chapters past the route lock (12+), pass ?route=kai or ?route=ren,
 * e.g. /dev/inkwell/12?route=ren — otherwise there's no saved progress to
 * resolve which route's content to show, since this route skips the normal
 * play flow (unlock checks, Supabase progress) entirely.
 */
export default async function InkwellChapterPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ chapter: string }>;
  searchParams: Promise<{ route?: string }>;
}) {
  const { chapter: chapterParam } = await params;
  const { route } = await searchParams;
  const chapterNumber = Number(chapterParam);
  const chapter = getInkwellAndIvyChapter(chapterNumber, route);

  if (!chapter) notFound();

  return (
    <ChapterPlayer chapter={chapter} characters={inkwellAndIvyManifest.characters} />
  );
}
