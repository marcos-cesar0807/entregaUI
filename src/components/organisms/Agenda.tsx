import { useState, type CSSProperties } from 'react';
import { SystemMessage } from '../molecules/SystemMessage';
import { Segmented } from '../molecules/Segmented';
import { DEMO_TODAY, WEEKDAYS, enrolledSchedule, type Discipline, type Weekday } from '../../flows/discipline-data';

type View = 'day' | 'week';

const START_HOUR = 8;
const END_HOUR = 22;
const HOUR_PX = 48;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);
// Semana de demonstração (decisão 17): "hoje" é segunda, 28/09.
const DATES: Record<Weekday, number> = { Seg: 28, Ter: 29, Qua: 30, Qui: 1, Sex: 2 };
const FULL: Record<Weekday, string> = { Seg: 'Segunda', Ter: 'Terça', Qua: 'Quarta', Qui: 'Quinta', Sex: 'Sexta' };

/** Aba Agenda no estilo Google Agenda: grade de horas com as aulas posicionadas pelo horário, visões Dia e Semana. */
export function Agenda({ newItems }: { newItems: Discipline[] }) {
  const [view, setView] = useState<View>('day');
  const [day, setDay] = useState<Weekday>(DEMO_TODAY);
  const days = view === 'day' ? [day] : WEEKDAYS;

  const openDay = (item: Weekday) => {
    setDay(item);
    setView('day');
  };

  return (
    <main className="screen-content">
      <header className="screen-heading">
        <h1>Agenda</h1>
        <p>Setembro · Outubro</p>
      </header>
      <div className="screen-toolbar">
        <Segmented label="Visão da agenda" value={view} onChange={setView} options={[{ value: 'day', label: 'Dia' }, { value: 'week', label: 'Semana' }]} />
      </div>

      <div className={`calendar calendar--${view}`} style={{ '--calendar-cols': days.length } as CSSProperties}>
        <div className="calendar__head">
          {days.map(item => (
            <button
              key={item}
              type="button"
              className="calendar__day"
              aria-current={item === DEMO_TODAY ? 'date' : undefined}
              aria-label={`${FULL[item]}, ${DATES[item]}${view === 'week' ? ': ver o dia' : ''}`}
              onClick={() => openDay(item)}
            >
              <span>{item}</span>
              <span className="calendar__date">{DATES[item]}</span>
            </button>
          ))}
        </div>
        <div className="calendar__body" style={{ height: HOURS.length * HOUR_PX }}>
          <div className="calendar__hours" aria-hidden="true">
            {HOURS.map(hour => <span key={hour} style={{ top: (hour - START_HOUR) * HOUR_PX }}>{String(hour).padStart(2, '0')}:00</span>)}
          </div>
          {days.map(item => (
            <div key={item} className="calendar__col">
              {enrolledSchedule.filter(c => c.days.includes(item)).map(c => (
                <div key={c.name} className="calendar__event" title={c.name} style={{ top: (c.start - START_HOUR) * HOUR_PX, height: (c.end - c.start) * HOUR_PX - 2 }}>
                  <strong>{c.name}</strong>
                  <span>{c.start}h–{c.end}h · Sala {c.room}</span>
                  <span>{c.topic}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {newItems.length > 0 && (
        <SystemMessage status="info" title="Novas disciplinas a partir de 03/02">
          {new Intl.ListFormat('pt-BR').format(newItems.map(item => item.name))} entram na agenda quando o semestre 2026.1 começar.
        </SystemMessage>
      )}
    </main>
  );
}
