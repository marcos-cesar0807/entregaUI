import type { ReactNode } from 'react';
import type { BadgeStatus } from '../atoms/Badge';

export function SystemMessage({ status, title, children, action }: { status: BadgeStatus; title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <div className={`system-message system-message--${status}`} role={status === 'error' ? 'alert' : 'status'}>
      <strong>{title}</strong>
      <p>{children}</p>
      {action}
    </div>
  );
}
