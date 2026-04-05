"use client";

import { Moon, Plus, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/store/editor-store";
import type { CardType } from "@/types/cards";

const addCardOptions: Array<{ label: string; type: CardType }> = [
  { label: "Text", type: "text" },
  { label: "Image", type: "image" },
  { label: "Bullet", type: "bullet" },
  { label: "Two Column", type: "twoColumn" },
  { label: "Hero", type: "hero" },
];

/**
 * Top toolbar with quick-add actions and dark mode toggle.
 */
export function Toolbar() {
  const addCard = useEditorStore((state) => state.addCard);
  const { theme, setTheme } = useTheme();

  /**
   * Switch between light and dark color modes.
   */
  function toggleTheme(): void {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-6 py-3 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Content Workspace</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">Build structured cards with AI assistance.</p>
      </div>
      <div className="flex items-center gap-2">
        {addCardOptions.map((option) => (
          <Button key={option.type} size="sm" variant="secondary" onClick={() => addCard(option.type)}>
            <Plus className="mr-1 h-3 w-3" />
            {option.label}
          </Button>
        ))}
        <Button size="icon" variant="outline" onClick={toggleTheme} aria-label="Toggle color mode">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
}
