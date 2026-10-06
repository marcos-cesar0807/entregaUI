import type { Meta, StoryObj } from '@storybook/react-vite';
import { SystemMessage } from '../components/molecules/SystemMessage';
import { Button } from '../components/atoms/Button';
import mensagemDoc from '../../docs/componentes/mensagem-de-sistema.md?raw';
import { docBody } from './docBody';

const meta = {
  title: 'Moléculas/Mensagem de sistema',
  component: SystemMessage,
  args: {
    status: 'info',
    title: 'Nenhuma disciplina encontrada',
    children: 'Tente outro termo ou limpe os filtros para ver todas as disciplinas.',
    action: <Button variant="tertiary">Limpar filtros</Button>,
  },
  parameters: { layout: 'padded', docs: { description: { component: docBody(mensagemDoc) } } },
} satisfies Meta<typeof SystemMessage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SemResultados: Story = {};
export const VagaEsgotada: Story = {
  args: {
    status: 'error',
    title: 'A vaga acabou',
    children: 'Volte à lista e escolha outra disciplina disponível.',
    action: <Button variant="tertiary">Voltar à lista</Button>,
  },
};
