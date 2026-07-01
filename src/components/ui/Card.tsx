import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Highlighted / focused panel (gradient background + blue border). */
  active?: boolean;
}

/** Base surface card. Pass `active` for the highlighted variant. */
export function Card({ active = false, className, ...props }: CardProps) {
  return <div className={cn(active ? 'card-active' : 'card', className)} {...props} />;
}
