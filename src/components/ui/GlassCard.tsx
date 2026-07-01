import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds the blue-tinted active border. */
  active?: boolean;
}

/** Frosted-glass surface (FAQ items, floating chips). */
export function GlassCard({ active = false, className, ...props }: GlassCardProps) {
  return <div className={cn('glass-card', active && 'glass-card-active', className)} {...props} />;
}
