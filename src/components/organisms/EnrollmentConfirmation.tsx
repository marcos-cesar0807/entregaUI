import { useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Tick02FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { WeekSchedule, type ScheduleBlock } from './WeekSchedule';
import { enrolledSchedule, scheduleLabel, type Discipline } from '../../flows/discipline-data';

type Props = { items: Discipline[]; onHome: () => void; onViewEnrollments?: () => void };

/** T4 "semana pronta": a prova do sucesso é a agenda sem choque (wireframe B em docs/wireframes/sucesso-matricula.html). */
export function EnrollmentConfirmation({ items, onHome, onViewEnrollments }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => titleRef.current?.focus(), []);

  const blocks: ScheduleBlock[] = [
    ...enrolledSchedule.map(item => ({ label: item.name, days: item.days, start: item.start, end: item.end, variant: 'enrolled' as const })),
    ...items.map(item => ({ label: item.name, days: item.days, start: item.start, end: item.end, variant: 'candidate' as const })),
  ];
  const count = items.length === 1 ? 'Sua vaga está garantida' : `Suas ${items.length} vagas estão garantidas`;

  return (
    <main className="stack-screen confirmation">
      <div className="confirmation__hero">
        <img className="confirmation__hero-bg" src="./assets/discipline-research.png" alt="" />
        <div className="stack-screen__icon confirmation__icon" aria-hidden="true"><HugeiconsIcon icon={Tick02FreeIcons} size={32} strokeWidth={2.5} /></div>
        <h1 ref={titleRef} tabIndex={-1} className="confirmation__title">Pronto! {count}.</h1>
        <p className="summary-hint confirmation__fade">Matrícula confirmada para 2026.1.</p>
      </div>
      <div className="stack-screen__body confirmation__fade">
        <h2 className="summary-section">Sua semana a partir de agora</h2>
        <p className="summary-hint">Disciplinas novas em destaque, junto das que você já cursa.</p>
        <WeekSchedule blocks={blocks} />

        <h2 className="summary-section">Disciplinas garantidas</h2>
        <div className="summary-cards">
          {items.map(item => (
            <article key={item.id} className="discipline-card discipline-card--static">
              <div className="discipline-card__art" aria-hidden="true">
                <img src={`./assets/${item.image}`} alt="" />
                <span className={`discipline-card__illustration discipline-card__illustration--${item.illustration}`} />
              </div>
              <div className="discipline-card__body">
                <Badge status="success">Vaga garantida</Badge>
                <span className="discipline-card__title">{item.name}</span>
                <ul className="discipline-card__metadata">
                  <li><Icon name="teacher" size={16} /><span>{item.teacher}</span></li>
                  <li><Icon name="clock" size={16} /><span>{scheduleLabel(item)}</span></li>
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="stack-screen__actions confirmation__fade">
        <Button onClick={onHome}>Voltar ao início</Button>
        {onViewEnrollments && <Button variant="tertiary" onClick={onViewEnrollments}>Ver minhas matrículas</Button>}
      </div>
    </main>
  );
}
