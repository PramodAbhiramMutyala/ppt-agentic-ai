"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { Download, Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Role = "user" | "assistant";

interface ChatMessage {
  id: string;
  role: Role;
  content: string;
}

/**
 * Build a compact random id for rendering chat items.
 */
function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

/**
 * Parse a filename from content-disposition response header.
 */
function parseFileName(disposition: string | null): string {
  if (!disposition) {
    return "presentation.pptx";
  }

  const match = disposition.match(/filename="?([^";]+)"?/i);
  return match?.[1] ?? "presentation.pptx";
}

/**
 * Trigger browser download for a binary blob with a target filename.
 */
function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/**
 * ChatGPT-style chat UI that triggers PPT generation and auto-download.
 */
export function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: "assistant",
      content: "Hi, share a topic and I will generate a presentation and download it automatically.",
    },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isSubmitting, [input, isSubmitting]);

  /**
   * Append a new chat message while preserving older conversation items.
   */
  function appendMessage(role: Role, content: string): void {
    setMessages((prev) => [...prev, { id: createId(), role, content }]);
    queueMicrotask(() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" }));
  }

  /**
   * Send prompt to chat endpoint, then generate and download the PPT file.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    const prompt = input.trim();
    if (!prompt || isSubmitting) {
      return;
    }

    setInput("");
    setIsSubmitting(true);
    appendMessage("user", prompt);

    try {
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!chatResponse.ok) {
        throw new Error("Failed to generate assistant response.");
      }

      const chatPayload = (await chatResponse.json()) as { reply: string; outline: string[] };
      appendMessage("assistant", chatPayload.reply);

      const pptResponse = await fetch("/api/ppt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt, outline: chatPayload.outline }),
      });

      if (!pptResponse.ok) {
        throw new Error("Failed to generate presentation file.");
      }

      const blob = await pptResponse.blob();
      const fileName = parseFileName(pptResponse.headers.get("content-disposition"));
      downloadBlob(blob, fileName);
      appendMessage("assistant", "Your PPT is ready and has been downloaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error while generating PPT.";
      appendMessage("assistant", message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen flex-col bg-[radial-gradient(circle_at_top,#f8fafc_0%,#eef2ff_50%,#f1f5f9_100%)] dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_60%,#020617_100%)]">
      <header className="border-b border-slate-200/70 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
          <h1 className="text-base font-semibold text-slate-900 dark:text-slate-100">PPT Chat Assistant</h1>
          <span className="text-xs text-slate-500 dark:text-slate-400">Auto-download when generation completes</span>
        </div>
      </header>

      <div ref={listRef} className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div
                className={
                  message.role === "user"
                    ? "max-w-[85%] rounded-2xl rounded-br-md bg-slate-900 px-4 py-3 text-sm text-white shadow"
                    : "max-w-[85%] rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                }
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="border-t border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-4xl items-center gap-2">
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask for a presentation, e.g. Create a 5-slide deck on AI agents"
            className="h-11 rounded-2xl"
          />
          <Button type="submit" disabled={!canSend} className="h-11 rounded-2xl px-4">
            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
          <Button type="button" variant="secondary" className="h-11 rounded-2xl px-4" disabled>
            <Download className="mr-1 h-4 w-4" />
            Auto
          </Button>
        </form>
      </footer>
    </div>
  );
}
