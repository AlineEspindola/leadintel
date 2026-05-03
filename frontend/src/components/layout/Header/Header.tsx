import { ViewMode } from '../../hooks/useViewMode'

interface Props {
  viewMode: ViewMode
  onModeChange: (m: ViewMode) => void
}

const MODES: { id: ViewMode; label: string; desc: string }[] = [
  { id: 'simple',    label: 'Simples',   desc: 'SDR' },
  { id: 'analytic',  label: 'Analítico', desc: 'Head' },
  { id: 'developer', label: 'Dev',       desc: 'API' },
]

export function Header({ viewMode, onModeChange }: Props) {
  return (
    <header className="border-b border-surface-border bg-surface-ghost px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-primary-500 text-xl">⚡</span>
        <div>
          <h1 className="font-display text-lg text-neutral-100 leading-none">LeadIntel</h1>
          <p className="text-xs text-neutral-500">Enriquecimento de Leads B2B</p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-surface-raised border border-surface-border rounded p-0.5">
        {MODES.map(m => (
          <button
            key={m.id}
            onClick={() => onModeChange(m.id)}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all duration-150 ${
              viewMode === m.id
                ? 'bg-primary-500 text-white'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </header>
  )
}
