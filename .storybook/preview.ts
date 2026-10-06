import type { Preview } from '@storybook/react-vite';
import '../src/styles/global.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    options: {
      storySort: {
        order: [
          'Fundamentos',
          ['Comece aqui', 'Grid e layout', 'Espaçamento', 'Tipografia', 'Cor', 'Raios e elevação', 'Movimento', 'Camadas de tokens', 'Acessibilidade (avaliação)', 'Design System (avaliação)', 'Tokens'],
          'Átomos', 'Moléculas', 'Organismos', 'Telas', 'Projeto',
        ],
      },
    },
    layout: 'centered',
  },
};

export default preview;
