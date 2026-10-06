import { App } from '../App';
import { Button } from '../components/atoms/Button';
import { DisciplineDetail } from '../components/organisms/DisciplineDetail';
import { EnrollmentSummary } from '../components/organisms/EnrollmentSummary';
import { EnrollmentConfirmation } from '../components/organisms/EnrollmentConfirmation';
import { SearchField } from '../components/molecules/SearchField';
import { SystemMessage } from '../components/molecules/SystemMessage';
import { NavBar } from '../components/organisms/NavBar';
import { TabBar } from '../components/organisms/TabBar';
import { disciplines } from '../flows/discipline-data';

const noop = () => {};
const conflictingDiscipline = disciplines.find(d => d.id === 'programming')!;

/** Mesmo invólucro que o `App` põe em volta das telas da aba Disciplinas (navbar no topo só na lista, TabBar embaixo). */
function Shell({ children, navBar = false }: { children: React.ReactNode; navBar?: boolean }) {
  return (
    <div className="app-shell">
      {navBar && <NavBar title="Disciplinas" />}
      {children}
      <TabBar current="disciplines" onChange={noop} />
    </div>
  );
}

/** T1 — reprodução estática de E1 (busca sem resultado), já que o estado real fica dentro do estado interno do `App`. */
function EmptyT1Preview() {
  return (
    <Shell navBar>
      <main className="screen-content">
        <header className="screen-heading">
          <h1>Disciplinas</h1>
        </header>
        <section className="catalog-controls" aria-label="Buscar e filtrar disciplinas">
          <SearchField value="zzz" onChange={noop} placeholder="Buscar disciplina..." />
        </section>
        <section className="discipline-list">
          <SystemMessage
            status="info"
            title="Nenhuma disciplina encontrada"
            action={<Button variant="tertiary">Limpar filtros</Button>}
          >
            Tente outro termo ou limpe os filtros para ver todas as disciplinas.
          </SystemMessage>
        </section>
      </main>
    </Shell>
  );
}

/** T1 — reprodução estática de E2 (carregamento inicial). */
function LoadingT1Preview() {
  return (
    <Shell navBar>
      <main className="screen-content">
        <header className="screen-heading">
          <h1>Disciplinas</h1>
        </header>
        <section className="discipline-list">
          <div className="loading-list" role="status" aria-label="Carregando disciplinas">
            <div /><div /><div />
          </div>
        </section>
      </main>
    </Shell>
  );
}

/** T1 — reprodução estática de E4 (busca acima de 60 caracteres). */
function SearchErrorT1Preview() {
  return (
    <Shell navBar>
      <main className="screen-content">
        <header className="screen-heading">
          <h1>Disciplinas</h1>
        </header>
        <section className="catalog-controls" aria-label="Buscar e filtrar disciplinas">
          <SearchField
            value={'x'.repeat(64)}
            onChange={noop}
            placeholder="Buscar disciplina..."
            error="Busca muito longa. Use até 60 caracteres ou apague parte do termo."
          />
        </section>
      </main>
    </Shell>
  );
}

/** Seleção que passa do limite de créditos sem choque de horário: UCD (4) + Pesquisa com Usuário (2) + Desenvolvimento Web (4) + 3 já matriculados = 13 de 12. */
const creditLimitSelection = ['ucd', 'research', 'web'].map(id => disciplines.find(item => item.id === id)!);

/** Tela transitória entre T3 e T4. */
function ConfirmingPreview() {
  return (
    <div className="app-shell">
      <div className="stack-screen stack-screen--centered" role="status">
        <span className="button__spinner" aria-hidden="true" />
        <p>Confirmando matrícula...</p>
      </div>
    </div>
  );
}

export type StateKind = 'padrao' | 'vazio' | 'carregando' | 'erro' | 'sucesso';

export const STATE_KIND_LABEL: Record<StateKind, string> = {
  padrao: 'Padrão',
  vazio: 'Vazio',
  carregando: 'Carregando',
  erro: 'Erro',
  sucesso: 'Sucesso',
};

