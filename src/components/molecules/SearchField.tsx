import type { InputHTMLAttributes } from 'react';
import { Icon } from '../atoms/Icon';
import { Input } from '../atoms/Input';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
  error?: string;
};

export function SearchField({ label = 'Buscar disciplina', error, id = 'discipline-search', ...props }: Props) {
  return (
    <div className="search-field-wrap">
      <label className="sr-only" htmlFor={id}>{label}</label>
      <Input id={id} type="search" invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} startIcon={<Icon name="search" size={20} />} {...props} />
      {error && <p className="field-error" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
