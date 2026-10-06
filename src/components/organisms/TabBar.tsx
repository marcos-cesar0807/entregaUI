import { HugeiconsIcon } from '@hugeicons/react';
import { BookOpen01FreeIcons, Calendar03FreeIcons, Home01FreeIcons } from '@hugeicons/core-free-icons';

export type Tab = 'home' | 'disciplines' | 'agenda';

const tabs = [
  { id: 'home', label: 'Início', icon: Home01FreeIcons },
  { id: 'disciplines', label: 'Disciplinas', icon: BookOpen01FreeIcons },
  { id: 'agenda', label: 'Agenda', icon: Calendar03FreeIcons },
] as const;

/** Navbar flutuante (estilo iOS). Some dentro do fluxo T2–T4 para que voltar/cancelar sejam as únicas saídas. */
export function TabBar({ current, onChange }: { current: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="tab-bar" aria-label="Principal">
      {tabs.map(tab => (
        <button key={tab.id} type="button" className="tab-bar__item" aria-current={tab.id === current ? 'page' : undefined} onClick={() => onChange(tab.id)}>
          <HugeiconsIcon icon={tab.icon} size={22} aria-hidden="true" />
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
