import { SystemMessage } from '../molecules/SystemMessage';
import { enrolledSchedule, scheduleLabel, type Discipline } from '../../flows/discipline-data';

/**
 * T5: sub-aba "Minhas matrículas" da aba Disciplinas (decisão 17). Não tem mais botão
 * "Buscar mais": a sub-aba "Disponíveis" está a um toque.
 */
export function MyEnrollments({ items }: { items: Discipline[] }) {
  return (
    <>
      <h2 className="summary-section">2026.1 · novas</h2>
      {items.length === 0 ? (
        <SystemMessage status="info" title="Nenhuma matrícula ainda">Você ainda não confirmou nenhuma disciplina.</SystemMessage>
      ) : (
        <ul className="stack-screen__list">
          {items.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span className="stack-screen__list-meta">{scheduleLabel(item)}</span>
            </li>
          ))}
        </ul>
      )}
      <h2 className="summary-section">Já cursando</h2>
      <ul className="stack-screen__list">
        {enrolledSchedule.map(item => (
          <li key={item.name}>
            <span>{item.name}</span>
            <span className="stack-screen__list-meta">{scheduleLabel(item)}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
