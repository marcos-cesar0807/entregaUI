import type { Meta, StoryObj } from '@storybook/react-vite';
import { hex, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Camadas de tokens',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const cadeias = [
  { titulo: 'Cor da ação', p: ['color/purple/500', hex('color/purple/500'), 'O roxo de marca, em estado bruto.'], s: ['color/action/primary/default', 'aponta para purple/500', 'O papel: “a cor da ação principal”.'], c: ['Botão principal', 'usa action/primary/default', 'O componente só conhece o papel.'], cor: 'var(--color-action-primary-default)' },
  { titulo: 'Texto de erro', p: ['color/red/700', hex('color/red/700'), 'O vermelho escuro.'], s: ['color/feedback/error/text', 'aponta para red/700', 'O papel: “texto de erro legível”.'], c: ['Mensagem de sistema', 'usa feedback/error', 'Fundo e texto vêm sempre em par.'], cor: 'var(--color-feedback-error-text)' },
  { titulo: 'Canto do botão', p: ['radius/full', '9999px', 'O maior raio possível.'], s: ['radius/button', 'aponta para radius/full', 'O papel: “canto de botão”.'], c: ['Botão', 'usa radius/button', 'Se o botão mudar, muda uma linha.'], cor: 'var(--color-bg-tertiary)' },
];

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Camadas de tokens"
      lead="Um token é um valor com nome. O sistema tem três camadas: o valor bruto, o papel que ele cumpre e a peça que o usa. Entender isso é entender a tabela de tokens."
      rule="Troque o valor no primitivo e tudo que depende dele muda junto; troque a decisão no semântico e só os papéis mudam."
    >
      <Section n={1} title="A pirâmide" intro="Muitos primitivos, quase tantos semânticos e pouquíssimos de componente. Pirâmide invertida seria uma lista de exceções.">
        <div className="fd-pyramid">
          <div style={{ width: '38%', background: 'var(--color-gray-900)' }}><div><b>Componente · 4</b><div className="fd-small">raio do botão, da busca, do cartão e da arte</div></div></div>
          <div style={{ width: '70%', background: 'var(--color-purple-600)' }}><div><b>Semântico · 15</b><div className="fd-small">fundo, texto, borda, ação, erro, sucesso, vidro, sombra</div></div></div>
          <div style={{ width: '100%', background: 'var(--color-purple-500)' }}><div><b>Primitivo · 19</b><div className="fd-small">cores brutas, espaços, curvas de movimento</div></div></div>
        </div>
        <p className="fd-small fd-muted" style={{ marginTop: 12, textAlign: 'center' }}>38 tokens na tabela da entrega. O Figma exporta 115 variáveis; as outras ficam no inventário (Fundamentos → Tokens), sem uso ativo.</p>
      </Section>

      <Section n={2} title="Como um valor viaja" intro="Três exemplos, da esquerda (bruto) para a direita (onde a pessoa vê).">
        {cadeias.map(c => (
          <div key={c.titulo} style={{ marginBottom: 24 }}>
            <p className="fd-label" style={{ marginBottom: 8 }}>{c.titulo}</p>
            <div className="fd-chain">
              <div><span className="fd-pill fd-pill--ok" style={{ background: 'var(--color-bg-tertiary)', color: 'inherit' }}>1 · Primitivo</span><div style={{ height: 32, borderRadius: 8, background: c.cor, boxShadow: 'inset 0 0 0 1px var(--color-border-default)' }} /><code>{c.p[0]}</code><b>{c.p[1]}</b><span className="fd-small fd-muted">{c.p[2]}</span></div>
              <i>→</i>
              <div><span className="fd-pill" style={{ background: 'var(--color-purple-50)', color: 'var(--color-purple-800)' }}>2 · Semântico</span><code>{c.s[0]}</code><b>{c.s[1]}</b><span className="fd-small fd-muted">{c.s[2]}</span></div>
              <i>→</i>
              <div><span className="fd-pill" style={{ background: 'var(--color-gray-900)', color: '#fff' }}>3 · Componente</span><b>{c.c[0]}</b><code>{c.c[1]}</code><span className="fd-small fd-muted">{c.c[2]}</span></div>
            </div>
          </div>
        ))}
      </Section>

      <Section n={3} title="Como ler a tabela de tokens" intro="São quatro colunas, e a última é a que mais importa.">
        <div className="fd-card">
          <table>
            <thead><tr><th>Coluna</th><th>O que diz</th><th>Exemplo</th></tr></thead>
            <tbody>
              <tr><td><b>Nome</b></td><td>Como o token se chama, do geral para o específico.</td><td><code>color/action/primary/hover</code></td></tr>
              <tr><td><b>Valor</b></td><td>O que ele vale, ou para qual token ele aponta.</td><td><code>var(--color-purple-600)</code></td></tr>
              <tr><td><b>Camada</b></td><td>Primitiva, semântica ou de componente.</td><td>Semântica</td></tr>
              <tr><td><b>Razão</b></td><td>Por que ele existe. Permite mudar o valor sem quebrar a decisão.</td><td>“Resposta ao ponteiro”</td></tr>
            </tbody>
          </table>
        </div>
        <p className="fd-muted" style={{ marginTop: 12 }}>Regra de ouro: hexadecimal só existe na camada primitiva. Se aparecer uma cor em código fora dela, é valor solto.</p>
      </Section>
    </Page>
  ),
};
