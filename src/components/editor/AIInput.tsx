"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditorStore } from "@/store/editor-store";

/**
 * Floating AI prompt input that generates structured cards.
 */
export function AIInput() {
  const [prompt, setPrompt] = useState("");
  const generateFromPrompt = useEditorStore((state) => state.generateFromPrompt);
  const isGenerating = useEditorStore((state) => state.isGenerating);

  /**
   * Trigger mocked AI generation when a prompt is submitted.
   */
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!prompt.trim() || isGenerating) {
      return;
    }

    await generateFromPrompt(prompt);
    setPrompt("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="pointer-events-auto mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-slate-200/70 bg-white/90 p-2 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/85"
    >
      <Input
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Generate content..."
        className="border-transparent bg-transparent focus-visible:ring-0"
      />
      <Button type="submit" disabled={isGenerating || !prompt.trim()}>
        <Sparkles className="mr-2 h-4 w-4" />
        {isGenerating ? "Generating..." : "Generate"}
      </Button>
    </form>
  );
}
