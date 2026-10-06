import { useEffect, useRef, type InputHTMLAttributes } from 'react';
import { Icon } from './Icon';

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  indeterminate?: boolean;
};

export function Checkbox({ indeterminate = false, className = '', ...props }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <span className={`checkbox ${className}`}>
      <input ref={ref} type="checkbox" {...props} />
      <span className="checkbox__box" aria-hidden="true">
        {indeterminate ? <span className="checkbox__minus" /> : props.checked ? <Icon name="check" size={14} /> : null}
      </span>
    </span>
  );
}
