import { useState, useCallback } from 'react'
import { maskCNPJ, validateCNPJ } from '../services/cnpjValidator'

export type CNPJState = 'idle' | 'typing' | 'valid' | 'invalid'

export function useCNPJMask() {
  const [value, setValue] = useState('')
  const [state, setState] = useState<CNPJState>('idle')

  const onChange = useCallback((raw: string) => {
    const masked = maskCNPJ(raw)
    setValue(masked)
    const digits = masked.replace(/\D/g, '')
    if (digits.length === 0) setState('idle')
    else if (digits.length < 14) setState('typing')
    else setState(validateCNPJ(digits) ? 'valid' : 'invalid')
  }, [])

  const clear = useCallback(() => { setValue(''); setState('idle') }, [])

  return { value, state, onChange, clear }
}
