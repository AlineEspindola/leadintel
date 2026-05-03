import { useEffect, useRef } from 'react'
import { useCNPJMask, CNPJState } from '../../../hooks/useCNPJMask'

interface Props {
  onValidCNPJ?: (cnpj: string) => void
  onChange?: (value: string) => void
  loading?: boolean
}

const STATE_CONFIG: Record<CNPJState | 'loading', { border: string; icon: string; message: string }> = {
  idle:       { border: 'border-surface-border', icon: '🏢', message: '' },
  typing:     { border: 'border-primary-400 shadow-glow-primary', icon: '✏️', message: 'Digite todos os 14 dígitos' },
  valid:      { border: 'border-success-500 shadow-glow-success', icon: '✅', message: 'CNPJ válido' },
  invalid:    { border: 'border-error-500', icon: '❌', message: 'CNPJ inválido — verifique os dígitos' },
  loading:    { border: 'border-primary-400 shadow-glow-primary', icon: '⟳', message: 'Consultando empresa...' },
}

export function CNPJInput({ onValidCNPJ, onChange, loading }: Props) {
  const { value, state, onChange: handleChange, clear } = useCNPJMask()
  const prevState = useRef<CNPJState>('idle')

  useEffect(() => {
    onChange?.(value)
    if (state === 'valid' && prevState.current !== 'valid') {
      onValidCNPJ?.(value.replace(/\D/g, ''))
    }
    prevState.current = state
  }, [value, state])

  const displayState = loading ? 'loading' : state
  const cfg = STATE_CONFIG[displayState]

  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">CNPJ da empresa</label>
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder="00.000.000/0000-00"
          maxLength={18}
          disabled={loading}
          className={`w-full bg-surface-raised border rounded text-neutral-100 text-sm px-3 py-2.5 pr-20 outline-none transition-all duration-150 placeholder:text-neutral-500 font-mono
            ${cfg.border} ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
        <span className={`absolute right-9 text-base ${loading ? 'animate-spin' : ''}`}>{cfg.icon}</span>
        {value && !loading && (
          <button onClick={clear} className="absolute right-3 text-neutral-500 hover:text-neutral-200 transition-colors text-xs">✕</button>
        )}
      </div>
      {cfg.message && (
        <p className={`text-xs ${state === 'invalid' ? 'text-error-400' : state === 'valid' ? 'text-success-400' : 'text-neutral-500'}`}>
          {cfg.message}
        </p>
      )}
    </div>
  )
}
