import { Button } from '../../ui/Button/Button'

type ErrorType = 'invalid_cnpj' | 'api_failure' | 'inactive_company' | 'not_found'

const ERROR_CONFIG: Record<ErrorType, { icon: string; title: string; description: string; action: string }> = {
  invalid_cnpj:     { icon: '⚠️', title: 'CNPJ não encontrado', description: 'Verifique se os 14 dígitos estão corretos ou tente outro CNPJ.', action: 'Limpar e tentar novamente' },
  api_failure:      { icon: '🔌', title: 'Não foi possível consultar agora', description: 'O serviço de consulta está temporariamente indisponível. Tente novamente em instantes.', action: 'Tentar novamente' },
  inactive_company: { icon: '🚫', title: 'Empresa inativa', description: 'Este CNPJ pertence a uma empresa encerrada ou com situação irregular na Receita Federal.', action: 'Nova consulta' },
  not_found:        { icon: '🔍', title: 'CNPJ não encontrado na Receita Federal', description: 'Não encontramos esse CNPJ. Confira os números e tente de novo.', action: 'Tentar novamente' },
}

interface Props { type: ErrorType; onRetry?: () => void }

export function ErrorState({ type, onRetry }: Props) {
  const cfg = ERROR_CONFIG[type]
  return (
    <div className="flex flex-col items-center gap-4 py-12 text-center max-w-sm mx-auto animate-fade-in">
      <span className="text-5xl">{cfg.icon}</span>
      <div>
        <h3 className="text-heading-md text-neutral-200 mb-1">{cfg.title}</h3>
        <p className="text-sm text-neutral-400">{cfg.description}</p>
      </div>
      {onRetry && <Button intent="ghost" onClick={onRetry}>{cfg.action}</Button>}
    </div>
  )
}
