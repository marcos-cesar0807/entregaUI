import type { Meta, StoryObj } from '@storybook/react-vite';
import { App } from '../App';

const meta = {
  title: 'Projeto/Introdução',
  component: App,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Não é um componente do Design System — é o protótipo inteiro (`src/App.tsx`), o mesmo que ' +
          '`npm run dev` serve em `http://localhost:5173`. Existe aqui para navegar o fluxo completo sem ' +
          'sair do Storybook. Os componentes reais estão documentados em Átomos/Moléculas/Organismos; ' +
          'os tokens em Fundamentos/Tokens; critérios e decisões em `docs/`.',
      },
    },
  },
} satisfies Meta<typeof App>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EstruturaInicial: Story = {};
