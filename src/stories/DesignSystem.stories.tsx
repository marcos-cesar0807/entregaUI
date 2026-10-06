import type { Meta, StoryObj } from '@storybook/react-vite';
import designSystemDoc from '../../docs/design-system.md?raw';
import { docBody } from './docBody';

/**
 * Cobre o Item 6 do enunciado (`Atividade_Caso_Marina_FUUXUI_1.pdf`): grid, escalas, rampa de
 * neutros medida, cores de papel com par garantido, tabela de tokens (25–40 linhas, 4 colunas:
 * nome · valor · camada · razão) e os 3 princípios com teste do oposto. Conteúdo único em
 * `docs/design-system.md`, reaproveitado aqui via import `?raw` — addon-docs renderiza o
 * markdown, tabelas incluídas, sem precisar reescrever nada em JSX.
 */
const meta = {
  title: 'Fundamentos/Design System (avaliação)',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Recorte exigido pelo **Item 6** do enunciado: grid, escalas, rampa de neutros medida, ' +
          'cores de papel com par garantido, tabela de tokens (25–40 linhas, 4 colunas) e os 3 ' +
          'princípios com teste do oposto. É o que o professor confere primeiro — o inventário ' +
          'completo das 115 variáveis do Figma está em **Fundamentos/Tokens**.\n\n' +
          docBody(designSystemDoc),
      },
    },
  },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Documento: Story = { render: () => <></> };
