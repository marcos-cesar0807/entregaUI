import type { Meta, StoryObj } from '@storybook/react-vite';
import { App } from '../App';

const meta = {
  title: 'Telas/T1 Lista de disciplinas',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Composição de T1 (lista de disciplinas) a partir dos organismos e moléculas do DS: ' +
          '`Campo de busca` + filtros de categoria/período, lista de `Cartão de disciplina` e a barra de ' +
          'seleção fixa. Estados E1 (sem resultados) e E2 (carregamento) usam `Mensagem de sistema`. ' +
          'Rastreio de requisito → tela em `docs/criterios-do-projeto.md`; decisões de composição em `docs/decisoes.md`.',
      },
    },
  },
} satisfies Meta<typeof App>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
