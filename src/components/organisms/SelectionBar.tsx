import { Button } from '../atoms/Button';

type Props = { count: number; conflict?: boolean; credits?: number; creditLimit?: number; onReview: () => void };

/** Acessório da tab bar: contagem e estado do horário à esquerda, ação principal (Revisar) à direita. */
export function SelectionBar({ count, conflict = false, credits, creditLimit, onReview }: Props) {
  const withCredits = credits !== undefined && creditLimit !== undefined;
  const over = withCredits && credits > creditLimit;
  const status = withCredits
    ? `${over ? (conflict ? 'Choque e limite excedido' : 'Limite excedido') : conflict ? 'Choque de horário' : 'Sem choque'} · ${credits} de ${creditLimit} créditos`
    : conflict ? 'Choque de horário' : 'Sem choque de horário';
  return (
    <aside className="selection-bar" aria-label="Resumo da seleção" aria-live="polite">
      <div className="selection-bar__text">
        <strong>
          <span className={`selection-bar__dot ${conflict || over ? 'selection-bar__dot--bad' : ''}`} aria-hidden="true" />
          {count} {count === 1 ? 'disciplina' : 'disciplinas'}
        </strong>
        <span>{status}</span>
      </div>
      <Button onClick={onReview} disabled={count === 0}>Revisar seleção</Button>
    </aside>
  );
}
