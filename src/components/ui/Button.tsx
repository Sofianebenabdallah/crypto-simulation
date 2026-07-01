import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'outline';
export type ButtonSize = 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
};

const SIZE: Record<ButtonSize, string> = {
  md: '',
  lg: 'btn-lg',
};

/**
 * Pill-shaped CTA button. Styling comes from the `.btn*` classes in theme.css
 * so it always follows the active theme.
 *
 *   <Button>Créer un compte</Button>
 *   <Button variant="outline" size="lg">Se connecter</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn('btn', VARIANT[variant], SIZE[size], className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';
