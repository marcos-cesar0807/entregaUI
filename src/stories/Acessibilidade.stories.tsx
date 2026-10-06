import type { Meta, StoryObj } from '@storybook/react-vite';
import acessibilidadeDoc from '../../docs/acessibilidade.md?raw';
import { docBody } from './docBody';

/**
 * Cobre o Item 3 do enunciado (`Atividade_Caso_Marina_FUUXUI_1.pdf`): percurso de teclado, nomes
 * acessíveis e os critérios WCAG citados por número, com a linha de como a tela atende cada um.
 * Conteúdo único em `docs/acessibilidade.md`, reaproveitado aqui via import `?raw`.
 */
const meta = {
  title: 'Fundamentos/Acessibilidade (avaliação)',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Recorte exigido pelo **Item 3** do enunciado: percurso de teclado, nomes acessíveis e os ' +
          'critérios WCAG citados por número, com a linha de como a tela atende cada um.\n\n' +
          docBody(acessibilidadeDoc),
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documento: Story = { render: () => <></> };
