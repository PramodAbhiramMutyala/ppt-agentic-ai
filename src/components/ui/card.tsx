import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Base card container primitive.
 */
export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/80 bg-white/90 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Card content wrapper primitive.
 */
export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}
