import type { Meta, StoryObj } from '@storybook/react-vite';
import { Go, Page, Section } from './ui';

const meta = {
  title: 'Fundamentos/Comece aqui',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

const numeros: [string, string][] = [
  ['8', 'valores de espaço'], ['5', 'degraus de texto'], ['3', 'raios de borda'], ['3', 'durações'],
  ['2', 'quebras de tela'], ['5', 'cinzas'], ['3', 'cores de papel'], ['38', 'tokens na tabela'],
];

const principios = [
  { n: 'Disponibilidade antes da confirmação', f: 'A quantidade de vagas aparece em cada cartão e no detalhe, e é conferida de novo na hora de confirmar.', o: 'Mostrar as vagas só no resumo, para a lista ficar mais limpa.', p: 'Marina teme perder a vaga enquanto decide; a informação precisa andar junto com a escolha.' },
  { n: 'Ação reversível', f: 'Tudo que a pessoa faz pode ser desfeito: remover tem Desfazer, descartar pede confirmação, fechar não muda nada.', o: 'Cada toque avança direto, sem volta, para ser mais rápido.', p: 'Ela tem pressa e medo de errar; poder voltar atrás deixa comparar sem pagar por isso.' },
  { n: 'Conteúdo essencial no celular', f: 'O cartão mostra nome, professor, horário e vagas na própria lista.', o: 'Deixar professor e horário só no detalhe, para os cartões ficarem menores.', p: 'Comparar na lista evita entrar e sair de cada disciplina.' },
];

export const Guia: Story = {
  name: 'Guia visual',
  render: () => (
    <Page
      kicker="Design system · O caso Marina"
      title="Comece aqui"
      lead="Tudo que um designer precisa para desenhar uma tela nova do app de matrícula sem perguntar para ninguém: o grid, os espaços, as letras, as cores, os cantos e o movimento. Cada página tem a regra em uma frase, o exemplo real e o motivo."
      rule="O sistema é pequeno de propósito: poucos valores, cada um com um uso. Se um valor não está aqui, ele não existe."
    >
      <Section n={1} title="O sistema em números" intro="É o menor conjunto que resolve este produto. Quatro ou cinco valores por escala; nada de “mais ou menos”.">
        <div className="fd-stats">
          {numeros.map(([n, t]) => <div key={t} className="fd-stat"><div className="fd-big">{n}</div><span>{t}</span></div>)}
        </div>
      </Section>

      <Section n={2} title="Para quem é a Marina" intro="Toda decisão aponta para a persona, não para o gosto de ninguém.">
        <div className="fd-card">
          <p><b>Marina, 19 anos, caloura.</b> Faz tudo pelo celular e não tem computador em casa. Já perdeu uma vaga por demorar decidindo. Agora tem pressa e medo de errar.</p>
          <p className="fd-muted" style={{ marginTop: 12 }}>Por isso: <b>celular primeiro</b> (a coluna tem 402px) e o caminho em que <b>a vaga acaba no meio</b> existe no protótipo.</p>
        </div>
      </Section>

      <Section n={3} title="Os três princípios" intro="Cada princípio passa no “teste do oposto”: se ninguém defenderia o contrário, a frase não decide nada. Aqui o contrário é plausível, e por isso a regra serve.">
        <div className="fd-cols">
          {principios.map(p => (
            <div key={p.n} className="fd-principle">
              <h3>{p.n}</h3>
              <p>{p.f}</p>
              <p className="fd-oposto"><b>O oposto plausível:</b> {p.o}</p>
              <p className="fd-small fd-muted"><b>Por que este vence:</b> {p.p}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section n={4} title="Onde ir em seguida" intro="Leia nesta ordem na primeira vez; depois use como consulta.">
        <div className="fd-tiles">
          <Go to="fundamentos-grid-e-layout--guia" title="1 · Grid e layout">A tela de celular, margens, calha, camadas e alvos de toque.</Go>
          <Go to="fundamentos-espaçamento--guia" title="2 · Espaçamento">A escala de 8 valores e quando usar cada um.</Go>
          <Go to="fundamentos-tipografia--guia" title="3 · Tipografia">Os 5 degraus, base de 14 e +4 por degrau.</Go>
          <Go to="fundamentos-cor--guia" title="4 · Cor">Cinzas, ação, erro e sucesso, com o contraste medido.</Go>
          <Go to="fundamentos-raios-e-elevação--guia" title="5 · Raios e elevação">Os três cantos, sombra e vidro.</Go>
          <Go to="fundamentos-movimento--guia" title="6 · Movimento">As três durações e para onde as telas deslizam.</Go>
          <Go to="fundamentos-camadas-de-tokens--guia" title="7 · Camadas de tokens">Primitivo, semântico e componente, e como ler a tabela.</Go>
          <Go to="fundamentos-acessibilidade-avaliação--documento" title="8 · Acessibilidade">Teclado, nomes e os critérios WCAG citados.</Go>
        </div>
      </Section>
    </Page>
  ),
};
