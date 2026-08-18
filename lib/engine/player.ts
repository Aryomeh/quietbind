"use client";

import { useMemo, useState } from "react";
import type { Chapter, ChapterNode } from "@/lib/engine/types";

function isVisible(node: ChapterNode, flags: Set<string>): boolean {
  return node.type !== "dialogue" || !node.requiresFlag || flags.has(node.requiresFlag);
}

function nextVisibleId(
  nodes: ChapterNode[],
  fromId: string,
  flags: Set<string>
): string | null {
  const fromIndex = nodes.findIndex((n) => n.id === fromId);
  for (let i = fromIndex + 1; i < nodes.length; i++) {
    if (isVisible(nodes[i], flags)) return nodes[i].id;
  }
  return null;
}

function firstVisibleId(nodes: ChapterNode[], flags: Set<string>): string | null {
  return nodes.find((n) => isVisible(n, flags))?.id ?? null;
}

/**
 * Drives playback of a single Chapter: which node is showing, affection
 * totals, story flags, and advancing/choosing. Story-agnostic — works off
 * the lib/engine/types.ts schema, so any story's chapter data can be
 * dropped in.
 */
export function useChapterPlayer(
  chapter: Chapter,
  initialAffection: Record<string, number> = {},
  initialFlags: string[] = []
) {
  const [flags, setFlags] = useState<Set<string>>(() => new Set(initialFlags));
  const [affection, setAffection] = useState<Record<string, number>>(initialAffection);
  const [currentId, setCurrentId] = useState<string | null>(() =>
    firstVisibleId(chapter.nodes, new Set(initialFlags))
  );

  const currentNode = useMemo(
    () => (currentId ? chapter.nodes.find((n) => n.id === currentId) ?? null : null),
    [chapter.nodes, currentId]
  );

  const isComplete = currentNode === null;

  function advance() {
    if (!currentNode || currentNode.type === "choice") return;
    setCurrentId(nextVisibleId(chapter.nodes, currentNode.id, flags));
  }

  function choose(optionId: string) {
    if (!currentNode || currentNode.type !== "choice") return;
    const option = currentNode.options.find((o) => o.id === optionId);
    if (!option) return;

    let nextFlags = flags;
    if (option.setsFlag) {
      nextFlags = new Set(flags).add(option.setsFlag);
      setFlags(nextFlags);
    }

    if (option.affectionDelta) {
      setAffection((prev) => {
        const next = { ...prev };
        for (const [charId, delta] of Object.entries(option.affectionDelta!)) {
          next[charId] = (next[charId] ?? 0) + (delta ?? 0);
        }
        return next;
      });
    }

    const targetId =
      option.goto && chapter.nodes.some((n) => n.id === option.goto)
        ? option.goto
        : nextVisibleId(chapter.nodes, currentNode.id, nextFlags);

    setCurrentId(targetId);
  }

  return { currentNode, affection, flags, isComplete, advance, choose };
}
