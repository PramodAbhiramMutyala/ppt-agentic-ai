"use client";

import { WandSparkles } from "lucide-react";

import { AIInput } from "@/components/editor/AIInput";
import { CardEditor } from "@/components/editor/CardEditor";
import { Sidebar } from "@/components/editor/Sidebar";
import { Toolbar } from "@/components/editor/Toolbar";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor-store";

/**
 * Full editor layout with left nav, center canvas, and right controls panel.
 */
export function Layout() {
  const selectedCardId = useEditorStore((state) => state.selectedCardId);
  const cards = useEditorStore((state) => state.cards);
  const addCard = useEditorStore((state) => state.addCard);

  const selectedCard = cards.find((card) => card.id === selectedCardId) ?? null;

  return (
    <div className="relative flex h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#f8fafc,transparent_35%),radial-gradient(circle_at_bottom_right,#e2e8f0,transparent_40%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top_left,#0f172a,transparent_30%),radial-gradient(circle_at_bottom_right,#111827,transparent_40%)] dark:text-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Toolbar />
        <main className="min-h-0 flex-1 pb-28">
          <CardEditor />
        </main>
      </div>
      <aside className="hidden w-80 border-l border-slate-200/70 bg-white/80 p-4 backdrop-blur-lg lg:block dark:border-slate-800 dark:bg-slate-950/80">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Context Panel</h2>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Style, layout, and AI actions for the active card.</p>

        {selectedCard ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-slate-400">Selected Type</p>
              <p className="mt-1 text-base font-semibold capitalize">{selectedCard.type}</p>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <p className="text-sm font-medium">Quick Actions</p>
              <Button className="w-full" variant="secondary" onClick={() => addCard("text")}>
                Duplicate as Text Card
              </Button>
              <Button className="w-full" variant="outline" onClick={() => addCard("bullet")}>
                Create Summary Card
              </Button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Select a card to access style and layout controls.
          </div>
        )}

        <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/60 dark:bg-sky-950/40">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300">
            <WandSparkles className="h-4 w-4" />
            AI Actions
          </div>
          <p className="text-xs text-sky-700/80 dark:text-sky-300/80">Use the floating prompt to regenerate structured cards with loading feedback.</p>
        </div>
      </aside>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 px-4">
        <AIInput />
      </div>
    </div>
  );
}
