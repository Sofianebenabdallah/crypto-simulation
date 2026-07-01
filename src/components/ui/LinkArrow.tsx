import { HTMLAttributes } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface LinkArrowProps extends HTMLAttributes<HTMLSpanElement> {
  iconSize?: number;
}

/**
 * Text link with an underline and a trailing arrow that slides on hover.
 *
 *   <LinkArrow>Découvrir les simulateurs</LinkArrow>
 */
export function LinkArrow({ children, className, iconSize = 16, ...props }: LinkArrowProps) {
  return (
    <span className={cn('link-arrow', className)} {...props}>
      {children}
      <ArrowRight size={iconSize} />
    </span>
  );
}
