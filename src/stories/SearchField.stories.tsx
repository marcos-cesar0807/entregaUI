import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from '../components/molecules/SearchField';
import campoDeBuscaDoc from '../../docs/componentes/campo-de-busca.md?raw';
import { docBody } from './docBody';

const meta = {
  title: 'Moléculas/Campo de busca',
  component: SearchField,
  args: { placeholder: 'Buscar disciplina...' },
  parameters: { docs: { description: { component: docBody(campoDeBuscaDoc) } } },
} satisfies Meta<typeof SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vazio: Story = {};
export const Preenchido: Story = { args: { defaultValue: 'Cálculo I' } };
export const Desabilitado: Story = { args: { disabled: true } };
export const ComErro: Story = { args: { error: 'Digite um termo para continuar.' } };
