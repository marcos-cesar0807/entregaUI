import type { InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  invalid?: boolean;
};

export function Input({ startIcon, endIcon, invalid = false, className = '', ...props }: Props) {
  return (
    <div className={`search-field ${invalid ? 'search-field--error' : ''} ${className}`}>
      {startIcon}
      <input {...props} aria-invalid={invalid || undefined} />
      {endIcon}
    </div>
  );
}
