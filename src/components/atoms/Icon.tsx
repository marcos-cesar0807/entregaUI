type IconName = 'search' | 'teacher' | 'clock' | 'mortarboard' | 'chevron-up' | 'check';

const files: Record<IconName, string> = {
  search: 'icon-search.svg',
  teacher: 'icon-teacher.svg',
  clock: 'icon-clock.svg',
  mortarboard: 'icon-mortarboard.svg',
  'chevron-up': 'icon-chevron-up.svg',
  check: 'icon-check.svg',
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <img aria-hidden="true" className="icon" src={`./assets/${files[name]}`} width={size} height={size} alt="" />;
}
