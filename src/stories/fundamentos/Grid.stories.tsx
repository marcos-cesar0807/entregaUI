import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { App } from '../../App';
import { DisciplineDetail } from '../../components/organisms/DisciplineDetail';
import { disciplines } from '../../flows/discipline-data';
import { DoDont, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Grid e layout',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const COLS = [1, 2, 3, 4];
const noop = () => {};
const SCREENS = [
  { id: 'home', label: 'Início', note: 'Os dois cartões de “Próximas aulas” ocupam 2 colunas cada, separados pela calha de 16.' },
  { id: 'list', label: 'Disciplinas', note: 'O cartão ocupa as 4 colunas; os cartões ficam 16px um do outro, a mesma medida da calha.' },
  { id: 'detail', label: 'Detalhe', note: 'A faixa de fatos (Vagas, Horário, Dias, Período) tem uma coluna cada, com a divisória no meio da calha.' },
  { id: 'summary', label: 'Resumo', note: 'Cartões das disciplinas nas 4 colunas e 16px entre eles.' },
] as const;
type ScreenId = (typeof SCREENS)[number]['id'];

function Screen({ id }: { id: ScreenId }) {
  if (id === 'detail') return <div className="app-shell"><DisciplineDetail discipline={disciplines[0]} selected={false} draftItems={[]} onBack={noop} onToggleSelect={noop} onOpenTeacher={noop} /></div>;
  if (id === 'summary') return <App key={id} initialScreen="summary" initialSelected={['ucd', 'research']} />;
  return <App key={id} initialScreen={id} />;
}

function Phone() {
  // ?tela=detail abre direto numa tela (usado para tirar os prints da documentação)
  const first = (new URLSearchParams(location.search).get('tela') as ScreenId | null) ?? 'list';
  const [tela, setTela] = useState<ScreenId>(SCREENS.some(x => x.id === first) ? first : 'list');
  const [margins, setMargins] = useState(true);
  const [columns, setColumns] = useState(true);
  const [gutters, setGutters] = useState(true);
  const atual = SCREENS.find(x => x.id === tela)!;
  return (
    <div className="fd-stage">
      <div className="fd-phone" data-grid-phone>
        <Screen id={tela} />
        <div className="fd-guides" aria-hidden="true">
          {margins && (
            <>
              <i className="fd-gm" style={{ left: 0, width: 16 }} /><i className="fd-gm" style={{ right: 0, width: 16 }} />
              <span className="fd-gm-l" style={{ left: 2 }}>16</span><span className="fd-gm-l" style={{ right: 2 }}>16</span>
            </>
          )}
          {/* 4 colunas de 80,5px e 3 calhas de 16px: (370 − 3 × 16) ÷ 4 = 80,5 */}
          <div className="fd-gcols">
            {COLS.map(n => (
              <span key={n} style={{ display: 'contents' }}>
                <i className={columns ? 'fd-gcol' : ''}>{columns && <b>{n}</b>}</i>
                {n < 4 && <i className={gutters ? 'fd-ggut' : ''}>{gutters && <b>16</b>}</i>}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="fd-legend">
        <div className="fd-toggles" role="group" aria-label="Tela mostrada">
          {SCREENS.map(x => <button key={x.id} type="button" className="fd-tab" aria-pressed={tela === x.id} onClick={() => setTela(x.id)}>{x.label}</button>)}
        </div>
        <div className="fd-toggles">
          <label className="fd-toggle"><input type="checkbox" checked={margins} onChange={e => setMargins(e.target.checked)} /> <span className="fd-sw fd-sw--m" />Margens</label>
          <label className="fd-toggle"><input type="checkbox" checked={columns} onChange={e => setColumns(e.target.checked)} /> <span className="fd-sw fd-sw--c" />Colunas</label>
          <label className="fd-toggle"><input type="checkbox" checked={gutters} onChange={e => setGutters(e.target.checked)} /> <span className="fd-sw fd-sw--g" />Calha</label>
        </div>
        <div className="fd-card">
          <p className="fd-label">Mobile · 360–599px</p>
          <table>
            <tbody>
              <tr><td>Largura da tela</td><td><b>402px</b></td></tr>
              <tr><td>Colunas</td><td><b>4</b> de <b>80,5px</b></td></tr>
              <tr><td>Margem</td><td><b>16px</b> de cada lado</td></tr>
              <tr><td>Calha</td><td><b>16px</b> entre colunas</td></tr>
              <tr><td>Conteúdo útil</td><td><b>370px</b> (402 − 16 − 16)</td></tr>
            </tbody>
          </table>
          <p className="fd-muted" style={{ marginTop: 12 }}>370 − 3 × 16 = 322, e 322 ÷ 4 = 80,5. Margem e calha valem o mesmo (<b>space/16</b>), então o espaço entre colunas é o mesmo espaço entre cartões.</p>
        </div>
        <p className="fd-muted"><b>{atual.label}:</b> {atual.note} Este é o app de verdade, com a grade desenhada por cima. A arte e o texto dentro do cartão também se separam pela calha de 16.</p>
      </div>
    </div>
  );
}

const layers = [
  { z: 'Folha (bottom sheet)', d: 'Sobe de baixo, escurece o fundo e prende o foco. Cantos de cima a 24px.', c: 'var(--color-bg-secondary)', fg: '' },
  { z: 'Aviso (toast)', d: 'Fica acima das barras de baixo e nunca cobre o botão principal.', c: 'var(--color-bg-inverse)', fg: 'var(--color-text-inverse)' },
  { z: 'Barra de ação e barra de abas', d: 'Flutuam no rodapé, 16px da borda de baixo. A barra de abas encolhe a 80% ao rolar.', c: 'var(--glass-bg)', fg: '' },
  { z: 'Barra do topo', d: '64px de altura. Botões sempre; vidro e título pequeno só depois de rolar.', c: 'var(--glass-bg)', fg: '' },
  { z: 'Conteúdo da tela', d: 'Começa 64px abaixo do topo e deixa reserva no fim para as barras não cobrirem o último item.', c: 'var(--color-bg-primary)', fg: '' },
];

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Grid e layout"
      lead="Uma tela de celular com margens iguais, quatro colunas e poucas camadas. É o esqueleto sobre o qual todo o resto se apoia."
      rule="Desenhe sempre em 402px de largura, com 16px de margem e 4 colunas de 80,5px separadas por 16px; a versão larga só centraliza essa mesma tela."
    >
      <Section n={1} title="A tela de celular" intro="A Marina só tem celular, então esta tela é o produto. Ligue e desligue as margens, as colunas e a calha para ver o esqueleto por baixo.">
        <Phone />
      </Section>

      <Section n={2} title="As camadas da tela" intro="De baixo para cima. Quem está em cima nunca esconde a ação principal de quem está embaixo.">
        <div className="fd-card" style={{ display: 'grid', gap: 8 }}>
          {layers.map((l, i) => (
            <div key={l.z} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'center', marginLeft: (layers.length - 1 - i) * 0 }}>
              <span className="fd-num">{layers.length - i}</span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 12, borderRadius: 24, background: l.c, boxShadow: 'inset 0 0 0 1px var(--color-border-default)' }}>
                <b style={{ flex: 'none', width: 200, color: l.fg || undefined }}>{l.z}</b><span style={{ color: l.fg || 'var(--color-text-secondary)' }}>{l.d}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={3} title="Alvos de toque" intro="Todo controle tem 48px de altura. Dois ficam menores de propósito (chips 36px e seletor 40px) e continuam acima do mínimo de 24px da norma (WCAG 2.5.8).">
        <div className="fd-cols">
          <div className="fd-card" style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            {[[48, 'Botões, busca, abas, +'], [40, 'Seletor'], [36, 'Chips'], [24, 'Mínimo da norma']].map(([s, t]) => (
              <div key={String(t)} style={{ textAlign: 'center' }}>
                <div style={{ width: Number(s), height: Number(s), borderRadius: 8, background: 'var(--color-action-primary-default)', margin: '0 auto 8px', opacity: s === 24 ? 0.4 : 1 }} />
                <b>{s}px</b><div className="fd-small fd-muted" style={{ maxWidth: 96 }}>{t}</div>
              </div>
            ))}
          </div>
          <DoDont doText="Dê 48px de altura a qualquer coisa que se toca com o polegar." dontText="Colocar dois controles pequenos colados: o toque pega o vizinho." />
        </div>
      </Section>

      <Section n={4} title="Quando a tela muda de largura" intro="Duas quebras, e as duas nascem da largura do texto, não do nome de um aparelho.">
        <div className="fd-cols">
          <div className="fd-card">
            <p className="fd-label">Abaixo de 360px</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 12, alignItems: 'stretch', height: 56, borderRadius: 12, overflow: 'hidden', background: 'var(--color-purple-50)' }}>
              <div style={{ background: 'var(--color-purple-200)' }} />
              <div className="fd-muted" style={{ gridColumn: '2 / -1', alignSelf: 'center' }}>texto nas colunas 2 a 4</div>
            </div>
            <p className="fd-muted" style={{ marginTop: 12 }}>É o menor grid Mobile. Em 360px as colunas medem 70px e o texto do cartão (3 colunas menos o +) fica com uns 26 caracteres de título por linha; abaixo disso quebraria demais.</p>
          </div>
          <div className="fd-card">
            <p className="fd-label">A partir de 600px</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12, background: 'var(--color-bg-tertiary)', padding: 12, borderRadius: 8 }}>
              <div style={{ width: 120, height: 96, borderRadius: 24, background: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-float)' }} />
            </div>
            <p className="fd-muted" style={{ marginTop: 12 }}>A coluna de 402px (cerca de 60 caracteres por linha, o limite de leitura confortável) fica centralizada, com cantos de 24 e sombra.</p>
          </div>
        </div>
      </Section>

      <Section n={5} title="O que não fazer">
        <DoDont doText="Alinhar tudo às margens de 16px; imagem de fundo pode sangrar até a borda." dontText="Criar uma grade de 12 colunas ou deixar um elemento fora das margens: o produto tem 4 colunas dentro de uma tela só." />
      </Section>
    </Page>
  ),
};
