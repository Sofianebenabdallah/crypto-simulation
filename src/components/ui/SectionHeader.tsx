import { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { PillBadge } from './PillBadge';

export interface SectionHeaderProps {
  badge: string;
  title: ReactNode;
  className?: string;
}

/** Centered section header: a PillBadge above a large heading. */
export function SectionHeader({ badge, title, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 text-center', className)}>
      <PillBadge>{badge}</PillBadge>
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-[42px] leading-tight text-white max-w-3xl">
        {title}
      </h2>
    </div>
  );
}
