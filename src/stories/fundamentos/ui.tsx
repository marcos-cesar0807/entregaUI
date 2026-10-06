import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import tokens from '../../styles/figma-tokens.json';
import './fundamentos.css';

type Tok = { name: string; value: string };
const T = tokens as Tok[];

/** Valor literal de um token primitivo do Figma (ex.: `color/gray/600` → `#475569`). */
export const hex = (name: string) => T.find(t => t.name === name)?.value ?? '#000000';

const lum = (h: string) => {
  const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
/** Contraste WCAG entre duas cores hexadecimais, com vírgula decimal (ex.: `7,06`). */
export const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)];
  return ((Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)).toFixed(2).replace('.', ',');
};

export function Page({ kicker = 'Fundamentos', title, lead, rule, children }: { kicker?: string; title: string; lead: string; rule?: string; children: ReactNode }) {
  return (
    <main className="fd">
      <header className="fd-hero">
        <p className="fd-kicker">{kicker}</p>
        <h1>{title}</h1>
        <p className="fd-lead">{lead}</p>
        {rule && <aside className="fd-rule"><b>Em uma frase</b><p>{rule}</p></aside>}
      </header>
      {children}
    </main>
  );
}

export function Section({ n, title, intro, children }: { n: number; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section className="fd-sec">
      <header><span className="fd-num">{n}</span><h2>{title}</h2></header>
      {intro && <p>{intro}</p>}
      <div className="fd-body">{children}</div>
    </section>
  );
}

export function DoDont({ doTitle = 'Faça', dontTitle = 'Não faça', doText, dontText }: { doTitle?: string; dontTitle?: string; doText: ReactNode; dontText: ReactNode }) {
  return (
    <div className="fd-cols">
      <div className="fd-do"><b>✓ {doTitle}</b><p>{doText}</p></div>
      <div className="fd-dont"><b>✕ {dontTitle}</b><p>{dontText}</p></div>
    </div>
  );
}

/** Link para outra página do Storybook (abre no gerenciador, não dentro do quadro da história). */
export function Go({ to, title, children }: { to: string; title: string; children: ReactNode }) {
  return (
    <a className="fd-tile" href={`./index.html?path=/story/${to}`} target="_top">
      <b>{title}</b>
      <span>{children}</span>
    </a>
  );
}

type Box = { key: string; left: number; top: number; width: number; height: number; label: string };

/**
 * Mede o que está renderizado e desenha os espaços por cima (vermelho). `pairs` diz entre quais
 * elementos medir: `[A, B]` pinta o vão entre eles (vertical se um está acima do outro, horizontal se ao lado),
 * e `[A, 'inside']` pinta o preenchimento entre a borda de `A` e os filhos `inner`.
 */
export function Measure({ children, gaps, paddings }: { children: ReactNode; gaps?: [string, string][]; paddings?: { outer: string; inner: string; sides?: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [boxes, setBoxes] = useState<Box[]>([]);
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const measure = () => {
    const base = el.getBoundingClientRect();
    const rect = (sel: string, i = 0) => el.querySelectorAll(sel)[i]?.getBoundingClientRect();
    const pick = (spec: string) => { const [sel, idx] = spec.split('@'); return rect(sel, Number(idx ?? 0)); };
    const out: Box[] = [];
    const add = (key: string, l: number, t: number, w: number, h: number) => {
      const wr = Math.round(w), hr = Math.round(h);
      if (wr > 0 && hr > 0) out.push({ key, left: l - base.left, top: t - base.top, width: w, height: h, label: String(Math.min(wr, hr) === wr ? wr : hr) });
    };
    gaps?.forEach(([a, b], i) => {
      const A = pick(a), B = pick(b);
      if (!A || !B) return;
      if (B.top >= A.bottom - 1) add(`g${i}`, Math.max(A.left, B.left), A.bottom, Math.min(A.right, B.right) - Math.max(A.left, B.left), B.top - A.bottom);
      else add(`g${i}`, A.right, Math.max(A.top, B.top), B.left - A.right, Math.min(A.bottom, B.bottom) - Math.max(A.top, B.top));
    });
    paddings?.forEach(({ outer, inner, sides = 'tblr' }, i) => {
      const O = pick(outer), I = pick(inner);
      if (!O || !I) return;
      if (sides.includes('t')) add(`pt${i}`, O.left, O.top, O.width, I.top - O.top);
      if (sides.includes('b')) add(`pb${i}`, O.left, I.bottom, O.width, O.bottom - I.bottom);
      if (sides.includes('l')) add(`pl${i}`, O.left, I.top, I.left - O.left, I.height);
      if (sides.includes('r')) add(`pr${i}`, I.right, I.top, O.right - I.right, I.height);
    });
    setBoxes(out);
    };
    measure();
    // Imagens e fontes mudam o tamanho depois do primeiro desenho: mede de novo.
    const t = window.setTimeout(measure, 500);
    return () => window.clearTimeout(t);
  }, [gaps, paddings]);
  return (
    <div className="fd-measure" ref={root}>
      {children}
      {boxes.map(b => <span key={b.key} className="fd-m" style={{ left: b.left, top: b.top, width: b.width, height: b.height }}>{b.label}</span>)}
    </div>
  );
}

export function useReplay(ms: number) {
  const [go, setGo] = useState(false);
  const timer = useRef<number>(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const play = () => {
    setGo(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setGo(true);
      timer.current = window.setTimeout(() => setGo(false), ms + 500);
    }, 60);
  };
  return { go, play };
}

