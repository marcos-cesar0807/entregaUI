import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from '../components/atoms/Input';
import { Icon } from '../components/atoms/Icon';

const meta = {
  title: 'Átomos/Input',
  component: Input,
  args: { placeholder: 'Digite aqui', 'aria-label': 'Campo de exemplo' },
  parameters: {
    docs: {
      description: {
        component:
          'Átomo puro: caixa (`div`) + `input` + ícones opcionais nas pontas (`startIcon`, `endIcon`). ' +
          'Não tem rótulo nem mensagem de erro próprios — quem usa precisa dar um nome acessível (`aria-label` ou `<label>`). ' +
          'Hoje é usado só pela molécula `Moléculas/Campo de busca`, que acrescenta lupa, rótulo e erro; ' +
          'a página de 7 seções está lá.',
      },
    },
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Padrao: Story = {};
export const ComIcone: Story = { args: { startIcon: <Icon name="search" size={20} /> } };
export const Preenchido: Story = { args: { defaultValue: 'Cálculo I' } };
export const Desabilitado: Story = { args: { disabled: true } };
export const Invalido: Story = { args: { invalid: true, 'aria-label': 'Campo inválido' } };
