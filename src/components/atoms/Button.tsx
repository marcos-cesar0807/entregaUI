import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'md' | 'sm';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  selected?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  selected = false,
  startIcon,
  endIcon,
  disabled,
  className = '',
  children,
  ...props
}: Props) {
  return (
    <button
      className={`button button--${variant} button--${size} ${selected ? 'is-selected' : ''} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      type="button"
      {...props}
    >
      {loading ? <span className="button__spinner" aria-hidden="true" /> : startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  );
}
