import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean };

export function Chip({ selected = false, className = '', children, ...props }: Props) {
  return (
    <button type="button" className={`chip ${selected ? 'chip--selected' : ''} ${className}`} aria-pressed={selected} {...props}>
      {children}
    </button>
  );
}
