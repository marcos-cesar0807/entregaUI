import type { Meta, StoryObj } from '@storybook/react-vite';
import { DisciplineCard } from '../../components/organisms/DisciplineCard';
import { disciplines } from '../../flows/discipline-data';
import { DoDont, Measure, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Espaçamento',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const escala: [number, string, string][] = [
  [4, 'Micro', 'Entre duas partes da mesma informação: selo e título, as linhas de metadados do cartão.'],
  [8, 'Próximo', 'Entre itens do mesmo grupo: chips entre si; o preenchimento do cartão que tem arte.'],
  [12, 'Respiro de bloco', 'Entre peças de um mesmo bloco que precisam respirar: arte e texto no cartão; cartões do resumo.'],
  [16, 'Padrão', 'A margem da tela, o vão entre cartões irmãos e o preenchimento de cartão só de texto.'],
  [24, 'Grupo', 'Entre grupos dentro de uma seção e o preenchimento de superfícies grandes (cartão de prazo, folhas).'],
  [32, 'Seção', 'Entre seções da tela: “Próximas aulas”, “Sua semana”, “Avisos”.'],
  [48, 'Bloco grande', 'Respiro de fim de bloco grande, como a base da arte da tela de confirmação.'],
  [64, 'Reserva do topo', 'O espaço sob a barra do topo, no começo de toda tela.'],
];

const cardPad = [{ outer: '.discipline-card', inner: '.discipline-card__art', sides: 'l' }];
const cardGap: [string, string][] = [['.discipline-card__art', '.discipline-card__body']];
const listGap: [string, string][] = [['.discipline-card@0', '.discipline-card@1']];

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Espaçamento"
      lead="Oito valores, todos múltiplos de 4. Nenhum espaço da tela fica fora desta lista."
      rule="Escolha o espaço pelo papel (micro, próximo, bloco, margem, grupo, seção), não pela aparência; se o número que você quer não está na lista, use o vizinho."
    >
      <Section n={1} title="A escala" intro="Cada barra mostra o valor em tamanho 4× (para o 4 e o 8 aparecerem); o número ao lado é o valor real em px. Do 4 para o 8, do 8 para o 12: o salto é sempre perceptível.">
        <div className="fd-card">
          {escala.map(([v, nome, uso]) => (
            <div key={v} style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: 16, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--color-border-default)' }}>
              <div className="fd-big" style={{ fontSize: 22, lineHeight: '28px' }}>{v}</div>
              <div>
                <div style={{ height: 16, width: v * 4, maxWidth: '100%', background: 'var(--color-action-primary-default)', borderRadius: 4 }} />
                <p style={{ marginTop: 8 }}><b>{nome}.</b> <span className="fd-muted">{uso}</span></p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section n={2} title="Dentro de um cartão" intro="Este é o cartão real de disciplina, medido na hora. Os números em vermelho são os espaços de verdade, lidos do que está na tela. A arte fica centralizada na vertical, por isso só o preenchimento da esquerda é fixo.">
        <div className="fd-cols fd-cols--2">
          <div className="fd-card" style={{ background: 'var(--color-bg-primary)' }}>
            <Measure paddings={cardPad} gaps={cardGap}>
              <div style={{ width: 370 }}>
                <DisciplineCard discipline={disciplines[0]} selected={false} onOpen={() => {}} onToggle={() => {}} />
              </div>
            </Measure>
          </div>
          <div className="fd-card">
            <table>
              <tbody>
                <tr><td><b>8</b></td><td>Preenchimento: a arte fica a 8px da borda do cartão.</td></tr>
                <tr><td><b>12</b></td><td>Vão entre a arte e o texto.</td></tr>
                <tr><td><b>4</b></td><td>Entre as linhas de metadados (professor, horário, vagas).</td></tr>
                <tr><td><b>8</b></td><td>Entre o selo, o título e o bloco de metadados.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section n={3} title="Entre cartões" intro="Dois cartões irmãos ficam sempre a 16px um do outro. Eles são parentes, mas cada um é uma decisão separada.">
        <div className="fd-card" style={{ background: 'var(--color-bg-primary)' }}>
          <Measure gaps={listGap}>
            <div style={{ width: 370, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <DisciplineCard discipline={disciplines[0]} selected={false} onOpen={() => {}} onToggle={() => {}} />
              <DisciplineCard discipline={disciplines[1]} selected={false} onOpen={() => {}} onToggle={() => {}} />
            </div>
          </Measure>
        </div>
      </Section>

      <Section n={4} title="O ritmo vertical de uma tela" intro="Quanto mais separado é o assunto, maior o espaço.">
        <div className="fd-card" style={{ background: 'var(--color-bg-primary)' }}>
          <div style={{ width: 330 }}>
            {([['Título da tela', 0, ''], ['', 12, 'título de seção ↔ conteúdo'], ['Cartão', 0, ''], ['', 16, 'entre cartões'], ['Cartão', 0, ''], ['', 32, 'entre seções'], ['Título da próxima seção', 0, '']] as [string, number, string][]).map(([t, g, d], i) => (
              g === 0
                ? <div key={i} style={{ padding: '12px 16px', borderRadius: 24, background: 'var(--color-bg-secondary)', boxShadow: 'inset 0 0 0 1px var(--color-border-default)' }}>{t}</div>
                : <div key={i} style={{ position: 'relative', height: g, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, #d4380d 22%, transparent)', outline: '1px dashed #d4380d', color: '#d4380d', fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
                  {g}
                  <span style={{ position: 'absolute', left: 'calc(100% + 16px)', top: '50%', transform: 'translateY(-50%)', whiteSpace: 'nowrap', color: 'var(--color-text-secondary)', fontWeight: 500, fontSize: 14 }}>{d}</span>
                </div>
            ))}
          </div>
        </div>
      </Section>

      <Section n={5} title="Faça e não faça">
        <DoDont doText="Precisa de “uns 10px”? Use 8 se o assunto é o mesmo, 12 se precisa respirar." dontText="Digitar 10, 14, 20 ou 40. O Figma até exporta um 40, mas a escala do projeto não o inclui." />
      </Section>
    </Page>
  ),
};
