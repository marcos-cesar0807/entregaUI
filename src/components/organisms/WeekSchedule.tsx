import type { Weekday } from '../../flows/discipline-data';

const DAYS: Weekday[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
const START_HOUR = 8;
const END_HOUR = 22;
const HOURS = Array.from({ length: (END_HOUR - START_HOUR) / 2 }, (_, i) => START_HOUR + i * 2);

export type ScheduleBlock = {
  label: string;
  days: Weekday[];
  start: number;
  end: number;
  variant: 'enrolled' | 'draft' | 'candidate' | 'conflict';
};

function rowFor(hour: number) {
  return 2 + (hour - START_HOUR) / 2;
}

export function WeekSchedule({ blocks }: { blocks: ScheduleBlock[] }) {
  return (
    <div
      className="week-schedule"
      role="img"
      aria-label={`Agenda semanal. ${blocks.map(b => `${b.label}: ${b.days.join('/')} ${b.start}h às ${b.end}h${b.variant === 'conflict' ? ', em conflito' : ''}`).join('. ')}.`}
    >
      <span className="week-schedule__corner" aria-hidden="true" />
      {DAYS.map((day, i) => (
        <span key={day} className="week-schedule__day" style={{ gridColumn: i + 2 }}>{day}</span>
      ))}
      {HOURS.map((hour, i) => (
        <span key={hour} className="week-schedule__hour" style={{ gridRow: i + 2 }}>{hour}h</span>
      ))}
      {HOURS.map((hour, row) =>
        DAYS.map((day, col) => (
          <span
            key={`cell-${hour}-${day}`}
            aria-hidden="true"
            className={`week-schedule__cell${col === DAYS.length - 1 ? ' week-schedule__cell--last-col' : ''}${row === HOURS.length - 1 ? ' week-schedule__cell--last-row' : ''}`}
            style={{ gridColumn: col + 2, gridRow: row + 2 }}
          />
        )),
      )}
      {blocks.flatMap(block =>
        block.days
          .filter(day => DAYS.includes(day))
          .map(day => (
            <div
              key={`${block.label}-${day}`}
              aria-hidden="true"
              className={`week-schedule__block week-schedule__block--${block.variant}`}
              style={{ gridColumn: DAYS.indexOf(day) + 2, gridRow: `${rowFor(block.start)} / ${rowFor(block.end)}` }}
            >
              {block.label}
            </div>
          )),
      )}
    </div>
  );
}
