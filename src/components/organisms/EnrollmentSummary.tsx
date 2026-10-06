import { useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Delete02FreeIcons } from '@hugeicons/core-free-icons';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { BottomSheet } from '../molecules/BottomSheet';
import { SystemMessage } from '../molecules/SystemMessage';
import { NavBar } from './NavBar';

const listFormat = new Intl.ListFormat('pt-BR');
import { WeekSchedule, type ScheduleBlock } from './WeekSchedule';
import { CREDIT_LIMIT, enrolledSchedule, hasConflict, scheduleLabel, totalCredits, type Discipline } from '../../flows/discipline-data';

type Props = {
  items: Discipline[];
  onBack: () => void;
  onConfirm: () => void;
  onRemove?: (id: string) => void;
  /** T3 · cancelar: descarta toda a seleção (o App leva à T1 e oferece Desfazer). */
  onCancel?: () => void;
  /** E3: ids cujas vagas acabaram durante a decisão; bloqueiam a confirmação. */
  soldOutIds?: string[];
  /** E3: id da disciplina cujo aviso está aberto (diálogo de alerta). */
  alertId?: string | null;
  onCloseAlert?: () => void;
};

type Pending = { kind: 'remove'; id: string } | { kind: 'cancel' } | { kind: 'confirm' } | null;

