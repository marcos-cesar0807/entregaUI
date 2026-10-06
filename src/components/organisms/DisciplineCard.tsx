import { HugeiconsIcon } from '@hugeicons/react';
import { Add01FreeIcons, Alert02FreeIcons, BookOpen01FreeIcons, Tick02FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../atoms/Badge';
import { Icon } from '../atoms/Icon';
import { creditsLabel, creditsOf, scheduleLabel, type Discipline } from '../../flows/discipline-data';

type Props = {
  discipline: Discipline;
  selected: boolean;
  /** Nome da aula com a qual esta disciplina choca; troca o horário por um aviso na própria linha. */
  conflictWith?: string;
  onOpen: (id: string) => void;
  /** Sem `onToggle` o cartão só abre o detalhe, sem o botão +. */
  onToggle?: (id: string) => void;
};

/** O cartão não é um <button> único: o botão que abre o detalhe cobre o cartão e o + fica ao lado, sem aninhar botões. */
export function DisciplineCard({ discipline, selected, conflictWith, onOpen, onToggle }: Props) {
  return (
    <article className={`discipline-card ${selected ? 'discipline-card--selected' : ''}`}>
      <button
        type="button"
        className="discipline-card__open"
        onClick={() => onOpen(discipline.id)}
        aria-label={`Ver detalhes de ${discipline.name}${selected ? ' (selecionada)' : ''}`}
      />
      <div className="discipline-card__art" aria-hidden="true">
        <img src={`./assets/${discipline.image}`} alt="" />
        <span className={`discipline-card__illustration discipline-card__illustration--${discipline.illustration}`} />
      </div>
      <div className="discipline-card__body">
        {discipline.vacancies <= 6 && <Badge status="error">{discipline.vacancies === 0 ? 'Vagas esgotadas' : discipline.vacancies === 1 ? 'Última vaga' : 'Últimas vagas'}</Badge>}
        <span className="discipline-card__title">{discipline.name}</span>
        <ul className="discipline-card__metadata">
          <li><Icon name="teacher" size={16} /><span>{discipline.teacher}</span></li>
          {conflictWith ? (
            <li className="discipline-card__conflict"><HugeiconsIcon icon={Alert02FreeIcons} size={16} aria-hidden="true" /><span>Choca com {conflictWith}</span></li>
          ) : (
            <li><Icon name="clock" size={16} /><span>{scheduleLabel(discipline)}</span></li>
          )}
          <li><HugeiconsIcon icon={BookOpen01FreeIcons} size={16} aria-hidden="true" /><span>{creditsLabel(creditsOf(discipline))}</span></li>
          <li><Icon name="mortarboard" size={16} /><span>{discipline.vacancies === 0 ? 'Sem vagas' : `${discipline.vacancies} ${discipline.vacancies === 1 ? 'vaga disponível' : 'vagas disponíveis'}`}</span></li>
        </ul>
      </div>
      {onToggle && (
        <button
          type="button"
          className="discipline-card__toggle"
          aria-pressed={selected}
          disabled={!selected && discipline.vacancies === 0}
          aria-label={`${selected ? 'Tirar' : 'Adicionar'} ${discipline.name} ${selected ? 'da' : 'à'} matrícula`}
          onClick={() => onToggle(discipline.id)}
        >
          <span><HugeiconsIcon icon={selected ? Tick02FreeIcons : Add01FreeIcons} size={18} strokeWidth={2.5} /></span>
        </button>
      )}
    </article>
  );
}
