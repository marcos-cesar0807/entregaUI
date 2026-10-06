export type BadgeStatus = 'success' | 'warning' | 'error' | 'brand' | 'info';

export function Badge({ status, children }: { status: BadgeStatus; children: React.ReactNode }) {
  return <span className={`badge badge--${status}`}>{children}</span>;
}
