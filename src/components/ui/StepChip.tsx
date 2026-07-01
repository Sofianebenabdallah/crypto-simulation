import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

/** Round numbered chip used to index steps (1 / 2 / 3). */
export function StepChip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('step-chip', className)} {...props} />;
}
