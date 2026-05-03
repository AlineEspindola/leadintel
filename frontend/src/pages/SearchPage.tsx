import { LeadForm } from '../components/domain/LeadForm/LeadForm'
import { CompanyCard } from '../components/domain/CompanyCard/CompanyCard'
import { ErrorState } from '../components/domain/ErrorState/ErrorState'
import { SkeletonLoader } from '../components/ui'
import { useCNPJSearch } from '../hooks/useCNPJSearch'
import { ViewMode } from '../hooks/useViewMode'

interface Props { viewMode: ViewMode }

export function SearchPage({ viewMode }: Props) {
  const { state, result, search, reset } = useCNPJSearch()

  return (
    <main className="max-w-app mx-auto px-8 py-8 flex flex-col gap-8">
      <LeadForm onSubmit={search} loading={state === 'loading'} />

      {state === 'loading' && <SkeletonLoader />}

      {(state === 'success' || state === 'error_inactive') && result && (
        <CompanyCard data={result} viewMode={viewMode} />
      )}

      {state === 'error_invalid' && <ErrorState type="invalid_cnpj" onRetry={reset} />}
      {state === 'error_not_found' && <ErrorState type="not_found" onRetry={reset} />}
      {state === 'error_api' && <ErrorState type="api_failure" onRetry={reset} />}

      {state === 'idle' && (
        <div className="flex flex-col items-center gap-3 py-16 text-center animate-fade-in">
          <span className="text-6xl">⚡</span>
          <h2 className="font-display text-2xl text-neutral-300">Transforme dados em decisões</h2>
          <p className="text-neutral-500 max-w-sm text-sm">
            Digite um CNPJ acima para enriquecer o lead com score de prioridade, segmento de mercado e insights acionáveis.
          </p>
          <div className="flex gap-4 mt-2 text-xs text-neutral-500">
            <span>🔥 Alta prioridade: score 80–100</span>
            <span>⚡ Qualificar: 50–79</span>
            <span>❄️ Baixa: 0–49</span>
          </div>
        </div>
      )}
    </main>
  )
}
