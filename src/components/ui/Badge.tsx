import { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'info' | 'success' | 'warning' | 'danger';

const TONE: Record<BadgeTone, string> = {
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  danger: 'badge-danger',
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

/** Small status pill (info / success / warning / danger). */
export function Badge({ tone = 'info', className, ...props }: BadgeProps) {
  return <span className={cn('badge', TONE[tone], className)} {...props} />;
}

/** Frosted "coming soon" tag used on unavailable cards. */
export function SoonBadge({
  className,
  children = 'Bientôt disponible',
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('badge-soon', className)} {...props}>
      {children}
    </span>
  );
}
