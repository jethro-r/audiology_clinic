import * as LucideIcons from "lucide-react";
import { Ear, type LucideIcon } from "lucide-react";

/**
 * Resolve a Lucide icon name (as stored in the CMS) to a component.
 * Falls back to Ear for unknown names, matching the site's existing
 * ServiceCard behaviour.
 */
export function getLandingIcon(name: string): LucideIcon {
  const icon = (LucideIcons as unknown as Record<string, LucideIcon | undefined>)[name];
  return icon ?? Ear;
}
