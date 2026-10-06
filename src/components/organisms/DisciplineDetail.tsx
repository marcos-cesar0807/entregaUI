import { useEffect, useRef } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowRight01FreeIcons, FavouriteIcon } from '@hugeicons/core-free-icons';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { SystemMessage } from '../molecules/SystemMessage';
import { NavBar } from './NavBar';
import { WeekSchedule, type ScheduleBlock } from './WeekSchedule';
import { CREDIT_LIMIT, creditsLabel, creditsOf, enrolledSchedule, teachers, hasConflict, overlaps, scheduleLabel, totalCredits, type Discipline } from '../../flows/discipline-data';

type Props = {
  discipline: Discipline;
  selected: boolean;
  /** Outras disciplinas já no carrinho (ainda não confirmadas), para mostrar como rascunho na agenda. */
  draftItems: Discipline[];
  onBack: () => void;
  onToggleSelect: () => void;
  onOpenTeacher: (name: string) => void;
  /** Quantas disciplinas estão selecionadas no total; com `onReview`, mostra "Revisar" ao lado de "Remover". */
  selectedCount?: number;
  onReview?: () => void;
  /** Outras disciplinas da mesma área, para trocar de detalhe sem voltar à lista. */
  related?: Discipline[];
  onOpenRelated?: (id: string) => void;
  favorite?: boolean;
  onToggleFavorite?: () => void;
};

export function DisciplineDetail({ discipline, selected, draftItems, onBack, onToggleSelect, onOpenTeacher, selectedCount = 0, onReview, related = [], onOpenRelated, favorite = false, onToggleFavorite }: Props) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const conflict = hasConflict(discipline, draftItems);
  const conflictingWith = [...enrolledSchedule, ...draftItems].find(block => overlaps(discipline, block));
  const teacher = teachers[discipline.teacher];
  const creditsWith = totalCredits([...draftItems, discipline]);
  const blocks: ScheduleBlock[] = [
    ...enrolledSchedule.map(block => ({ label: block.name, days: block.days, start: block.start, end: block.end, variant: 'enrolled' as const })),
    ...draftItems.map(item => ({ label: item.name, days: item.days, start: item.start, end: item.end, variant: 'draft' as const })),
    { label: discipline.name, days: discipline.days, start: discipline.start, end: discipline.end, variant: conflict ? 'conflict' as const : 'candidate' as const },
  ];

  // Parallax: a arte desce mais devagar que o conteúdo. Só transform, sem layout.
  useEffect(() => {
    const onScroll = () => bannerRef.current?.style.setProperty('--shift', `${Math.max(0, window.scrollY) * 0.4}px`);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="discipline-detail">
      <NavBar
        title={discipline.name}
        onBack={onBack}
        backLabel="Voltar à lista de disciplinas"
        trailing={onToggleFavorite && (
          <button type="button" className="nav-bar__button nav-bar__button--favorite" aria-pressed={favorite} aria-label={favorite ? 'Tirar dos favoritos' : 'Favoritar'} onClick={onToggleFavorite}>
            <HugeiconsIcon icon={FavouriteIcon} size={22} strokeWidth={2} />
          </button>
        )}
      />
      <div className="discipline-detail__banner" ref={bannerRef}>
        <img src={`./assets/${discipline.image}`} alt="" />
        <span className={`discipline-card__illustration discipline-card__illustration--${discipline.illustration} discipline-detail__illustration`} aria-hidden="true" />
      </div>

      <div className="discipline-detail__body">
        {(conflict || creditsWith > CREDIT_LIMIT) && (
          <div className="screen-alerts">
            <SystemMessage
              status="warning"
              title={conflict && creditsWith > CREDIT_LIMIT ? 'Choque de horário e limite de créditos' : conflict ? 'Choque de horário' : 'Acima do limite de créditos'}
            >
              Esta disciplina {conflict && <>coincide com {conflictingWith?.name}</>}
              {conflict && creditsWith > CREDIT_LIMIT && ' e '}
              {creditsWith > CREDIT_LIMIT && <>leva a seleção a {creditsWith} de {CREDIT_LIMIT} créditos do semestre</>}.
            </SystemMessage>
          </div>
        )}
        <p className="discipline-detail__kicker">{discipline.category} · {discipline.period} · {creditsLabel(creditsOf(discipline))}</p>
        <h1>{discipline.name}</h1>
        <p className="discipline-detail__teacher-name">{discipline.teacher}</p>

        <dl className="discipline-detail__facts">
          <div><dt>Vagas</dt><dd className={discipline.vacancies <= 6 ? 'is-low' : ''}>{discipline.vacancies}</dd><dd>{discipline.vacancies === 0 ? 'esgotadas' : discipline.vacancies <= 6 ? 'últimas' : 'disponíveis'}</dd></div>
          <div><dt>Horário</dt><dd>{discipline.start}h</dd><dd>até {discipline.end}h</dd></div>
          <div><dt>Dias</dt><dd>{discipline.days.length}×</dd><dd>{discipline.days.join(' · ')}</dd></div>
          <div><dt>Período</dt><dd>{discipline.period.split('º')[0]}º</dd><dd>{discipline.category}</dd></div>
        </dl>
        <p className="sr-only">{scheduleLabel(discipline)}.</p>

        <h2>Quem dá a aula</h2>
        <button type="button" className="teacher-row" aria-haspopup="dialog" aria-label={`Ver perfil de ${discipline.teacher}`} onClick={() => onOpenTeacher(discipline.teacher)}>
          <img className="teacher-avatar" src={`./assets/${teacher.photo}`} alt="" />
          <span className="teacher-row__text">
            <span className="teacher-row__title"><strong>{discipline.teacher}</strong></span>
            <span>{teacher.role} · {teacher.years} anos</span>
          </span>
          <span className="teacher-row__rating" aria-label={`Nota ${teacher.rating.toLocaleString('pt-BR')}`}>★ {teacher.rating.toLocaleString('pt-BR')}</span>
          <span className="teacher-row__chevron" aria-hidden="true"><HugeiconsIcon icon={ArrowRight01FreeIcons} size={20} /></span>
        </button>

        <h2>Sobre</h2>
        <p className="discipline-detail__description">{discipline.description}</p>

        <h2>Sua agenda com esta disciplina</h2>
        <WeekSchedule blocks={blocks} />

        {related.length > 0 && onOpenRelated && (
          <>
            <h2>Outras de {discipline.category}</h2>
            <ul className="discipline-detail__rail">
              {related.map(item => (
                <li key={item.id}>
                  <button type="button" onClick={() => onOpenRelated(item.id)} aria-label={`Ver ${item.name}`}>
                    <span className="discipline-detail__rail-art" aria-hidden="true">
                      <img src={`./assets/${item.image}`} alt="" />
                      <span className={`discipline-card__illustration discipline-card__illustration--${item.illustration}`} />
                    </span>
                    <strong>{item.name}</strong>
                    <span><Icon name="clock" size={16} />{scheduleLabel(item)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="discipline-detail__cta">
        {selected && onReview ? (
          <>
            <Button variant="secondary" onClick={onToggleSelect}>Remover disciplina</Button>
            <Button onClick={onReview}>Revisar seleção · {selectedCount}</Button>
          </>
        ) : (
          <Button
            variant={selected ? 'secondary' : 'primary'}
            disabled={!selected && discipline.vacancies === 0}
            onClick={onToggleSelect}
          >
            {selected ? 'Remover disciplina' : discipline.vacancies === 0 ? 'Vagas esgotadas' : 'Adicionar à matrícula'}
          </Button>
        )}
      </div>
    </main>
  );
}
