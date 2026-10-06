import type { ReactNode } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01FreeIcons } from '@hugeicons/core-free-icons';

type Props = { title: string; onBack?: () => void; backLabel?: string; trailing?: ReactNode };

/**
 * Barra de navegação do topo. Em repouso só mostra os botões (o título grande é o <h1> da tela);
 * ao rolar (`data-scrolled` no <html>, ver App) ganha vidro e o título pequeno. O título aqui é decorativo.
 */
export function NavBar({ title, onBack, backLabel = 'Voltar', trailing }: Props) {
  return (
    <div className="nav-bar">
      {onBack ? (
        <button type="button" className="nav-bar__button" onClick={onBack} aria-label={backLabel}>
          <HugeiconsIcon icon={ArrowLeft01FreeIcons} size={22} strokeWidth={2} />
        </button>
      ) : <span />}
      <span className="nav-bar__title" aria-hidden="true">{title}</span>
      <span className="nav-bar__end">{trailing}</span>
    </div>
  );
}
