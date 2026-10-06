import type { Meta, StoryObj } from '@storybook/react-vite';
import { DoDont, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Tipografia',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const degraus = [
  { nome: 'Título de tela', tam: 26, lh: 32, peso: 700, amostra: 'Revise e confirme', uso: 'O título grande de cada tela, o nome da disciplina no detalhe e o número de destaque do prazo (“3 dias”).', tk: '--type-display-h1' },
  { nome: 'Valor de destaque', tam: 22, lh: 28, peso: 700, amostra: '14h', uso: 'Um valor que precisa ser lido de relance: a hora da próxima aula.', tk: '--type-title-h3' },
  { nome: 'Título de seção', tam: 18, lh: 24, peso: 600, amostra: 'Próximas aulas', uso: 'Títulos de seção, de folha e da barra do topo; números de apoio como as estatísticas do professor.', tk: '--type-body-lg' },
  { nome: 'Corpo (base)', tam: 14, lh: 20, peso: 400, amostra: 'Escolha as disciplinas antes que as vagas acabem.', uso: 'Todo o resto: texto corrido, botões, links, busca, chips, mensagens e o nome da disciplina no cartão.', tk: '--type-body' },
  { nome: 'Legenda', tam: 12, lh: 16, peso: 500, amostra: 'Seg/Qua · 8h-12h', uso: 'Informação de apoio: metadados do cartão, selos, horas da agenda, rótulos das abas. É o mínimo do sistema.', tk: '--type-caption' },
];

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Tipografia"
      lead="Cinco tamanhos, nomeados pelo que fazem e não pelo número. A base é 14px; cada degrau para cima soma 4px."
      rule="Texto e botão ficam em 14. Só sobe de tamanho quem é título; só desce quem é apoio, e nunca abaixo de 12."
    >
      <Section n={1} title="Os cinco degraus" intro="Lidos de cima para baixo, do mais importante para o mais discreto. Se você não sabe dizer o uso de cabeça, o degrau está sobrando.">
        <div className="fd-card">
          {degraus.map(d => (
            <div key={d.nome} style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 1fr) minmax(220px, 1.4fr)', gap: 24, alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--color-border-default)' }}>
              <div>
                <div style={{ fontSize: d.tam, lineHeight: `${d.lh}px`, fontWeight: d.peso, letterSpacing: d.tam >= 22 ? '-.02em' : 0 }}>{d.amostra}</div>
              </div>
              <div>
                <p><b>{d.nome}</b> <code>{d.tam} / {d.lh}</code> <span className="fd-small fd-muted">peso {d.peso}</span></p>
                <p className="fd-small fd-muted" style={{ marginTop: 4 }}>{d.uso}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={2} title="A régua de +4" intro="Da base para cima o passo é sempre 4px, por isso os degraus parecem “da mesma família”.">
        <div className="fd-card" style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          {[12, 14, 18, 22, 26].map((t, i) => (
            <div key={t} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: t, lineHeight: 1, fontWeight: 700 }}>Aa</div>
              <b style={{ display: 'block', marginTop: 8 }}>{t}px</b>
              <span className="fd-small fd-muted">{i === 0 ? 'mínimo' : i === 1 ? 'base' : '+4'}</span>
            </div>
          ))}
        </div>
        <p className="fd-muted" style={{ marginTop: 12 }}>O 12 é o único que foge da régua: é o mínimo legível, não um degrau “abaixo da base”.</p>
      </Section>

      <Section n={3} title="Fonte e peso" intro="Usamos a fonte do sistema do aparelho (SF Pro no iPhone e no Mac); Roboto fica de reserva. Nada de baixar fonte nova.">
        <div className="fd-cols">
          <div className="fd-card">
            <p className="fd-label">Pesos usados</p>
            {[[400, 'Regular', 'texto corrido'], [500, 'Médio', 'rótulos, botões, metadados'], [600, 'Seminegrito', 'títulos de cartão e de seção'], [700, 'Negrito', 'títulos de tela e números']].map(([p, n, u]) => (
              <p key={String(p)} style={{ fontWeight: Number(p), marginTop: 12, fontSize: 18, lineHeight: '24px' }}>{n} · {p} <span className="fd-small fd-muted" style={{ fontWeight: 400 }}>{u}</span></p>
            ))}
          </div>
          <div className="fd-card">
            <p className="fd-label">Ajustes finos</p>
            <p style={{ marginTop: 12 }}><b>Títulos grandes</b> levam espaçamento levemente fechado (−0,025em), para não parecerem soltos.</p>
            <p style={{ marginTop: 12 }}><b>Rótulos em caixa-alta</b> (“MATRÍCULA 2026.1”) abrem o espaçamento (+0,06em) e ficam curtos.</p>
            <p style={{ marginTop: 12 }}><b>Números</b> usam algarismos de largura fixa, para as colunas não dançarem.</p>
          </div>
        </div>
      </Section>

      <Section n={4} title="Na prática: um cartão" intro="Os cinco degraus trabalhando juntos, do jeito que aparecem na lista.">
        <div className="fd-card" style={{ background: 'var(--color-bg-primary)' }}>
          <div style={{ maxWidth: 360, padding: 16, borderRadius: 24, background: 'var(--color-bg-secondary)' }}>
            <div className="badge badge--error">Última vaga</div>
            <div style={{ fontSize: 14, lineHeight: '20px', fontWeight: 600, marginTop: 8 }}>Dataviz</div>
            <div style={{ fontSize: 12, lineHeight: '16px', color: 'var(--color-text-secondary)', marginTop: 4 }}>Fábio Assis · Ter/Qui · 10h-12h</div>
          </div>
          <p className="fd-small fd-muted" style={{ marginTop: 12 }}>Selo e metadados em 12; nome em 14 seminegrito. Repare: o título do cartão não sobe para 18, porque a lista é para comparar, e não para destacar uma disciplina.</p>
        </div>
      </Section>

      <Section n={5} title="Faça e não faça">
        <DoDont doText="Hierarquia pelo degrau e pelo peso: título 18 seminegrito, apoio 12 cinza." dontText="Inventar 15, 16 ou 20 “só nesta tela”, ou usar 10px para caber mais coisa." />
      </Section>
    </Page>
  ),
};
