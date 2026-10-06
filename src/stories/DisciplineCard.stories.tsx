import type { Meta, StoryObj } from '@storybook/react-vite';
import { DisciplineCard } from '../components/organisms/DisciplineCard';
import { disciplines } from '../flows/discipline-data';
import cartaoDoc from '../../docs/componentes/cartao-de-disciplina.md?raw';
import { docBody } from './docBody';

const meta = {
  title: 'Organismos/Cartão de disciplina',
  component: DisciplineCard,
  args: {
    discipline: disciplines[0],
    selected: true,
    onOpen: () => {},
    onToggle: () => {},
  },
  parameters: { layout: 'padded', docs: { description: { component: docBody(cartaoDoc) } } },
} satisfies Meta<typeof DisciplineCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Selecionado: Story = {};
export const NaoSelecionado: Story = { args: { discipline: disciplines[2], selected: false } };
