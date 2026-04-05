"use client";

import { Reorder } from "framer-motion";

import { CardBlock } from "@/components/editor/CardBlock";
import { Card } from "@/components/ui/card";
import { useEditorStore } from "@/store/editor-store";

/**
 * Main center editor area with drag-sort cards and loading skeletons.
 */
export function CardEditor() {
  const cards = useEditorStore((state) => state.cards);
  const selectedCardId = useEditorStore((state) => state.selectedCardId);
  const setSelectedCard = useEditorStore((state) => state.setSelectedCard);
  const reorderCards = useEditorStore((state) => state.reorderCards);
  const isGenerating = useEditorStore((state) => state.isGenerating);

  if (isGenerating) {
    return (
      <div className="space-y-4 p-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="h-44 animate-pulse bg-slate-100 dark:bg-slate-800" />
        ))}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto" onClick={() => setSelectedCard(null)}>
      <Reorder.Group axis="y" values={cards} onReorder={reorderCards} className="space-y-4 p-6">
        {cards.map((card) => (
          <Reorder.Item key={card.id} value={card} className="list-none">
            <CardBlock card={card} isSelected={selectedCardId === card.id} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