export type ScreenState = { id: string; name: string; kind: StateKind; note: string; render: () => React.ReactNode };
export type ScreenDef = { id: string; name: string; file: string; states: ScreenState[] };

export const screens: ScreenDef[] = [
  {
    id: 'inicio',
    name: 'Início',
    file: 'src/components/organisms/Home.tsx',
    states: [
      { id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Abre a jornada: prazo da matrícula com a única ação primária, próximas aulas com tópico e avisos. Navbar flutuante com Início, Disciplinas e Agenda.', render: () => <App embedded initialScreen="home" /> },
      { id: 'depois', name: 'Depois da T4', kind: 'sucesso', note: 'Fecha a jornada: matrícula feita, o cartão de prazo sai e a home fica só com o dia a dia.', render: () => <App embedded initialScreen="home" initialEnrolledIds={['ucd', 'web']} /> },
    ],
  },
  {
    id: 't1',
    name: 'T1 · Lista de disciplinas',
    file: 'src/App.tsx',
    states: [
      { id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Busca, filtros, cartões e resumo fixo. Totalmente interativo.', render: () => <App embedded initialScreen="list" /> },
      { id: 'e1', name: 'E1 · Sem resultado', kind: 'vazio', note: 'Busca sem correspondência; ação para limpar filtros.', render: () => <EmptyT1Preview /> },
      { id: 'e2', name: 'E2 · Carregando', kind: 'carregando', note: 'Esqueleto de carregamento inicial, conexão lenta.', render: () => <LoadingT1Preview /> },
      { id: 'e4', name: 'E4 · Validação', kind: 'erro', note: 'Busca com mais de 60 caracteres; instrução concreta de correção.', render: () => <SearchErrorT1Preview /> },
    ],
  },
  {
    id: 't2',
    name: 'T2 · Detalhe da disciplina',
    file: 'src/components/organisms/DisciplineDetail.tsx',
    states: [
      {
        id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Agenda semanal sem conflito com o que Marina já cursa.',
        render: () => <Shell><DisciplineDetail discipline={disciplines[1]} selected={false} draftItems={[]} onBack={noop} onToggleSelect={noop} onOpenTeacher={noop} /></Shell>,
      },
      {
        id: 'conflito', name: 'Extra · Choque de horário', kind: 'erro', note: 'Conflito destacado contra a agenda fixa da Marina, sem falsa confirmação.',
        render: () => <Shell><DisciplineDetail discipline={conflictingDiscipline} selected={false} draftItems={[]} onBack={noop} onToggleSelect={noop} onOpenTeacher={noop} /></Shell>,
      },
      {
        id: 'limite', name: 'Extra · Limite de créditos', kind: 'erro', note: 'Com Desenvolvimento Web a seleção chega a 13 de 12 créditos: o aviso aparece no topo e a disciplina ainda pode ser selecionada; o bloqueio é no Confirmar (T3).',
        render: () => <Shell><DisciplineDetail discipline={creditLimitSelection[2]} selected={false} draftItems={creditLimitSelection.slice(0, 2)} onBack={noop} onToggleSelect={noop} onOpenTeacher={noop} /></Shell>,
      },
      {
        id: 'choque-limite', name: 'Extra · Choque e limite', kind: 'erro', note: 'Os dois problemas ao mesmo tempo viram um aviso só, com título e texto combinados.',
        render: () => <Shell><DisciplineDetail discipline={conflictingDiscipline} selected={false} draftItems={creditLimitSelection} onBack={noop} onToggleSelect={noop} onOpenTeacher={noop} /></Shell>,
      },
    ],
  },
  {
    id: 't3',
    name: 'T3 · Resumo da matrícula',
    file: 'src/components/organisms/EnrollmentSummary.tsx',
    states: [
      { id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Cartões das disciplinas, agenda resultante e as três saídas (voltar, cancelar com confirmação e Desfazer, confirmar) e remover com confirmação.', render: () => <Shell><EnrollmentSummary items={disciplines.slice(0, 2)} onBack={noop} onConfirm={noop} onRemove={noop} onCancel={noop} /></Shell> },
      { id: 'e3', name: 'E3 · Vaga esgotada', kind: 'erro', note: 'Interativo: toque em Confirmar matrícula. A última vaga de Dataviz é levada por outra pessoa; abre o aviso (Esc ou Fechar não alteram nada), a disciplina fica marcada e confirmar fica bloqueado até removê-la.', render: () => <App embedded initialScreen="summary" initialSelected={['dataviz', 'research']} /> },
      { id: 'conflito', name: 'Extra · Choque de horário', kind: 'erro', note: 'Conflito marcado na agenda e na mensagem; confirmar fica bloqueado até remover uma disciplina.', render: () => <Shell><EnrollmentSummary items={[disciplines[0], conflictingDiscipline]} onBack={noop} onConfirm={noop} onRemove={noop} /></Shell> },
      { id: 'limite', name: 'Extra · Limite de créditos', kind: 'erro', note: 'A seleção soma 13 de 12 créditos (3 já matriculados mais 10): a mensagem e o total ficam em vermelho e o Confirmar matrícula fica bloqueado até remover uma disciplina.', render: () => <Shell><EnrollmentSummary items={creditLimitSelection} onBack={noop} onConfirm={noop} onRemove={noop} /></Shell> },
      { id: 'choque-limite', name: 'Extra · Choque e limite', kind: 'erro', note: 'Choque de horário e créditos acima do limite juntos: uma mensagem só lista os dois problemas e um próximo passo; o Confirmar matrícula fica bloqueado.', render: () => <Shell><EnrollmentSummary items={[...creditLimitSelection, conflictingDiscipline]} onBack={noop} onConfirm={noop} onRemove={noop} /></Shell> },
    ],
  },
  {
    id: 'loading',
    name: 'Confirmando matrícula',
    file: 'src/App.tsx',
    states: [
      { id: 'carregando', name: 'Carregando', kind: 'carregando', note: 'Estado transitório entre T3 e T4, ~900ms.', render: () => <ConfirmingPreview /> },
    ],
  },
  {
    id: 't4',
    name: 'T4 · Confirmação',
    file: 'src/components/organisms/EnrollmentConfirmation.tsx',
    states: [
      { id: 'padrao', name: 'Sucesso', kind: 'sucesso', note: 'Semana pronta: agenda sem choque com as novas disciplinas encaixando (motion em tokens de duração); voltar ao início ou ver minhas matrículas.', render: () => <EnrollmentConfirmation items={[disciplines[0], disciplines[4]]} onHome={noop} onViewEnrollments={noop} /> },
    ],
  },
  {
    id: 't5',
    name: 'T5 · Minhas matrículas',
    file: 'src/components/organisms/MyEnrollments.tsx',
    states: [
      { id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Sub-aba de Disciplinas: prova que o fluxo não termina no "obrigado" (matrículas novas + o que já cursa).', render: () => <App embedded initialScreen="enrolled" initialEnrolledIds={['ucd', 'web']} /> },
      { id: 'vazio', name: 'Vazio', kind: 'vazio', note: 'Antes da primeira matrícula confirmada.', render: () => <App embedded initialScreen="enrolled" /> },
    ],
  },
  {
    id: 'agenda',
    name: 'Agenda',
    file: 'src/components/organisms/Agenda.tsx',
    states: [
      { id: 'padrao', name: 'Padrão', kind: 'padrao', note: 'Estilo Google Agenda: grade de horas com as aulas posicionadas; visão Dia (sala e tópico) e Semana. Aviso de que as novas disciplinas começam em 03/02.', render: () => <App embedded initialScreen="agenda" initialEnrolledIds={['ucd', 'web']} /> },
    ],
  },
];
