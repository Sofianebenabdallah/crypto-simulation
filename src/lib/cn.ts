export type ClassValue = string | number | false | null | undefined;

/**
 * Join truthy class names into a single string.
 * A tiny, dependency-free alternative to `clsx` — enough for conditional
 * Tailwind / component classes across the app.
 *
 *   cn('btn', isActive && 'btn-primary', className)
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