export function EnrollmentSummary({ items, onBack, onConfirm, onRemove, onCancel, soldOutIds = [], alertId = null, onCloseAlert }: Props) {
  const [pending, setPending] = useState<Pending>(null);
  const alertFocusId = useRef<string | null>(null);
  const pendingItem = pending?.kind === 'remove' ? items.find(item => item.id === pending.id) : undefined;
  const alertItem = items.find(item => item.id === alertId);
  if (alertItem) alertFocusId.current = alertItem.id;

  const closeDialog = () => setPending(null);

  // E3 · fechar: não altera nada; depois que a folha desce, o foco vai para o botão de remover da disciplina afetada (quem abriu o aviso foi o Confirmar, agora bloqueado).
  const closeAlert = () => onCloseAlert?.();
  const focusAfterAlert = () => document.querySelector<HTMLElement>(`[data-remove-id="${alertFocusId.current}"]`)?.focus();

  const removeSoldOut = () => {
    if (alertId) onRemove?.(alertId);
    onCloseAlert?.();
  };

  const askRemove = (id: string) => setPending({ kind: 'remove', id });
  const askCancel = () => setPending({ kind: 'cancel' });
  const askConfirm = () => setPending({ kind: 'confirm' });

  const confirmDialog = () => {
    if (pending?.kind === 'remove') onRemove?.(pending.id);
    if (pending?.kind === 'cancel') onCancel?.();
    if (pending?.kind === 'confirm') onConfirm();
    setPending(null);
  };

  const conflicting = items.filter(item => hasConflict(item, items.filter(other => other.id !== item.id)));
  const soldOut = items.filter(item => soldOutIds.includes(item.id));
  const credits = totalCredits(items);
  const overLimit = credits > CREDIT_LIMIT;
  // Um aviso só, mesmo com vários problemas: título lista os problemas, texto junta os fatos.
  const issues = [
    soldOut.length > 0 && { label: 'vaga esgotada', fact: `Não há mais vagas em ${listFormat.format(soldOut.map(item => item.name))}.` },
    conflicting.length > 0 && { label: 'choque de horário', fact: `${listFormat.format(conflicting.map(item => item.name))} coincide com outra aula da sua semana.` },
    overLimit && { label: 'limite de créditos excedido', fact: `A seleção soma ${credits} de ${CREDIT_LIMIT} créditos.` },
  ].filter(issue => issue !== false);
  const blocked = conflicting.length > 0 || soldOut.length > 0 || overLimit;
  const hours = items.reduce((total, item) => total + (item.end - item.start) * item.days.length, 0);
  const blocks: ScheduleBlock[] = [
    ...enrolledSchedule.map(item => ({ label: item.name, days: item.days, start: item.start, end: item.end, variant: 'enrolled' as const })),
    ...items.map(item => ({
      label: item.name,
      days: item.days,
      start: item.start,
      end: item.end,
      variant: conflicting.includes(item) ? ('conflict' as const) : ('candidate' as const),
    })),
  ];

  return (
    <main className="stack-screen stack-screen--with-bar">
      <NavBar title="Resumo" onBack={onBack} backLabel="Voltar à lista de disciplinas" />
      <header className="screen-heading">
        <h1>Revise e confirme</h1>
      </header>

      <div className="stack-screen__body">
        {issues.length > 0 && (
          <div className="screen-alerts">
            <SystemMessage status="error" title={listFormat.format(issues.map(issue => issue.label)).replace(/^./, c => c.toUpperCase())}>
              {issues.map(issue => issue.fact).join(' ')} Remova uma disciplina para confirmar.
            </SystemMessage>
          </div>
        )}
        {items.length === 0 ? (
          <SystemMessage
            status="info"
            title="Nenhuma disciplina selecionada"
            action={<Button variant="tertiary" onClick={onBack}>Escolher disciplinas</Button>}
          >
            Volte à lista para escolher pelo menos uma disciplina antes de confirmar.
          </SystemMessage>
        ) : (
          <>
            <dl className="summary-totals">
              <div><dt>Disciplinas</dt><dd>{items.length}</dd></div>
              <div><dt><span aria-hidden="true">Horas/sem.</span><span className="sr-only">Horas por semana</span></dt><dd>{hours}h</dd></div>
              <div className={overLimit ? 'is-over' : undefined}><dt>Créditos</dt><dd aria-label={`${credits} de ${CREDIT_LIMIT}`}>{credits}/{CREDIT_LIMIT}</dd></div>
            </dl>

            <div className="summary-cards">
              {items.map(item => (
                <article key={item.id} className="discipline-card discipline-card--static">
                  <div className="discipline-card__art" aria-hidden="true">
                    <img src={`./assets/${item.image}`} alt="" />
                    <span className={`discipline-card__illustration discipline-card__illustration--${item.illustration}`} />
                  </div>
                  <div className="discipline-card__body">
                    {soldOutIds.includes(item.id) && <Badge status="error">Vaga esgotada</Badge>}
                    <span className="discipline-card__title">{item.name}</span>
                    <ul className="discipline-card__metadata">
                      <li><Icon name="teacher" size={16} /><span>{item.teacher}</span></li>
                      <li><Icon name="clock" size={16} /><span>{scheduleLabel(item)}</span></li>
                    </ul>
                  </div>
                  {onRemove && (
                    <button type="button" className="discipline-card__remove" data-remove-id={item.id} onClick={() => askRemove(item.id)} aria-label={`Remover ${item.name} da matrícula`}>
                      <HugeiconsIcon icon={Delete02FreeIcons} size={20} strokeWidth={2} />
                    </button>
                  )}
                </article>
              ))}
            </div>

            <h2 className="summary-section">Sua semana</h2>
            <WeekSchedule blocks={blocks} />
            {conflicting.length === 0 && <p className="summary-status summary-status--ok" role="status">Nenhum conflito de horário.</p>}
          </>
        )}
      </div>

      <div className="summary-bar">
        <div>
          <strong>{items.length} {items.length === 1 ? 'disciplina' : 'disciplinas'} · {hours}h</strong>
          <span>{soldOut.length > 0 ? 'Vaga esgotada' : conflicting.length > 0 ? 'Resolva o choque' : overLimit ? 'Resolva o limite' : 'Pronta para enviar'}</span>
        </div>
        <Button onClick={askConfirm} disabled={items.length === 0 || blocked}>Confirmar matrícula</Button>
        {onCancel && items.length > 0 && <Button variant="tertiary" onClick={askCancel}>Cancelar seleção</Button>}
      </div>

      <BottomSheet open={pending !== null} onClose={closeDialog} labelledBy="remover-titulo">
        {pending?.kind === 'remove' && pendingItem && (
          <>
            <h2 id="remover-titulo" className="sheet-title">Remover disciplina?</h2>
            <p className="sheet-text">{pendingItem.name} sai da sua matrícula e volta para a lista de disciplinas. Você pode escolher ela de novo depois.</p>
            <div className="sheet-actions">
              <Button className="button--danger" onClick={confirmDialog}>Remover disciplina</Button>
              <Button variant="tertiary" onClick={closeDialog} data-autofocus>Manter disciplina</Button>
            </div>
          </>
        )}
        {pending?.kind === 'confirm' && (
          <>
            <h2 id="remover-titulo" className="sheet-title">Confirmar matrícula?</h2>
            <p className="sheet-text">Você vai se matricular em {items.length} {items.length === 1 ? 'disciplina' : 'disciplinas'}, {hours}h por semana. Depois de confirmar, as vagas ficam garantidas para você.</p>
            <div className="sheet-actions">
              <Button onClick={confirmDialog}>Confirmar matrícula</Button>
              <Button variant="tertiary" onClick={closeDialog} data-autofocus>Voltar e revisar</Button>
            </div>
          </>
        )}
        {pending?.kind === 'cancel' && (
          <>
            <h2 id="remover-titulo" className="sheet-title">Descartar toda a seleção?</h2>
            <p className="sheet-text">As {items.length} {items.length === 1 ? 'disciplina sai' : 'disciplinas saem'} da seleção e você volta à lista. Dá para desfazer logo em seguida.</p>
            <div className="sheet-actions">
              <Button className="button--danger" onClick={confirmDialog}>Descartar seleção</Button>
              <Button variant="tertiary" onClick={closeDialog} data-autofocus>Manter seleção</Button>
            </div>
          </>
        )}
      </BottomSheet>

      <BottomSheet
        open={!!alertItem}
        onClose={closeAlert}
        onClosed={focusAfterAlert}
        restoreFocus={false}
        role="alertdialog"
        labelledBy="esgotada-titulo"
        describedBy="esgotada-texto"
      >
        {alertItem && (
          <>
            <h2 id="esgotada-titulo" className="sheet-title">A vaga de {alertItem.name} acabou</h2>
            <p id="esgotada-texto" className="sheet-text">Outra pessoa confirmou a última vaga enquanto você decidia. Sua matrícula ainda não foi confirmada, e nada foi alterado. Remova {alertItem.name} para confirmar as outras disciplinas ou volte à lista e escolha outra.</p>
            <div className="sheet-actions">
              <Button onClick={removeSoldOut}>Remover {alertItem.name}</Button>
              <Button variant="tertiary" onClick={closeAlert} data-autofocus>Fechar</Button>
            </div>
          </>
        )}
      </BottomSheet>
    </main>
  );
}
