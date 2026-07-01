import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

/**
 * Gradient-border capsule used as a section label above titles.
 *
 *   <PillBadge>Nos simulateurs</PillBadge>
 */
export function PillBadge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('pill-badge', className)} {...props} />;
}
