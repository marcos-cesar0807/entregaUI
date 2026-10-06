type Option<T extends string> = { value: T; label: string };

/** Seletor de duas ou três visões da mesma tela (Disponíveis | Minhas matrículas, Dia | Semana). */
export function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: Option<T>[]; value: T; onChange: (value: T) => void }) {
  return (
    <div className="segmented" role="group" aria-label={label}>
      {options.map(option => (
        <button key={option.value} type="button" className="segmented__option" aria-pressed={option.value === value} onClick={() => onChange(option.value)}>
          {option.label}
        </button>
      ))}
    </div>
  );
}
