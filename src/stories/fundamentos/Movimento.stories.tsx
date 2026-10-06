import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../../components/atoms/Button';
import { DoDont, Page, Section, useReplay } from './ui';

const meta = {
  title: 'Fundamentos/Movimento',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const duracoes = [
  { nome: 'Rápida', ms: 120, tk: '--duration-fast', uso: 'Resposta imediata ao toque: cor do botão, troca de aba do seletor e a troca “esmaecer” entre telas.' },
  { nome: 'Média', ms: 240, tk: '--duration-medium', uso: 'Navegar: a tela que desliza, a folha que sobe e desce, a barra que ganha vidro ao rolar.' },
  { nome: 'Lenta', ms: 400, tk: '--duration-slow', uso: 'Momentos para perceber: o carregamento e a entrada da confirmação (o ✓ e as disciplinas novas).' },
];

function Duracao({ nome, ms, tk, uso }: (typeof duracoes)[number]) {
  const { go, play } = useReplay(ms);
  return (
    <div className="fd-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><b>{nome}</b><code>{ms}ms</code></div>
      <div className="fd-track" style={{ marginTop: 16 }}>
        <div className={`fd-ball ${go ? 'is-go' : ''}`} style={{ transitionDuration: `${ms}ms`, transitionTimingFunction: 'var(--ease-standard)', ['--track' as string]: '200px' }} />
      </div>
      <p className="fd-small fd-muted" style={{ marginTop: 12 }}>{uso}</p>
      <div style={{ marginTop: 12 }}><Button size="sm" variant="secondary" onClick={play}>Reproduzir {ms}ms</Button></div>
      <p className="fd-small fd-muted" style={{ marginTop: 8 }}>No código: <code>{tk}</code></p>
    </div>
  );
}

/** Desenha a curva cúbica de Bézier de uma ease: o eixo X é o tempo, o Y é o quanto já andou. */
function Curva({ nome, p, uso }: { nome: string; p: [number, number, number, number]; uso: string }) {
  const S = 160, pt = (x: number, y: number) => `${x * S},${S - y * S}`;
  return (
    <div className="fd-card" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg viewBox={`-8 -40 ${S + 16} ${S + 80}`} width="160" height="200" role="img" aria-label={`Curva ${nome}`} style={{ flex: 'none' }}>
        <rect x="0" y="0" width={S} height={S} fill="none" stroke="var(--color-border-default)" />
        <path d={`M ${pt(0, 0)} C ${pt(p[0], p[1])} ${pt(p[2], p[3])} ${pt(1, 1)}`} fill="none" stroke="var(--color-action-primary-default)" strokeWidth="3" />
      </svg>
      <div style={{ flex: 1, minWidth: 180 }}>
        <p><b>{nome}</b></p>
        <p style={{ marginTop: 4 }}><code>cubic-bezier({p.join(', ')})</code></p>
        <p className="fd-small fd-muted" style={{ marginTop: 8 }}>{uso}</p>
      </div>
    </div>
  );
}

function Direcao() {
  const [key, setKey] = useState(0);
  const [dir, setDir] = useState<'forward' | 'back' | 'fade'>('forward');
  const play = (d: typeof dir) => { setDir(d); setKey(k => k + 1); };
  const anim = dir === 'forward' ? 'screen-forward' : dir === 'back' ? 'screen-back' : 'screen-fade';
  return (
    <div className="fd-cols fd-cols--2">
      <div className="fd-card" style={{ background: 'var(--color-bg-tertiary)', overflow: 'hidden' }}>
        <div key={key} className={key ? anim : ''} style={{ height: 160, borderRadius: 24, background: 'var(--color-bg-secondary)', boxShadow: 'var(--shadow-float)', display: 'grid', placeItems: 'center', fontWeight: 600 }}>
          {dir === 'forward' ? 'Entra pela direita' : dir === 'back' ? 'Volta pela esquerda' : 'Esmaece'}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
          <Button size="sm" variant="secondary" onClick={() => play('forward')}>Avançar (240ms)</Button>
          <Button size="sm" variant="secondary" onClick={() => play('back')}>Voltar (240ms)</Button>
          <Button size="sm" variant="secondary" onClick={() => play('fade')}>Trocar de aba (120ms)</Button>
        </div>
      </div>
      <div className="fd-card">
        <table>
          <tbody>
            <tr><td><b>Avançar</b></td><td>A tela nova entra deslizando da direita (cartão → detalhe, lista → resumo).</td></tr>
            <tr><td><b>Voltar</b></td><td>A anterior volta deslizando da esquerda. Entrou pela direita, sai pela esquerda: é isso que diz que o caminho de volta existe.</td></tr>
            <tr><td><b>Trocar de aba</b></td><td>Esmaece rápido, porque não é um caminho dentro de uma pilha.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      title="Movimento"
      lead="Três durações e duas curvas. O movimento serve para mostrar de onde a tela veio e para onde ela vai; nunca para enfeitar."
      rule="Toda animação usa uma das três durações; se nenhuma serve, a animação está errada, não a escala."
    >
      <Section n={1} title="As três durações" intro="Clique em reproduzir para sentir a diferença.">
        <div className="fd-cols">{duracoes.map(d => <Duracao key={d.nome} {...d} />)}</div>
      </Section>

      <Section n={2} title="As duas curvas" intro="A curva decide a “personalidade” do movimento.">
        <div className="fd-cols">
          <Curva nome="Padrão" p={[0.2, 0.8, 0.2, 1]} uso="Começa rápido e assenta devagar. Para quase tudo: telas, barras, cores." />
          <Curva nome="Mola" p={[0.34, 1.56, 0.64, 1]} uso="Passa um pouco do ponto e volta. Só em confirmações: adicionar uma disciplina e o ✓ final." />
        </div>
      </Section>

      <Section n={3} title="Para onde as telas deslizam" intro="Experimente os três gestos.">
        <Direcao />
      </Section>

      <Section n={4} title="Para quem pede menos movimento" intro="Quem ativa “reduzir movimento” no aparelho recebe as animações praticamente instantâneas e sem repetição: o carregamento não pisca. Nada no produto depende de animação para ser entendido.">
        <DoDont doText="Anime a mudança que a pessoa precisa perceber (a vaga entrou, a tela voltou)." dontText="Animar sem parar (como um objeto flutuando): distrai e some do sistema." />
      </Section>
    </Page>
  ),
};
