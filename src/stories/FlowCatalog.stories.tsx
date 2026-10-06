import type { Meta, StoryObj } from '@storybook/react-vite';
import { FlowCatalog } from './FlowCatalog';

/**
 * Grade com as 5 telas e os 4 estados do fluxo de matrícula, para navegar tudo em
 * um só lugar — inspirado num visualizador de protótipo usado em outro projeto
 * (linguagem visual e conteúdo próprios daqui, sem qualquer referência ao original).
 * Cada cartão renderiza o componente React real, escalado; clicar abre uma visão
 * grande e interativa com metadados e navegação anterior/próxima.
 */
const meta = {
  title: 'Projeto/Protótipo',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Fluxo: Story = { render: () => <FlowCatalog /> };
