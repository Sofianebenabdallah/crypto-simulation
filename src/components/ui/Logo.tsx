import { ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

const LOGO_URL = 'https://krisspy.blob.core.windows.net/public/images/1782935060660-5tjigzf9u0d.svg';

export type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & { alt?: string };

/** S'investir brand mark. Control the size with a height class (e.g. `h-8`). */
export function Logo({ className, alt = 'S’investir', ...props }: LogoProps) {
  return <img src={LOGO_URL} alt={alt} className={cn('w-auto', className)} {...props} />;
}
