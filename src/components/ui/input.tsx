import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Text input styled to match the editor visual language.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = "Input";

export { Input };
