import { CompanyResponseDTO } from '../../../types'
import { ViewMode } from '../../../hooks/useViewMode'
import { ScoreIndicator } from '../ScoreIndicator/ScoreIndicator'
import { SegmentBadge } from '../SegmentBadge/SegmentBadge'
import { InsightBlock } from '../InsightBlock/InsightBlock'
import { Badge } from '../../ui'

interface Props { data: CompanyResponseDTO; viewMode: ViewMode }

function MetaRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-surface-border last:border-0">
      <span className="text-sm shrink-0">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-neutral-500 uppercase tracking-wide">{label}</span>
        <span className="text-sm text-neutral-200 truncate">{value || '—'}</span>
      </div>
    </div>
  )
}

export function CompanyCard({ data, viewMode }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up">

      {/* Column 1 — Score */}
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col items-center">
        <ScoreIndicator score={data.score} temperature={data.scoreTemperature} />
        <div className="w-full border-t border-surface-border pt-4 mt-2 flex flex-col items-center gap-2">
          <Badge variant={data.isActive ? 'success' : 'error'}>
            {data.isActive ? '✅ ATIVA' : '🚫 ' + data.status}
          </Badge>
          <SegmentBadge segment={data.segment} />
        </div>
      </div>

      {/* Column 2 — Company Info */}
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col gap-4">
        <div>
          <h2 className="font-display text-xl text-neutral-100 leading-tight">
            {data.fantasyName || data.legalName}
          </h2>
          {data.fantasyName && data.fantasyName !== data.legalName && (
            <p className="text-xs text-neutral-500 mt-0.5">{data.legalName}</p>
          )}
        </div>

        <div>
          <MetaRow icon="📍" label="Localização" value={`${data.city}, ${data.state}`} />
          <MetaRow icon="🏢" label="Porte" value={data.size} />
          <MetaRow icon="📅" label="Fundada" value={data.openedAt} />
          <MetaRow icon="📞" label="Telefone" value={data.phone || '—'} />
          <MetaRow icon="👤" label="Sócio principal" value={`${data.mainPartnerName} — ${data.mainPartnerRole}`} />
        </div>

        {viewMode !== 'simple' && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Dados técnicos</p>
            <MetaRow icon="🔢" label="CNPJ" value={data.cnpj} />
            <MetaRow icon="📋" label="Natureza jurídica" value={data.legalNature} />
            <MetaRow icon="🗺" label="Endereço" value={`${data.address}, ${data.neighborhood}`} />
            <MetaRow icon="📮" label="CEP" value={data.zipCode} />
          </div>
        )}

        {viewMode !== 'simple' && data.secondaryCNAEs.length > 0 && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">CNAEs secundários</p>
            <div className="flex flex-col gap-1">
              {data.secondaryCNAEs.slice(0, 3).map(c => (
                <p key={c.code} className="text-xs text-neutral-400">
                  <span className="font-mono text-neutral-500">{c.code}</span> — {c.description}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Column 3 — Insights + Dev */}
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col gap-4">
        <InsightBlock insights={data.insights} />

        {viewMode === 'developer' && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Raw API Response</p>
            <pre className="text-xs font-mono text-neutral-400 bg-surface-ghost border border-surface-border rounded p-3 overflow-auto max-h-64">
              {JSON.stringify(data.raw, null, 2)}
            </pre>
          </div>
        )}

        {viewMode === 'analytic' && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Score breakdown</p>
            <div className="flex flex-col gap-2">
              {[
                { label: data.isActive ? 'Status ativo' : 'Status inativo', active: data.isActive },
                { label: 'Maturidade', weight: '20%', active: true },
                { label: 'Porte ideal', weight: '20%', active: true },
                { label: 'Segmento tech', weight: '20%', active: true },
              ].map(f => (
                <div key={f.label} className="flex items-center justify-between text-xs">
                  <span className="text-neutral-400">{f.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500">{f.weight}</span>
                    <span className={f.active ? 'text-success-400' : 'text-error-400'}>{f.active ? '✓' : '✗'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
