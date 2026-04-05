"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";
import type {
  BulletCardContent,
  EditorCard,
  HeroCardContent,
  ImageCardContent,
  TextCardContent,
  TwoColumnCardContent,
} from "@/types/cards";

interface CardBlockProps {
  card: EditorCard;
  isSelected: boolean;
}

/**
 * Dynamic editor card that renders and edits card content by type.
 */
export function CardBlock({ card, isSelected }: CardBlockProps) {
  const setSelectedCard = useEditorStore((state) => state.setSelectedCard);
  const updateCard = useEditorStore((state) => state.updateCard);
  const deleteCard = useEditorStore((state) => state.deleteCard);

  /**
   * Update only one key inside a card content object.
   */
  function patchContent(key: string, value: string): void {
    updateCard(card.id, { ...card.content, [key]: value });
  }

  /**
   * Update one bullet line in bullet card content.
   */
  function patchBullet(index: number, value: string): void {
    const content = card.content as BulletCardContent;
    const items = [...content.items];
    items[index] = value;
    updateCard(card.id, { ...content, items });
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -3, scale: 1.004 }}
      transition={{ type: "spring", stiffness: 290, damping: 24 }}
      onClick={() => setSelectedCard(card.id)}
    >
      <Card
        className={cn(
          "group cursor-pointer border-transparent transition",
          isSelected && "border-sky-400/60 ring-2 ring-sky-200/80 dark:ring-sky-900/40",
        )}
      >
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
              <GripVertical className="h-3.5 w-3.5" />
              {card.type}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="opacity-0 transition group-hover:opacity-100"
              onClick={(event) => {
                event.stopPropagation();
                deleteCard(card.id);
              }}
              aria-label="Delete card"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {card.type === "text" && (
            <div className="space-y-3">
              <Input
                value={(card.content as TextCardContent).title}
                onChange={(event) => patchContent("title", event.target.value)}
                className="text-base font-semibold"
              />
              <Textarea
                value={(card.content as TextCardContent).body}
                onChange={(event) => patchContent("body", event.target.value)}
                className="min-h-28"
              />
            </div>
          )}

          {card.type === "image" && (
            <div className="space-y-3">
              <Input
                value={(card.content as ImageCardContent).title}
                onChange={(event) => patchContent("title", event.target.value)}
                className="text-base font-semibold"
              />
              <Input
                value={(card.content as ImageCardContent).imageUrl}
                onChange={(event) => patchContent("imageUrl", event.target.value)}
                placeholder="https://..."
              />
              <img
                src={(card.content as ImageCardContent).imageUrl}
                alt={(card.content as ImageCardContent).title}
                className="h-56 w-full rounded-xl object-cover"
              />
              <Input
                value={(card.content as ImageCardContent).caption}
                onChange={(event) => patchContent("caption", event.target.value)}
              />
            </div>
          )}

          {card.type === "bullet" && (
            <div className="space-y-3">
              <Input
                value={(card.content as BulletCardContent).title}
                onChange={(event) => patchContent("title", event.target.value)}
                className="text-base font-semibold"
              />
              <div className="space-y-2">
                {(card.content as BulletCardContent).items.map((item, index) => (
                  <Input key={`${card.id}-${index}`} value={item} onChange={(event) => patchBullet(index, event.target.value)} />
                ))}
              </div>
            </div>
          )}

          {card.type === "twoColumn" && (
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Input
                  value={(card.content as TwoColumnCardContent).leftTitle}
                  onChange={(event) => patchContent("leftTitle", event.target.value)}
                  className="font-semibold"
                />
                <Textarea
                  value={(card.content as TwoColumnCardContent).leftBody}
                  onChange={(event) => patchContent("leftBody", event.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Input
                  value={(card.content as TwoColumnCardContent).rightTitle}
                  onChange={(event) => patchContent("rightTitle", event.target.value)}
                  className="font-semibold"
                />
                <Textarea
                  value={(card.content as TwoColumnCardContent).rightBody}
                  onChange={(event) => patchContent("rightBody", event.target.value)}
                />
              </div>
            </div>
          )}

          {card.type === "hero" && (
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white">
              <div className="space-y-3">
                <Input
                  value={(card.content as HeroCardContent).headline}
                  onChange={(event) => patchContent("headline", event.target.value)}
                  className="border-white/20 bg-white/10 text-xl font-semibold text-white placeholder:text-white/60"
                />
                <Input
                  value={(card.content as HeroCardContent).subheading}
                  onChange={(event) => patchContent("subheading", event.target.value)}
                  className="border-white/20 bg-white/10 text-white placeholder:text-white/60"
                />
                <Input
                  value={(card.content as HeroCardContent).cta}
                  onChange={(event) => patchContent("cta", event.target.value)}
                  className="w-fit border-white/20 bg-white/15 px-5 text-white placeholder:text-white/60"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
