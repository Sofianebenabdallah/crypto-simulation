import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

/** Glowing bordered tile that frames a large stat / digit. */
export function StatTile({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('stat-tile', className)} {...props} />;
}
