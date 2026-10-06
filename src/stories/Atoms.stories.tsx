import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../components/atoms/Button';
import { Badge } from '../components/atoms/Badge';
import { Checkbox } from '../components/atoms/Checkbox';
import { Chip } from '../components/atoms/Chip';
import botaoDoc from '../../docs/componentes/botao.md?raw';
import { docBody } from './docBody';

const meta = {
  title: 'Átomos/Botão',
  component: Button,
  args: { children: 'Confirmar matrícula', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['md', 'sm'] },
  },
  parameters: { docs: { description: { component: docBody(botaoDoc) } } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primario: Story = {};
export const Secundario: Story = { args: { variant: 'secondary', children: 'Voltar' } };
export const Terciario: Story = { args: { variant: 'tertiary', children: 'Remover' } };
export const Carregando: Story = { args: { loading: true, children: 'Confirmando' } };
export const Desabilitado: Story = { args: { disabled: true } };

export const OutrosAtomos: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Badge, Chip e Checkbox ainda não têm página própria de 7 seções em `docs/componentes` — ' +
          'são pequenos o suficiente para documentar aqui, junto do Botão.\n\n' +
          '- **Badge**: rótulo de status não interativo (`color/feedback/*`), usado para "Últimas vagas" e "Vagas disponíveis" nos cartões.\n' +
          '- **Chip**: filtro de categoria selecionável (`radius/chip`, `color/action/primary/default` quando selecionado); um por categoria, seleção única.\n' +
          '- **Checkbox**: seleção de disciplina no cartão; alvo de toque mínimo de 48px (`size/touch-target-min`), suporta estado indeterminado.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <Badge status="error">Últimas vagas</Badge>
      <Badge status="success">Vagas disponíveis</Badge>
      <Chip selected>Todos</Chip>
      <Chip>Design</Chip>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox defaultChecked /> Selecionar disciplina
      </label>
    </div>
  ),
};
