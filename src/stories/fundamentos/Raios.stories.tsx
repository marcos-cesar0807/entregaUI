import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../../components/atoms/Badge';
import { Button } from '../../components/atoms/Button';
import { Chip } from '../../components/atoms/Chip';
import { DoDont, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Raios e elevação',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Raios e elevação"
      lead="Cantos bem arredondados e quase nenhuma sombra. O sistema é macio: três raios e um único material translúcido."
      rule="Cartão e folha a 24, peças pequenas a 8, tudo que se toca em forma de pílula; só o que flutua tem sombra."
    >
      <Section n={1} title="Os três raios" intro="Quatro raios já seriam indecisão. Estes três cobrem todos os componentes.">
        <div className="fd-cols">
          {[
            { r: '9999px', n: 'Pílula', v: '9999', u: 'Tudo que se toca: botões, busca, chips, abas, barras flutuantes.', ex: <><Button size="sm">Adicionar</Button><Chip selected>Design</Chip></> },
            { r: '24px', n: 'Grande', v: '24', u: 'Superfícies: cartões, folhas (só os cantos de cima), mensagens, barra fixa do resumo.', ex: <div style={{ width: '100%', height: 64, borderRadius: 24, background: 'var(--color-bg-secondary)', boxShadow: 'inset 0 0 0 1px var(--color-border-default)' }} /> },
            { r: '8px', n: 'Pequeno', v: '8', u: 'Peças dentro de um cartão: a arte, os blocos da agenda, a caixa de seleção, a capa do professor.', ex: <div style={{ display: 'flex', gap: 8 }}><div style={{ width: 56, height: 56, borderRadius: 8, background: 'var(--color-purple-100)' }} /><div style={{ width: 56, height: 32, borderRadius: 8, background: 'var(--color-purple-50)', boxShadow: 'inset 0 0 0 1px var(--color-border-brand)' }} /></div> },
          ].map(x => (
            <div key={x.n} className="fd-card">
              <div style={{ height: 96, borderRadius: x.r, background: 'var(--color-action-primary-default)', display: 'grid', placeItems: 'center', color: '#fff' }}><span className="fd-big" style={{ fontSize: 22 }}>{x.v}</span></div>
              <p style={{ marginTop: 16 }}><b>{x.n}</b> <code>{x.v === '9999' ? 'pílula' : `${x.v}px`}</code></p>
              <p className="fd-small fd-muted" style={{ marginTop: 4 }}>{x.u}</p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>{x.ex}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={2} title="Por que o pequeno é 8 e não 16" intro="A linha da agenda tem 32px de altura. Um bloco de 2 horas tem 32px, e um raio de 16 é metade da altura: o bloco viraria uma pílula, e a pílula é reservada para o que se toca.">
        <div className="fd-cols">
          <div className="fd-card">
            <p className="fd-label">Raio 16 (descartado)</p>
            <div style={{ marginTop: 12, height: 32, borderRadius: 16, background: 'var(--color-purple-50)', boxShadow: 'inset 0 0 0 1px var(--color-border-brand)', display: 'grid', placeItems: 'center' }}>Dataviz</div>
          </div>
          <div className="fd-card">
            <p className="fd-label">Raio 8 (adotado)</p>
            <div style={{ marginTop: 12, height: 32, borderRadius: 8, background: 'var(--color-purple-50)', boxShadow: 'inset 0 0 0 1px var(--color-border-brand)', display: 'grid', placeItems: 'center' }}>Dataviz</div>
          </div>
        </div>
      </Section>

      <Section n={3} title="Elevação: só o que flutua" intro="Cartões ficam planos. Sombra e vidro existem só nas barras que andam por cima do conteúdo.">
        <div className="fd-cols">
          <div className="fd-card" style={{ background: 'linear-gradient(135deg, #7b6bff, #e6a0ff 50%, #ffd9a0)', minHeight: 220, position: 'relative' }}>
            <p className="fd-label" style={{ color: '#fff' }}>Vidro + sombra (barras flutuantes)</p>
            <div style={{ position: 'absolute', left: 24, right: 24, bottom: 24, padding: '16px 24px', borderRadius: 9999, background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', boxShadow: 'var(--shadow-float)', fontWeight: 600 }}>2 disciplinas · 8h</div>
          </div>
          <div className="fd-card">
            <table>
              <tbody>
                <tr><td><b>Plano</b></td><td>Cartões e blocos: sem sombra, só a cor de fundo mais clara que a do fundo da tela.</td></tr>
                <tr><td><b>Flutuante</b></td><td>Barra de abas, barra de resumo e de seleção: <code>0 8px 32px</code> preto a 14%.</td></tr>
                <tr><td><b>Vidro</b></td><td>Branco a 86% com desfoque de 24. É o único material translúcido; 86% é o mínimo que mantém 4,5:1 com conteúdo escuro por baixo.</td></tr>
                <tr><td><b>Folha</b></td><td>Sobe com o fundo escurecido atrás; sem sombra própria.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section n={4} title="Faça e não faça">
        <DoDont doText="Pílula em tudo que é botão; 24 em tudo que é superfície; 8 em tudo que mora dentro da superfície." dontText="Criar um raio de 12 ou 16 “só para este cartão”, ou pôr sombra em cartão da lista." />
        <div style={{ marginTop: 16 }}><Badge status="info">Dica</Badge> <span className="fd-muted">Se duas peças com cantos diferentes se tocam, o menor raio fica dentro do maior.</span></div>
      </Section>
    </Page>
  ),
};
