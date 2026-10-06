import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BottomSheet } from '../components/molecules/BottomSheet';
import { Button } from '../components/atoms/Button';
import sheetDoc from '../../docs/componentes/bottom-sheet.md?raw';
import { docBody } from './docBody';

type DemoProps = { title: string; text: string; primary: string; secondary: string; danger?: boolean; alert?: boolean };

function Demo({ title, text, primary, secondary, danger, alert }: DemoProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Abrir bottom sheet</Button>
      <BottomSheet open={open} onClose={() => setOpen(false)} role={alert ? 'alertdialog' : undefined} labelledBy="demo-titulo" describedBy="demo-texto">
        <h2 id="demo-titulo" className="sheet-title">{title}</h2>
        <p id="demo-texto" className="sheet-text">{text}</p>
        <div className="sheet-actions">
          <Button className={danger ? 'button--danger' : undefined} onClick={() => setOpen(false)}>{primary}</Button>
          <Button variant="tertiary" onClick={() => setOpen(false)} data-autofocus>{secondary}</Button>
        </div>
      </BottomSheet>
    </>
  );
}

const meta = {
  title: 'Moléculas/Bottom sheet',
  component: BottomSheet,
  args: { open: false, onClose: () => {}, children: null },
  parameters: { layout: 'padded', docs: { description: { component: docBody(sheetDoc) } } },
} satisfies Meta<typeof BottomSheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmacao: Story = {
  render: () => <Demo title="Remover disciplina?" text="Dataviz sai da sua matrícula e volta para a lista de disciplinas. Você pode escolher ela de novo depois." primary="Remover disciplina" secondary="Manter disciplina" danger />,
};
export const Aviso: Story = {
  render: () => <Demo alert title="A vaga de Dataviz acabou" text="Outra pessoa confirmou a última vaga enquanto você decidia. Nada foi alterado na sua matrícula." primary="Remover Dataviz" secondary="Fechar" />,
};
