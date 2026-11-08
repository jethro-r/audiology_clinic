"use client";

import { useState } from "react";
import * as LucideIcons from "lucide-react";

export const POPULAR_ICONS = [
  "Ear", "Headphones", "Volume2", "VolumeX", "Volume1", "Bell",
  "Mic", "Radio", "Speaker", "Phone", "Stethoscope", "Activity",
  "Heart", "Shield", "ShieldCheck", "Settings", "Star", "Award", "CheckCircle",
  "Users", "UserCheck", "User", "Clock", "Calendar", "MapPin", "AlertCircle",
  "Info", "HelpCircle", "Lightbulb", "Zap", "TrendingUp", "Target",
  "Sunrise", "Moon", "Baby", "Home", "Briefcase", "GraduationCap",
  "Wrench", "MessageSquare", "ArrowRight",
];

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  /** Compact mode omits the label row (for use inside repeatable item rows) */
  compact?: boolean;
}

const inputCls =
  "w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary text-foreground text-sm";

/**
 * Lucide icon picker with search — shared by the service form (main icon)
 * and the service page editor (section/card icons).
 *
 * Outside-click closing is fully declarative: while open, an invisible
 * fixed layer sits behind the dropdown (z-40 vs the panel's z-50), so any
 * click outside lands on it and closes the picker via its onClick. No
 * document-level listeners.
 */
export default function IconPicker({ value, onChange, compact }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  function close() {
    setOpen(false);
    setSearch("");
  }

  const filtered = search
    ? POPULAR_ICONS.filter((icon) => icon.toLowerCase().includes(search.toLowerCase()))
    : POPULAR_ICONS;

  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[value];

  return (
    <div className="relative">
      {!compact && <label className="block text-xs font-medium text-muted uppercase tracking-wide mb-1">Icon</label>}
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        className={`${inputCls} flex items-center justify-between hover:bg-background/80`}
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          {IconComponent && <IconComponent className="w-4 h-4" />}
          <span>{value || "Select"}</span>
        </div>
        <svg className="w-3.5 h-3.5 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <>
          {/* Click-catcher: everything outside the dropdown, below it in z-order */}
          <div className="fixed inset-0 z-40" onClick={close} aria-hidden="true" />
          <div className="absolute z-50 left-0 mt-1 w-64 bg-card border border-border rounded-lg shadow-lg max-h-80 overflow-hidden">
            <div className="p-2 border-b border-border">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full px-2.5 py-1.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/40 text-sm"
              />
            </div>
            <div className="grid grid-cols-4 gap-1.5 p-2 max-h-60 overflow-y-auto">
              {filtered.map((iconName) => {
                const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
                if (!Icon) return null;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => {
                      onChange(iconName);
                      close();
                    }}
                    className={`flex flex-col items-center gap-1 p-1.5 rounded-lg hover:bg-background transition-colors ${
                      value === iconName ? "bg-secondary/10 ring-2 ring-secondary" : ""
                    }`}
                    title={iconName}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[9px] text-muted truncate w-full text-center">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
