import { useEffect, useState } from 'react';
import { Button } from './components/atoms/Button';
import { Chip } from './components/atoms/Chip';
import { DisciplineCard } from './components/organisms/DisciplineCard';
import { DisciplineDetail } from './components/organisms/DisciplineDetail';
import { EnrollmentSummary } from './components/organisms/EnrollmentSummary';
import { EnrollmentConfirmation } from './components/organisms/EnrollmentConfirmation';
import { MyEnrollments } from './components/organisms/MyEnrollments';
import { Home } from './components/organisms/Home';
import { Agenda } from './components/organisms/Agenda';
import { TabBar, type Tab } from './components/organisms/TabBar';
import { BottomSheet } from './components/molecules/BottomSheet';
import { Segmented } from './components/molecules/Segmented';
import { NavBar } from './components/organisms/NavBar';
import { SelectionBar } from './components/organisms/SelectionBar';
import { SearchField } from './components/molecules/SearchField';
import { SystemMessage } from './components/molecules/SystemMessage';
import { CREDIT_LIMIT, disciplines, hasConflict, enrolledSchedule, overlaps, teacherBios, teachers, totalCredits, type Discipline } from './flows/discipline-data';

type Category = 'Todos' | Discipline['category'];
type Screen = 'home' | 'agenda' | 'list' | 'detail' | 'summary' | 'confirming' | 'done' | 'enrolled';
const categories: Category[] = ['Todos', 'Design', 'Programação', 'Negócios', 'Educação'];
const CONFIRM_DELAY_MS = 900;

const animationClass = (direction: 'forward' | 'back' | 'fade') =>
  direction === 'forward' ? 'screen-forward' : direction === 'back' ? 'screen-back' : 'screen-fade';

/**
 * Rolagem → <html data-scrolled> (passou do título grande: a barra do topo ganha vidro e título pequeno) e
 * <html data-shrunk> (rolando para baixo: tab bar e botão de ação diminuem; voltam ao rolar para cima).
 */
function useScrollState(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - last;
      root.toggleAttribute('data-scrolled', y > 36);
      if (y < 24 || dy < -6) root.removeAttribute('data-shrunk');
      else if (dy > 6 && y > 40) root.setAttribute('data-shrunk', '');
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      root.removeAttribute('data-scrolled');
      root.removeAttribute('data-shrunk');
    };
  }, [enabled]);
}

