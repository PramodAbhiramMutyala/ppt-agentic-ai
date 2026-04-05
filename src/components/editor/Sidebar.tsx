"use client";

import { FileText, LayoutDashboard, Layers, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Documents", icon: FileText },
  { label: "Presentations", icon: Layers },
  { label: "Templates", icon: Sparkles },
];

/**
 * Collapsible left navigation sidebar for primary app sections.
 */
export function Sidebar() {
  const sidebarCollapsed = useEditorStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useEditorStore((state) => state.toggleSidebar);

  return (
    <aside
      className={cn(
        "relative border-r border-slate-200/70 bg-white/85 p-3 backdrop-blur-lg transition-all duration-300 dark:border-slate-800 dark:bg-slate-950/80",
        sidebarCollapsed ? "w-20" : "w-64",
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        className="mb-5"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </Button>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <item.icon className="h-4 w-4" />
            {!sidebarCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}
