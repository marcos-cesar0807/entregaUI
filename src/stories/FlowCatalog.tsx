import { useLayoutEffect, useRef, useState } from 'react';
import { Badge } from '../components/atoms/Badge';
import { Button } from '../components/atoms/Button';
import { screens, STATE_KIND_LABEL, type StateKind } from './flow-catalog-data';

const FRAME_W = 402;
const FRAME_H = 780;

const KIND_STATUS: Record<StateKind, 'info' | 'error' | 'success'> = {
  padrao: 'info',
  vazio: 'info',
  carregando: 'info',
  erro: 'error',
  sucesso: 'success',
};

type Item = { key: string; number: string; screenName: string; file: string; state: (typeof screens)[number]['states'][number]; screenIndex: number };

const items: Item[] = screens.flatMap((screen, i) =>
  screen.states.map((state, j) => ({
    key: `${screen.id}:${state.id}`,
    number: `${String(i + 1).padStart(2, '0')}${j === 0 ? '' : String.fromCharCode(97 + j)}`,
    screenName: screen.name,
    file: screen.file,
    state,
    screenIndex: i,
  })),
);
const kinds = Array.from(new Set(items.map(it => it.state.kind)));

/**
 * Escala o filho (largura/altura fixas de `FRAME_W`x`FRAME_H`) para caber na largura do container.
 * A altura do container vem de `aspect-ratio` em CSS, não de JS: escrever a altura no mesmo elemento
 * observado pelo `ResizeObserver` cria um loop de realimentação com a barra de rolagem da página
 * (o tamanho fica oscilando sem parar).
 */
function ScreenFrame({ children, interactive }: { children: React.ReactNode; interactive: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale((entry?.contentRect.width ?? 0) / FRAME_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="flow-frame">
      {scale > 0 && (
        <div
          className="flow-frame__inner"
          style={{ width: FRAME_W, height: FRAME_H, transform: `scale(${scale})` }}
          // @ts-expect-error -- `inert` ainda não está nos tipos do React usados aqui, mas é suportado pelo navegador.
          inert={interactive ? undefined : ''}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export function FlowCatalog() {
  const [kind, setKind] = useState<StateKind | 'todos'>('todos');
  const [focusKey, setFocusKey] = useState<string | null>(null);

  const visible = kind === 'todos' ? items : items.filter(it => it.state.kind === kind);
  const focusIndex = items.findIndex(it => it.key === focusKey);
  const focus = items[focusIndex];

  return (
    <div className="flow-catalog">
      <header className="flow-catalog__header">
        <div>
          <h1>Fluxo de matrícula</h1>
          <p>As 5 telas e os 4 estados obrigatórios, mais Início e Agenda, num só lugar.</p>
        </div>
        <div className="flow-catalog__filters" role="group" aria-label="Tipo de estado">
          {(['todos', ...kinds] as const).map(k => (
            <Button key={k} size="sm" variant={k === kind ? 'primary' : 'secondary'} onClick={() => setKind(k)}>
              {k === 'todos' ? 'Todos' : STATE_KIND_LABEL[k]}
            </Button>
          ))}
        </div>
      </header>

      {focus ? (
        <section className="flow-catalog__focus" aria-label={`${focus.screenName} · ${focus.state.name}`}>
          <div className="flow-catalog__focus-frame">
            <ScreenFrame interactive>{focus.state.render()}</ScreenFrame>
          </div>
          <aside className="flow-catalog__panel">
            <div className="flow-catalog__panel-top">
              <div>
                <p className="flow-catalog__number">{focus.number}</p>
                <h2>{focus.screenName}</h2>
              </div>
              <button type="button" className="stack-screen__back" onClick={() => setFocusKey(null)} aria-label="Fechar">×</button>
            </div>
            <Badge status={KIND_STATUS[focus.state.kind]}>{focus.state.name}</Badge>
            <p>{focus.state.note}</p>
            {screens[focus.screenIndex]!.states.length > 1 && (
              <div className="flow-catalog__filters">
                {screens[focus.screenIndex]!.states.map(s => (
                  <Button key={s.id} size="sm" variant={s.id === focus.state.id ? 'primary' : 'secondary'} onClick={() => setFocusKey(`${screens[focus.screenIndex]!.id}:${s.id}`)}>
                    {s.name}
                  </Button>
                ))}
              </div>
            )}
            <dl className="flow-catalog__meta">
              <div><dt>Próxima tela</dt><dd>{screens[focus.screenIndex + 1]?.name ?? 'Fim do fluxo'}</dd></div>
              <div><dt>Arquivo</dt><dd>{focus.file}</dd></div>
            </dl>
            <div className="flow-catalog__nav">
              <Button variant="secondary" size="sm" disabled={focusIndex <= 0} onClick={() => setFocusKey(items[focusIndex - 1]!.key)}>← Anterior</Button>
              <Button variant="secondary" size="sm" disabled={focusIndex >= items.length - 1} onClick={() => setFocusKey(items[focusIndex + 1]!.key)}>Próxima →</Button>
            </div>
          </aside>
        </section>
      ) : (
        <ul className="flow-catalog__grid">
          {visible.map(it => (
            <li key={it.key}>
              <div
                role="button"
                tabIndex={0}
                className="flow-catalog__card"
                onClick={() => setFocusKey(it.key)}
                onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setFocusKey(it.key); } }}
                aria-label={`Abrir ${it.screenName}${it.state.kind !== 'padrao' ? `, ${it.state.name}` : ''}`}
              >
                <ScreenFrame interactive={false}>{it.state.render()}</ScreenFrame>
                <span className="flow-catalog__card-label" aria-hidden="true">
                  <code>{it.number}</code>
                  <span>{it.screenName.replace(/^T\d+ · /, '')}</span>
                  {it.state.kind !== 'padrao' && <Badge status={KIND_STATUS[it.state.kind]}>{it.state.name}</Badge>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