/** `embedded` desliga o estado de rolagem da janela (a grade rola a página, não o app). `initialScreen`/`initialEnrolledIds`/`initialSelected` só existem para o `Projeto/Protótipo` abrir o app direto numa aba. */
export function App({ initialScreen = 'home', initialEnrolledIds = [], initialSelected = [], embedded = false }: { initialScreen?: Screen; initialEnrolledIds?: string[]; initialSelected?: string[]; embedded?: boolean } = {}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('Todos');
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [enrolledIds, setEnrolledIds] = useState<string[]>(initialEnrolledIds);
  const [lastConfirmed, setLastConfirmed] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [teacherOpen, setTeacherOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [navDirection, setNavDirection] = useState<'forward' | 'back' | 'fade'>('forward');
  const [detailId, setDetailId] = useState<string | null>(null);
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // E3: disciplinas cuja última vaga foi levada por outra pessoa durante a decisão; `alertId` é o aviso aberto na T3.
  const [soldOutIds, setSoldOutIds] = useState<string[]>([]);
  const [alertId, setAlertId] = useState<string | null>(null);
  // Desfazer: guarda a seleção de antes da última remoção.
  const [undo, setUndo] = useState<{ message: string; previous: string[] } | null>(null);
  useScrollState(!embedded);

  // Cada tela diz onde a pessoa está também na aba do navegador e para o leitor de tela (WCAG 2.4.2).
  useEffect(() => {
    const names: Record<Screen, string> = { home: 'Início', agenda: 'Agenda', list: 'Disciplinas', detail: disciplines.find(item => item.id === detailId)?.name ?? 'Disciplina', summary: 'Revise e confirme', confirming: 'Confirmando matrícula', done: 'Matrícula confirmada', enrolled: 'Minhas matrículas' };
    document.title = `${names[screen]} — O caso Marina`;
  }, [screen, detailId]);

  // E2: o carregamento acontece na primeira entrada em Disciplinas, não na abertura do app (que agora é o Início).
  useEffect(() => {
    if (screen !== 'list' || !loading) return;
    const timeout = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(timeout);
  }, [screen, loading]);

  useEffect(() => {
    if (screen !== 'confirming') return;
    const ids = [...selected];
    const timeout = window.setTimeout(() => {
      // E3: a vaga acabou no meio da decisão; nada é confirmado e Marina volta à T3 com o aviso.
      const taken = ids.filter(id => disciplines.find(item => item.id === id)?.takenOnConfirm && !soldOutIds.includes(id));
      if (taken.length > 0) {
        setSoldOutIds(current => [...current, ...taken]);
        setAlertId(taken[0]);
        setNavDirection('fade');
        setScreen('summary');
        return;
      }
      setEnrolledIds(current => [...current, ...ids]);
      setLastConfirmed(ids);
      setSelected([]);
      setNavDirection('fade');
      setScreen('done');
    }, CONFIRM_DELAY_MS);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const openTeacherSheet = (name: string) => {
    setTeacherName(name);
    setTeacherOpen(true);
  };

  const goTo = (next: Screen, direction: 'forward' | 'back' | 'fade') => {
    if (direction !== 'back') window.scrollTo(0, 0);
    document.documentElement.removeAttribute('data-shrunk');
    setNavDirection(direction);
    setScreen(next);
    setUndo(null);
  };

  const removeWithUndo = (id: string) => {
    const name = disciplines.find(item => item.id === id)?.name;
    setUndo({ message: `${name} removida da seleção.`, previous: selected });
    setSelected(current => current.filter(item => item !== id));
  };

  // T3 · cancelar: descarta a seleção inteira, volta à T1 e oferece Desfazer.
  const cancelSelection = () => {
    const previous = selected;
    goTo('list', 'back');
    setSelected([]);
    setUndo({ message: 'Seleção descartada.', previous });
  };

  // O botão Desfazer some junto com o toast; o foco vai para o título da tela para não cair no <body>.
  const restoreUndo = () => {
    if (!undo) return;
    setSelected(undo.previous);
    setUndo(null);
    window.requestAnimationFrame(() => {
      const title = document.querySelector<HTMLElement>('.app-shell h1');
      title?.setAttribute('tabindex', '-1');
      title?.focus();
    });
  };

  const undoToast = undo && (
    <div className={`toast ${screen === 'summary' ? 'toast--summary' : ''}`} role="status">
      <span>{undo.message}</span>
      <button type="button" className="toast__action" onClick={restoreUndo}>Desfazer</button>
      <button type="button" className="toast__close" onClick={() => setUndo(null)} aria-label="Fechar aviso">×</button>
    </div>
  );

  const tabScreens: Record<Tab, Screen> = { home: 'home', disciplines: 'list', agenda: 'agenda' };
  const conflictNameFor = (item: Discipline) =>
    [...enrolledSchedule, ...selectedItems.filter(other => other.id !== item.id)].find(block => overlaps(item, block))?.name;
  const currentTab: Tab = screen === 'home' ? 'home' : screen === 'agenda' ? 'agenda' : 'disciplines';

  // Cada aba renderiza a própria TabBar; devolve o foco à aba ativa para quem navega por teclado não cair no <body>.
  const goToTab = (tab: Tab) => {
    goTo(tabScreens[tab], 'fade');
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('.tab-bar [aria-current="page"]')?.focus());
  };

  const openDetail = (id: string) => {
    setDetailId(id);
    goTo('detail', 'forward');
  };

  const goBackToList = () => {
    setTeacherOpen(false);
    goTo('list', 'back');
    // A lista é remontada, então o botão que abriu o detalhe já não existe: procura o cartão pelo nome.
    const name = disciplines.find(item => item.id === detailId)?.name;
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>(`[aria-label^="Ver detalhes de ${name}"]`)?.focus());
  };

  const toggleSelection = (id: string) => {
    setUndo(null);
    setSelected(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  };

  const catalog = disciplines.map(item => (soldOutIds.includes(item.id) ? { ...item, vacancies: 0 } : item));
  const filtered = catalog.filter(item =>
    item.name.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR')) &&
    (category === 'Todos' || item.category === category),
  );
  const selectedItems = catalog.filter(item => selected.includes(item.id));
  const confirmedItems = catalog.filter(item => lastConfirmed.includes(item.id));
  const enrolledItems = catalog.filter(item => enrolledIds.includes(item.id));
  const currentDetail = catalog.find(item => item.id === detailId);
  const selectionConflict = selectedItems.some(item => hasConflict(item, selectedItems.filter(other => other.id !== item.id)));
  const relatedItems = currentDetail ? catalog.filter(item => item.category === currentDetail.category && item.id !== currentDetail.id) : [];
  const searchError = query.length > 60 ? 'Busca muito longa. Use até 60 caracteres ou apague parte do termo.' : undefined;

  if (screen === 'detail' && currentDetail) {
    return (
      <div className="app-shell">
        <div key="detail" className={animationClass(navDirection)}>
          <DisciplineDetail
            discipline={currentDetail}
            selected={selected.includes(currentDetail.id)}
            draftItems={catalog.filter(item => selected.includes(item.id) && item.id !== currentDetail.id)}
            onBack={goBackToList}
            selectedCount={selected.length}
            onReview={() => goTo('summary', 'forward')}
            related={relatedItems}
            onOpenRelated={id => { setDetailId(id); window.scrollTo(0, 0); }}
            favorite={favorites.includes(currentDetail.id)}
            onToggleFavorite={() => setFavorites(current => current.includes(currentDetail.id) ? current.filter(id => id !== currentDetail.id) : [...current, currentDetail.id])}
            onToggleSelect={() => {
              const wasSelected = selected.includes(currentDetail.id);
              toggleSelection(currentDetail.id);
              if (!wasSelected) goBackToList();
            }}
            onOpenTeacher={openTeacherSheet}
          />
        </div>

        <BottomSheet open={teacherOpen} onClose={() => setTeacherOpen(false)} label="Perfil do professor">
          {teacherName && (() => {
            const teacher = teachers[teacherName];
            const taught = disciplines.filter(item => item.teacher === teacherName);
            return (
              <>
                <div className="teacher-card">
                  <img className="teacher-card__cover" src={`./assets/${taught[0].image}`} alt="" />
                  <img className="teacher-avatar teacher-avatar--lg" src={`./assets/${teacher.photo}`} alt="" />
                  <h2 className="teacher-card__name">{teacherName}</h2>
                  <p className="teacher-card__role">Docente · {teacher.role}</p>
                  <ul className="teacher-card__chips">{teacher.areas.map(area => <li key={area}>{area}</li>)}</ul>
                  <dl className="teacher-card__stats">
                    <div><dt>disciplinas</dt><dd>{taught.length}</dd></div>
                    <div><dt>de experiência</dt><dd>{teacher.years} anos</dd></div>
                    <div><dt>avaliação</dt><dd>★ {teacher.rating.toLocaleString('pt-BR')}</dd></div>
                  </dl>
                </div>
                <ul className="teacher-facts">
                  <li><strong>Atuação:</strong> {teacher.role}</li>
                  <li><strong>Formação:</strong> {teacher.education}</li>
                  <li><strong>Sobre:</strong> {teacherBios[teacherName]}</li>
                </ul>
              </>
            );
          })()}

        </BottomSheet>
        <TabBar current="disciplines" onChange={goToTab} />
      </div>
    );
  }

  if (screen === 'summary') {
    return (
      <div className="app-shell">
        <div key="summary" className={animationClass(navDirection)}>
          <EnrollmentSummary
            items={selectedItems}
            onBack={() => goTo('list', 'fade')}
            onConfirm={() => goTo('confirming', 'fade')}
            onRemove={removeWithUndo}
            onCancel={cancelSelection}
            soldOutIds={soldOutIds}
            alertId={alertId}
            onCloseAlert={() => setAlertId(null)}
          />
        </div>
        {undoToast}
        <TabBar current="disciplines" onChange={goToTab} />
      </div>
    );
  }

  if (screen === 'confirming') {
    return (
      <div className="app-shell">
        <div key="confirming" className={`${animationClass(navDirection)} stack-screen stack-screen--centered`} role="status" aria-live="polite">
          <span className="button__spinner" aria-hidden="true" />
          <p>Confirmando matrícula...</p>
        </div>
      </div>
    );
  }

  if (screen === 'done') {
    return (
      <div className="app-shell">
        <div key="done" className={animationClass(navDirection)}>
          <EnrollmentConfirmation items={confirmedItems} onHome={() => goTo('home', 'fade')} onViewEnrollments={() => goTo('enrolled', 'fade')} />
        </div>
      </div>
    );
  }

  const selectionBar = selected.length > 0 && <SelectionBar count={selected.length} conflict={selectionConflict} credits={totalCredits(selectedItems)} creditLimit={CREDIT_LIMIT} onReview={() => goTo('summary', 'forward')} />;

  const disciplinesHeader = (
    <>
      <header className="screen-heading">
        <h1>Disciplinas</h1>
      </header>
      <div className="screen-toolbar">
        <Segmented
          label="Visão das disciplinas"
          value={screen === 'enrolled' ? 'enrolled' : 'list'}
          onChange={next => goTo(next, 'fade')}
          options={[{ value: 'list', label: 'Disponíveis' }, { value: 'enrolled', label: 'Minhas matrículas' }]}
        />
      </div>
    </>
  );

  if (screen === 'home' || screen === 'agenda' || screen === 'enrolled') {
    return (
      <div className="app-shell">
        <NavBar title={screen === 'home' ? 'Início' : screen === 'agenda' ? 'Agenda' : 'Disciplinas'} />
        <div key={screen} className={animationClass(navDirection)}>
          {screen === 'home' && <Home enrolled={enrolledIds.length > 0} onChooseDisciplines={() => goTo('list', 'fade')} onOpenAgenda={() => goToTab('agenda')} />}
          {screen === 'agenda' && <Agenda newItems={enrolledItems} />}
          {screen === 'enrolled' && (
            <main className="screen-content">
              {disciplinesHeader}
              <MyEnrollments items={enrolledItems} />
            </main>
          )}
        </div>
        {selectionBar}
        <TabBar current={currentTab} onChange={goToTab} />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <NavBar title="Disciplinas" />
      <main className={`screen-content ${navDirection === 'back' ? 'screen-back' : ''}`}>
        {disciplinesHeader}

        <section className="catalog-controls" aria-label="Buscar e filtrar disciplinas">
          <SearchField value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar disciplina..." error={searchError} />
          <div className="category-filter" role="group" aria-label="Área das disciplinas">
            {categories.map(item => (
              <Chip key={item} selected={category === item} onClick={() => setCategory(item)}>{item}</Chip>
            ))}
          </div>
        </section>

        <section className="discipline-list" aria-label="Lista de disciplinas" aria-live="polite">
          {loading ? (
            <div className="loading-list" role="status" aria-label="Carregando disciplinas">
              <div /><div /><div />
              <span className="sr-only">Carregando disciplinas...</span>
            </div>
          ) : filtered.length === 0 ? (
            <>
            <span className="discipline-card__illustration empty-art" aria-hidden="true" />
            <SystemMessage
              status="info"
              title="Nenhuma disciplina encontrada"
              action={<Button variant="tertiary" onClick={() => { setQuery(''); setCategory('Todos'); }}>Limpar filtros</Button>}
            >
              Tente outro termo ou limpe os filtros para ver todas as disciplinas.
            </SystemMessage>
            </>
          ) : filtered.map(item => (
            <DisciplineCard
              key={item.id}
              discipline={item}
              selected={selected.includes(item.id)}
              conflictWith={enrolledIds.includes(item.id) ? undefined : conflictNameFor(item)}
              onOpen={openDetail}
              onToggle={toggleSelection}
            />
          ))}
        </section>
      </main>

      {undoToast}
      {selectionBar}
      <TabBar current={currentTab} onChange={goToTab} />
    </div>
  );
}
