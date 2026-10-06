import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  open: boolean;
  /** Pedido de fechar (Esc ou toque fora). Quem usa decide e muda `open`. */
  onClose: () => void;
  /** Chamado depois que a folha terminou de descer e o <dialog> fechou. */
  onClosed?: () => void;
  children: ReactNode;
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  role?: 'dialog' | 'alertdialog';
  /** Devolve o foco a quem abriu. Desligue só se for mandar o foco para outro lugar em `onClosed`. */
  restoreFocus?: boolean;
  className?: string;
};

/** Folha que sobe de baixo. Esc, toque fora e o botão secundário fecham; a ação principal vai acima da secundária. */
export function BottomSheet({ open, onClose, onClosed, children, label, labelledBy, describedBy, role, restoreFocus = true, className = '' }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  // Enquanto desce, o conteúdo não pode sumir: guarda o último que estava aberto.
  const content = useRef<ReactNode>(children);
  const [closing, setClosing] = useState(false);
  if (open) content.current = children;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (open) {
      setClosing(false);
      if (!node.open) {
        opener.current = document.activeElement as HTMLElement | null;
        node.showModal();
        // Foco na ação segura (a secundária), não na principal, que costuma ser destrutiva.
        node.querySelector<HTMLElement>('[data-autofocus]')?.focus();
      }
    } else if (node.open) {
      setClosing(true);
    }
  }, [open]);

  const finish = () => {
    const node = ref.current;
    setClosing(false);
    if (node?.open) node.close();
    if (restoreFocus) window.requestAnimationFrame(() => opener.current?.focus());
    onClosed?.();
  };

  // Se a animação não terminar (aba em segundo plano), fecha mesmo assim.
  useEffect(() => {
    if (!closing) return;
    const timeout = window.setTimeout(finish, 600);
    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closing]);

  return (
    <dialog
      ref={ref}
      role={role}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`bottom-sheet ${closing ? 'is-closing' : ''} ${className}`}
      onAnimationEnd={event => {
        if (closing && event.target === event.currentTarget && event.animationName === 'slide-down') finish();
      }}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => {
        // Só conta o toque no próprio <dialog>: fora da caixa é o fundo escurecido. Teclar Enter num botão não passa por aqui.
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
        if (!inside) onClose();
      }}
    >
      {content.current}
    </dialog>
  );
}
