import type { Meta, StoryObj } from '@storybook/react-vite';
import { contrast, DoDont, hex, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Cor',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const fundo = hex('color/gray/50');
const neutros: [string, string, string, string][] = [
  ['color/gray/50', 'Fundo da tela', 'Cinza 50', 'text'],
  ['color/gray/200', 'Borda discreta de cartão e divisória', 'Cinza 200', 'dec'],
  ['color/gray/400', 'Bordas de apoio, só decoração', 'Cinza 400', 'dec'],
  ['color/gray/600', 'Texto secundário (o legível)', 'Cinza 600', 'text'],
  ['color/gray/900', 'Texto principal', 'Cinza 900', 'text'],
];

const papeis = [
  { nome: 'Ação', bg: hex('color/purple/500'), fg: hex('color/white'), tk: 'color/action/primary/default', uso: 'O botão principal, o item selecionado, o foco.', amostra: 'Confirmar matrícula' },
  { nome: 'Erro', bg: hex('color/red/50'), fg: hex('color/red/700'), tk: 'color/feedback/error', uso: 'Vaga esgotada, choque de horário, campo inválido.', amostra: 'A vaga de Dataviz acabou' },
  { nome: 'Sucesso', bg: hex('color/green/50'), fg: hex('color/green/700'), tk: 'color/feedback/success', uso: 'Vaga garantida, sem choque.', amostra: 'Sua vaga está garantida' },
];

const superficies = [
  ['Fundo da tela', 'color/bg/primary', 'var(--color-bg-primary)', 'gray/50'],
  ['Cartão', 'color/bg/secondary', 'var(--color-bg-secondary)', 'branco'],
  ['Superfície alternativa', 'color/bg/tertiary', 'var(--color-bg-tertiary)', 'gray/100'],
  ['Marca suave', 'color/purple/50', 'var(--color-purple-50)', 'purple/50'],
  ['Aviso invertido', 'color/bg/inverse', 'var(--color-bg-inverse)', 'navy/900'],
] as const;

const pass = (r: string, min: number) => Number(r.replace(',', '.')) >= min;

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Cor"
      lead="Poucas cores, todas com função. Cinzas para estrutura, roxo para ação e três cores de papel (ação, erro, sucesso) para dizer o que está acontecendo."
      rule="Cor nunca é a única informação: todo estado de cor vem junto de um texto ou ícone."
    >
      <Section n={1} title="Os cinco cinzas" intro={<>Cada cinza tem o contraste contra o fundo medido ao lado. Para texto o mínimo é <b>4,5</b>; para bordas e controles, <b>3</b>.</>}>
        <div className="fd-cols" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          {neutros.map(([tk, uso, nome, tipo]) => {
            const h = hex(tk), r = contrast(h, fundo), min = tipo === 'text' ? 4.5 : 3;
            const ok = tk === 'color/gray/50' || pass(r, min);
            return (
              <div key={tk} className="fd-swatch">
                <div className="fd-swatch__chip" style={{ background: h, color: lum(h) ? '#fff' : '#000' }}>{tk === 'color/gray/50' ? '1,00' : r}</div>
                <div className="fd-swatch__info">
                  <b>{nome}</b><code>{h}</code>
                  <span className="fd-small fd-muted">{uso}</span>
                  {tk !== 'color/gray/50' && <span className={`fd-pill ${ok ? 'fd-pill--ok' : 'fd-pill--no'}`}>{r}:1 {tipo === 'text' ? (ok ? 'passa no texto' : 'só decoração') : (ok ? 'passa em controle' : 'só decoração')}</span>}
                </div>
              </div>
            );
          })}
        </div>
        <p className="fd-small fd-muted" style={{ marginTop: 12 }}>Cinza 200 e 400 ficam abaixo de 3 e por isso servem só de decoração (a borda leve do cartão). O contorno de controles e campos usa o cinza 500 (3,61:1 contra o fundo), mais forte.</p>
      </Section>

      <Section n={2} title="As três cores de papel" intro="Cada uma tem um par garantido: a cor de fundo, a cor do texto em cima e o contraste medido. Use sempre o par, nunca a cor solta.">
        <div className="fd-cols">
          {papeis.map(p => (
            <div key={p.nome} className="fd-card">
              <p className="fd-label">{p.nome}</p>
              <div style={{ marginTop: 12, padding: '16px 24px', borderRadius: 24, background: p.bg, color: p.fg, fontWeight: 600 }}>{p.amostra}</div>
              <p style={{ marginTop: 12 }}><b>{contrast(p.bg, p.fg)}:1</b> <span className={`fd-pill fd-pill--${pass(contrast(p.bg, p.fg), 4.5) ? 'ok' : 'no'}`}>{pass(contrast(p.bg, p.fg), 4.5) ? 'passa' : 'não passa'}</span></p>
              <p className="fd-small fd-muted" style={{ marginTop: 4 }}>Fundo <code>{p.bg}</code> · texto <code>{p.fg}</code></p>
              <p className="fd-small fd-muted" style={{ marginTop: 8 }}>{p.uso}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n={3} title="Roxo: a cor da ação" intro="Um roxo só, em quatro intensidades. Mais escuro quer dizer “mais perto do toque”.">
        <div className="fd-cols" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
          {[['color/purple/50', 'Suave', 'Item selecionado, selo de marca'], ['color/purple/500', 'Padrão', 'Botão principal'], ['color/purple/600', 'Hover', 'Ponteiro em cima'], ['color/purple/700', 'Pressionado e foco', 'Toque e anel de foco']].map(([tk, n, u]) => (
            <div key={tk} className="fd-swatch">
              <div className="fd-swatch__chip" style={{ background: hex(tk), color: tk.endsWith('50') ? '#2a17a5' : '#fff' }}>{n}</div>
              <div className="fd-swatch__info"><code>{hex(tk)}</code><span className="fd-small fd-muted">{u}</span></div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={4} title="Camadas de superfície" intro="O fundo da tela é um cinza muito claro e os cartões são brancos: a diferença entre eles já separa, sem sombra.">
        <div className="fd-card" style={{ background: 'var(--color-bg-primary)', display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {superficies.map(([n, tk, css, ref]) => (
            <div key={tk} style={{ width: 168 }}>
              <div style={{ height: 72, borderRadius: 24, background: css, boxShadow: 'inset 0 0 0 1px var(--color-border-default)' }} />
              <b style={{ display: 'block', marginTop: 8 }}>{n}</b>
              <span className="fd-small fd-muted">{ref}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section n={5} title="Faça e não faça">
        <DoDont doText="Vaga esgotada: fundo vermelho claro, texto vermelho escuro e a frase “Vaga esgotada”." dontText="Só pintar de vermelho e esperar que a pessoa entenda. Quem não distingue cor perde a informação." />
      </Section>
    </Page>
  ),
};

/** Cor clara precisa de texto escuro. */
function lum(h: string) {
  const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2] < 0.35;
}
