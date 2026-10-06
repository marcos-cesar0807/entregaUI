import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../styles/figma-tokens.json';

const meta = {
  title: 'Fundamentos/Tokens',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'As variáveis exportadas do Figma (`DS-Marcos`) — cor, tipografia, espaçamento, raio e ' +
          'dimensionamento — com descrição de uso de cada uma. Ver a story **Documentacao** para a tabela ' +
          'completa; as demais stories desta seção são vitrines visuais por categoria.',
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

type Token = { name: string; type: string; value: string; layer: string };
const all = tokens as Token[];

/**
 * Descrição por token. Cobre as 115 variáveis exportadas do Figma (`DS-Marcos`),
 * não só o recorte de 33 usado na entrega. Quando o Figma já explica o papel do
 * token pelo próprio nome, a descrição é objetiva; famílias inteiras (escalas de
 * cor primitiva) recebem a mesma explicação de uso.
 */
const DESCRIPTIONS: Record<string, string> = {
  'color/purple/50': 'Roxo de marca, degrau mais claro. Fundo de destaque suave (ex.: badge de marca).',
  'color/purple/100': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/purple/200': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/purple/300': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/purple/400': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/purple/500': 'Roxo de marca, tom principal. Ação primária e foco de seleção.',
  'color/purple/600': 'Roxo de marca, escurecido. Estado hover da ação primária.',
  'color/purple/700': 'Roxo de marca, mais escuro. Estado pressed, texto de marca sobre fundo claro e anel de foco.',
  'color/purple/800': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/purple/900': 'Roxo de marca. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/navy/50': 'Azul-marinho neutro. Degrau de apoio do Figma, sem uso ativo (a interface usa a escala gray para neutros).',
  'color/navy/900': 'Azul-marinho escuro. Usado como texto primário e fundo invertido via tokens semânticos.',
  'color/gray/50': 'Cinza mais claro da escala. Fundo padrão da tela.',
  'color/gray/100': 'Cinza claro. Superfície neutra alternativa (fundo terciário, hover de botão secundário).',
  'color/gray/200': 'Cinza claro. Borda discreta padrão de cartões e divisores.',
  'color/gray/300': 'Cinza claro-médio. Texto e ação desabilitados.',
  'color/gray/400': 'Cinza médio. Borda forte de controles (checkbox, foco de input).',
  'color/gray/500': 'Cinza médio. Valor original do Figma para texto secundário — mede 3,61:1 sobre o fundo, abaixo de WCAG 1.4.3; substituído por gray/600 na interface.',
  'color/gray/600': 'Cinza médio-escuro. Texto secundário ativo (ajuste de contraste, 7,06:1 sobre o fundo).',
  'color/gray/700': 'Cinza escuro. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/gray/800': 'Cinza escuro. Degrau de apoio, sem uso ativo na interface hoje.',
  'color/gray/900': 'Cinza mais escuro. Texto de maior contraste.',
  'color/green/50': 'Verde de sucesso, fundo. Mensagens e badges de confirmação/vagas disponíveis.',
  'color/green/500': 'Verde de sucesso, tom principal. Borda de feedback positivo.',
  'color/green/700': 'Verde de sucesso, escuro. Texto legível sobre o fundo verde/50.',
  'color/amber/50': 'Âmbar de alerta, fundo. Mensagens de atenção (ex.: últimas vagas).',
  'color/amber/500': 'Âmbar de alerta, tom principal. Borda de feedback de atenção.',
  'color/amber/700': 'Âmbar de alerta, escuro. Texto legível sobre o fundo âmbar/50.',
  'color/red/50': 'Vermelho de erro, fundo. Mensagens de erro e validação.',
  'color/red/500': 'Vermelho de erro, tom principal. Borda de campo inválido.',
  'color/red/700': 'Vermelho de erro, escuro. Texto legível sobre o fundo vermelho/50.',
  'color/blue/50': 'Azul de informação, fundo. Mensagens neutras/informativas.',
  'color/blue/500': 'Azul de informação, tom principal. Borda de feedback informativo.',
  'color/blue/700': 'Azul de informação, escuro. Texto legível sobre o fundo azul/50.',
  'color/white': 'Branco puro. Superfície de cartões e texto sobre fundos escuros/de marca.',
  'color/black': 'Preto puro. Reservado para elementos de UI do dispositivo simulado (status bar); a interface usa a escala navy/gray para texto.',
  'color/bg/primary': 'Fundo da tela (aponta para gray/50).',
  'color/bg/secondary': 'Fundo de cartões e superfícies elevadas (aponta para white).',
  'color/bg/tertiary': 'Fundo neutro alternativo, ex.: hover de botão secundário (aponta para gray/100).',
  'color/bg/inverse': 'Fundo invertido para conteúdo sobre fundo escuro (aponta para navy/900).',
  'color/bg/brand': 'Fundo de marca, ex.: chip selecionado (aponta para purple/500).',
  'color/text/primary': 'Texto de leitura principal (aponta para navy/900).',
  'color/text/secondary': 'Texto de apoio; a interface substitui o alias do Figma por gray/600 para atingir contraste WCAG.',
  'color/text/disabled': 'Texto de controles desabilitados (aponta para gray/300).',
  'color/text/inverse': 'Texto sobre fundo de marca ou invertido (aponta para white).',
  'color/text/brand': 'Texto na cor da marca, ex.: botão terciário (aponta para purple/500).',
  'color/border/default': 'Borda discreta padrão de cartões e inputs (aponta para gray/200).',
  'color/border/strong': 'Borda de maior contraste para controles, ex.: checkbox (aponta para gray/400).',
  'color/border/brand': 'Borda de seleção/foco na cor da marca (aponta para purple/500).',
  'color/action/primary/default': 'Fundo do botão/ação primária no estado padrão (aponta para purple/500).',
  'color/action/primary/hover': 'Fundo da ação primária ao passar o mouse (aponta para purple/600).',
  'color/action/primary/pressed': 'Fundo da ação primária pressionada/selecionada (aponta para purple/700).',
  'color/action/primary/disabled': 'Fundo da ação primária desabilitada (aponta para gray/200).',
  'color/feedback/success/bg': 'Fundo de feedback de sucesso (aponta para green/50).',
  'color/feedback/success/text': 'Texto de feedback de sucesso (aponta para green/700).',
  'color/feedback/success/border': 'Borda de feedback de sucesso (aponta para green/500).',
  'color/feedback/warning/bg': 'Fundo de feedback de atenção (aponta para amber/50).',
  'color/feedback/warning/text': 'Texto de feedback de atenção (aponta para amber/700).',
  'color/feedback/warning/border': 'Borda de feedback de atenção (aponta para amber/500).',
  'color/feedback/error/bg': 'Fundo de feedback de erro (aponta para red/50).',
  'color/feedback/error/text': 'Texto de feedback de erro (aponta para red/700).',
  'color/feedback/error/border': 'Borda de feedback de erro (aponta para red/500).',
  'color/feedback/info/bg': 'Fundo de feedback informativo (aponta para blue/50).',
  'color/feedback/info/text': 'Texto de feedback informativo (aponta para blue/700).',
  'color/feedback/info/border': 'Borda de feedback informativo (aponta para blue/500).',
  'color/feedback/color/feedback/brand': 'Fundo do badge de marca (aponta para purple/50). Nome duplicado herdado do Figma (feedback/color/feedback/brand).',
  'color/feedback/color/feedback/text': 'Texto do badge de marca (aponta para purple/700). Nome duplicado herdado do Figma.',
  'color/feedback/color/feedback/border': 'Borda do badge de marca (aponta para purple/500). Nome duplicado herdado do Figma.',
  'type/caption/font-size': 'Legenda: metadados de cartão (professor, horário, vagas).',
  'type/caption/line-height': 'Altura de linha da legenda.',
  'type/body-sm/font-size': 'Corpo pequeno: exportado do Figma, sem uso ativo na interface hoje.',
  'type/body-sm/line-height': 'Altura de linha do corpo pequeno.',
  'type/body/font-size': 'Corpo: texto padrão de parágrafos e mensagens do sistema.',
  'type/body/line-height': 'Altura de linha do corpo.',
  'type/body-lg/font-size': 'Corpo destacado: nome da disciplina no cartão, valores de resumo.',
  'type/body-lg/line-height': 'Altura de linha do corpo destacado.',
  'type/title-sm-h4/font-size': 'Título pequeno (h4): exportado do Figma, sem uso ativo na interface hoje.',
  'type/title-sm-h4/line-height': 'Altura de linha do título pequeno.',
  'type/title-h3/font-size': 'Título de seção (h3): título do diálogo de detalhe.',
  'type/title-h3/line-height': 'Altura de linha do título de seção.',
  'type/title-lg-h2/font-size': 'Título grande (h2): título da tela (\"Disciplinas disponíveis\").',
  'type/title-lg-h2/line-height': 'Altura de linha do título grande.',
  'type/display-h1/font-size': 'Display (h1): exportado do Figma, sem uso ativo na interface hoje.',
  'type/display-h1/line-height': 'Altura de linha do display.',
  'space/4': 'Menor respiro: espaço entre ícone e texto em metadados.',
  'space/8': 'Respiro padrão entre itens próximos (ex.: itens de uma lista).',
  'space/12': 'Respiro dentro de um bloco e padding de inputs. A calha do grid é space/16.',
  'space/16': 'Margem lateral da tela e padding padrão de seções.',
  'space/24': 'Separação entre seções e padding de diálogos.',
  'space/32': 'Respiro maior, ex.: margem da tela em telas largas.',
  'space/40': 'Exportado do Figma, não usado — a escala ativa não inclui 40 (ver docs/design-system.md).',
  'space/64': 'Respiro amplo, uso pontual em layouts espaçosos.',
  'radius/none': 'Sem arredondamento. Base para overrides pontuais.',
  'radius/xs': 'Arredondamento mínimo: caixa de seleção do checkbox.',
  'radius/sm': 'Arredondamento pequeno: blocos da agenda, eventos do calendário, caixa de seleção e capa do professor.',
  'radius/md': 'Arredondamento médio: exportado do Figma, sem uso ativo na interface hoje.',
  'radius/lg': 'Arredondamento grande: exportado do Figma, sem uso ativo na interface hoje (o 16 virou 8 na decisão 24).',
  'radius/xl': 'Arredondamento grande: cartões, diálogos e superfícies elevadas.',
  'radius/2xl': 'Arredondamento maior: exportado do Figma, sem uso ativo na interface hoje.',
  'radius/full': 'Arredondamento total: botões, inputs, chips e avatares (controles redondos).',
  'radius/button': 'Alias semântico de botão (aponta para radius/full).',
  'radius/input': 'Alias semântico de campo de busca (aponta para radius/full).',
  'radius/chip': 'Alias semântico de chip/badge (aponta para radius/full).',
  'radius/avatar': 'Alias semântico de avatar (aponta para radius/full).',
  'radius/card': 'Alias semântico de cartões e diálogos (aponta para radius/xl).',
  'radius/modal': 'Alias semântico de modal/diálogo (aponta para radius/xl).',
  'size/touch-target-min': 'Área de toque mínima (48px) para alvos interativos, incluindo checkbox e botões.',
};

function describe(t: Token) {
  return DESCRIPTIONS[t.name] ?? '—';
}

function Table({ rows }: { rows: Token[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-border-default text-left">
          <th className="py-2 pr-4">Token</th>
          <th className="py-2 pr-4">Valor</th>
          <th className="py-2 pr-4">Amostra</th>
          <th className="py-2">Descrição</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.name} className="border-b border-border-default align-top">
            <td className="py-2 pr-4 font-mono text-xs whitespace-nowrap">{t.name}</td>
            <td className="py-2 pr-4 font-mono text-xs whitespace-nowrap">{t.value}</td>
            <td className="py-2 pr-4">
              {t.type === 'COLOR' && (
                <span
                  className="inline-block h-5 w-8 rounded-xs border border-border-default align-middle"
                  style={{ background: t.value.startsWith('var(') ? t.value : t.value }}
                />
              )}
              {t.name.startsWith('type/') && t.name.endsWith('font-size') && (
                <span style={{ fontSize: t.value }}>Aa</span>
              )}
              {t.name.startsWith('radius/') && (
                <span
                  className="inline-block h-6 w-8 bg-bg-tertiary border border-border-default align-middle"
                  style={{ borderRadius: t.value.startsWith('var(') ? t.value : t.value }}
                />
              )}
            </td>
            <td className="py-2 text-text-secondary">{describe(t)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Section({ title, layer }: { title: string; layer: string }) {
  return (
    <section className="mb-10">
      <h2 className="text-title-h3 font-semibold mb-3">{title}</h2>
      <Table rows={all.filter((t) => t.layer === layer)} />
    </section>
  );
}

export const Documentacao: Story = {
  render: () => (
    <div>
      <p className="text-body text-text-secondary mb-8 max-w-[640px]">
        As 115 variáveis locais exportadas do Figma (<code>DS-Marcos</code>), incluindo
        as que não compõem a escala ativa da entrega (ver <code>docs/design-system.md</code>{' '}
        para o recorte de 33 tokens explicado ao critério da disciplina). Valores literais
        vêm de <code>src/styles/figma-tokens.json</code>; a camada Tailwind está em{' '}
        <code>src/styles/tailwind-theme.css</code>.
      </p>
      <Section title="Cor" layer="Primitivos de cor" />
      <Section title="Cor semântica" layer="Semânticos de cor" />
      <Section title="Tipografia" layer="Tipografia" />
      <Section title="Espaçamento" layer="Espaçamento" />
      <Section title="Raio — primitivo" layer="Raios primitivos" />
      <Section title="Raio — semântico" layer="Raios semânticos" />
      <Section title="Dimensionamento" layer="Dimensionamento" />
    </div>
  ),
};

export const CoresEFeedback: Story = {
  render: () => (
    <div className="grid gap-6">
      {[
        { titulo: 'Marca (purple)', prefixo: 'color/purple/' },
        { titulo: 'Neutros (gray)', prefixo: 'color/gray/' },
      ].map((grupo) => (
        <div key={grupo.titulo}>
          <h3 className="text-title-sm-h4 font-semibold mb-2">{grupo.titulo}</h3>
          <div className="flex gap-3 flex-wrap">
            {all
              .filter((t) => t.name.startsWith(grupo.prefixo))
              .map((t) => (
                <div key={t.name} className="text-center w-24">
                  <div className="h-12 rounded-sm border border-border-default" style={{ background: t.value }} />
                  <div className="text-xs mt-1">{t.name.split('/').slice(1).join('/')}</div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Tipografia: Story = {
  render: () => (
    <div className="grid gap-3">
      {['caption', 'body-sm', 'body', 'body-lg', 'title-sm-h4', 'title-h3', 'title-lg-h2', 'display-h1'].map(
        (nome) => {
          const size = all.find((t) => t.name === `type/${nome}/font-size`)!.value;
          const lineHeight = all.find((t) => t.name === `type/${nome}/line-height`)!.value;
          return (
            <div key={nome} className="flex gap-4 items-baseline">
              <span style={{ fontSize: size, lineHeight }} className="font-sans">
                {nome}
              </span>
              <code className="text-xs text-text-secondary">
                {size} / {lineHeight}
              </code>
            </div>
          );
        },
      )}
    </div>
  ),
};

export const Espacamento: Story = {
  render: () => (
    <div className="grid gap-2">
      {all
        .filter((t) => t.layer === 'Espaçamento')
        .map((t) => (
          <div key={t.name} className="flex items-center gap-3">
            <div className="h-4 bg-action-primary-default" style={{ width: t.value }} />
            <code>
              {t.name} — {t.value}
            </code>
          </div>
        ))}
    </div>
  ),
};

export const Raios: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      {all
        .filter((t) => t.layer === 'Raios primitivos' || t.layer === 'Raios semânticos')
        .map((t) => (
          <div key={t.name} className="text-center">
            <div
              className="w-16 h-16 bg-bg-tertiary border border-border-default"
              style={{ borderRadius: t.value }}
            />
            <div className="text-xs mt-1 max-w-24">{t.name}</div>
          </div>
        ))}
    </div>
  ),
};
