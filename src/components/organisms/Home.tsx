import { HugeiconsIcon } from '@hugeicons/react';
import { BookOpen01FreeIcons, Location01FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { SystemMessage } from '../molecules/SystemMessage';
import { DEMO_TODAY, ENROLLMENT_DAYS_LEFT, WEEKDAYS, enrolledSchedule } from '../../flows/discipline-data';

type Props = { enrolled: boolean; onChooseDisciplines: () => void; onOpenAgenda: () => void };

const today = WEEKDAYS.indexOf(DEMO_TODAY);
const dayLabel = (index: number) => (index === today ? 'Hoje' : index === today + 1 ? 'Amanhã' : WEEKDAYS[index]);

/** Próximas duas aulas a partir de "hoje", agrupadas por dia. */
const nextClasses = WEEKDAYS.slice(today)
  .flatMap((day, offset) => enrolledSchedule.filter(item => item.days.includes(day)).map(item => ({ ...item, dayIndex: today + offset })))
  .slice(0, 2);

/** Início: abre a jornada (prazo + escolher disciplinas) e a recebe de volta depois da T4 (decisão 17). */
export function Home({ enrolled, onChooseDisciplines, onOpenAgenda }: Props) {
  return (
    <main className="screen-content">
      <header className="screen-heading">
        <p>Boa tarde,</p>
        <h1><span className="sr-only">Início · </span>Marina</h1>
      </header>

      <section className="home-hero" aria-labelledby="home-hero-title">
        <img className="home-hero__bg" src="./assets/discipline-ucd.png" alt="" />
        <span className="discipline-card__illustration home-hero__art" aria-hidden="true" />
        {enrolled ? (
          <>
            <div className="home-hero__text">
              <p className="home-hero__label">Matrícula 2026.1</p>
              <h2 id="home-hero-title" className="home-hero__done">Confirmada</h2>
              <p>Suas disciplinas estão garantidas para o semestre.</p>
            </div>
          </>
        ) : (
          <>
            <div className="home-hero__text">
              <p className="home-hero__label">Matrícula 2026.1</p>
              <h2 id="home-hero-title" className="home-hero__count">{ENROLLMENT_DAYS_LEFT}<small> dias</small></h2>
              <p>para escolher suas disciplinas antes que as vagas acabem.</p>
            </div>
            <Button onClick={onChooseDisciplines}>Escolher disciplinas</Button>
          </>
        )}
      </section>

      <h2 className="summary-section">Próximas aulas</h2>
      <ol className="next-classes">
        {nextClasses.map(item => (
          <li key={`${item.name}-${item.dayIndex}`} className="class-card">
            <div className="class-card__top">
              <strong className="class-card__time">{item.start}h</strong>
              <Badge status={item.dayIndex === today ? 'brand' : 'info'}>{dayLabel(item.dayIndex)}</Badge>
            </div>
            <strong className="class-card__name">{item.name}</strong>
            <span className="class-card__meta"><HugeiconsIcon icon={BookOpen01FreeIcons} size={16} aria-hidden="true" />{item.topic}</span>
            <span className="class-card__meta"><HugeiconsIcon icon={Location01FreeIcons} size={16} aria-hidden="true" />Sala {item.room}</span>
          </li>
        ))}
      </ol>
      <Button variant="tertiary" className="home-link" onClick={onOpenAgenda}>Ver agenda completa</Button>

      <h2 className="summary-section">Avisos</h2>
      <SystemMessage status="warning" title="Rematrícula de Inglês pendente">Confirme até 30/09 para não perder a turma.</SystemMessage>
    </main>
  );
}
