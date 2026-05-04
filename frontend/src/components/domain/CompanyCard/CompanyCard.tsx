import { CompanyResponseDTO } from "../../../types";
import { ViewMode } from "../../../hooks/useViewMode";
import { ScoreIndicator } from "../ScoreIndicator/ScoreIndicator";
import { SegmentBadge } from "../SegmentBadge/SegmentBadge";
import { InsightBlock } from "../InsightBlock/InsightBlock";
import { Badge } from "../../ui";

interface Props {
  data: CompanyResponseDTO;
  viewMode: ViewMode;
}

function MetaRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2 py-2 border-b border-surface-border last:border-0">
      <span className="text-sm shrink-0">{icon}</span>
      <div className="flex flex-col min-w-0">
        <span className="text-xs text-neutral-500 uppercase tracking-wide">
          {label}
        </span>
        <span className="text-sm text-neutral-200 truncate">
          {value || "—"}
        </span>
      </div>
    </div>
  );
}

function scoreLabel(value: number) {
  if (value > 70) return { text: "Alto", color: "text-success-400" };
  if (value > 40) return { text: "Médio", color: "text-yellow-400" };
  return { text: "Baixo", color: "text-error-400" };
}

export function CompanyCard({ data, viewMode }: Props) {
  const breakdownItems = [
    {
      label: "Tempo de mercado",
      value: data.breakdown.companyAge,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 animate-slide-up">
      {/* SCORE */}
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col items-center">
        <ScoreIndicator
          score={data.score}
          temperature={data.scoreTemperature}
        />

        <div className="w-full border-t border-surface-border pt-4 mt-2 flex flex-col items-center gap-2">
          <Badge variant={data.isActive ? "success" : "error"}>
            {data.isActive ? "✅ ATIVA" : "🚫 INATIVA"}
          </Badge>

          <SegmentBadge segment={data.segment} />
        </div>
      </div>

      {/* INFO */}
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
          <MetaRow
            icon="📍"
            label="Localização"
            value={`${data.city}, ${data.state}`}
          />
          <MetaRow icon="🏢" label="Porte" value={data.size} />
          <MetaRow icon="📅" label="Fundada" value={data.openedAt} />
          <MetaRow icon="📞" label="Telefone" value={data.phone || "—"} />
          <MetaRow
            icon="👤"
            label="Sócio principal"
            value={`${data.mainPartnerName} — ${data.mainPartnerRole}`}
          />
        </div>

        {viewMode !== "simple" && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Dados técnicos
            </p>

            <MetaRow icon="🔢" label="CNPJ" value={data.cnpj} />
            <MetaRow
              icon="📋"
              label="Natureza jurídica"
              value={data.legalNature}
            />
            <MetaRow
              icon="🗺"
              label="Endereço"
              value={`${data.address}, ${data.neighborhood}`}
            />
            <MetaRow icon="📮" label="CEP" value={data.zipCode} />
          </div>
        )}
      </div>

      {/* INSIGHTS + BREAKDOWN */}
      <div className="bg-surface-raised border border-surface-border rounded-lg p-6 flex flex-col gap-4">
        <InsightBlock insights={data.insights} />

        {viewMode === "analytic" && (
          <div className="border-t border-surface-border pt-4">
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
              Breakdown
            </p>

            <div className="flex flex-col gap-2">
              {breakdownItems.map((item) => {
                const formatted = scoreLabel(item.value);

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-neutral-400">{item.label}</span>

                    <span className={formatted.color}>{formatted.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === "developer" && (
  <div className="border-t border-surface-border pt-4">
    <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">
      Debug (Developer Mode)
    </p>

    <div className="flex flex-col gap-2 text-xs text-neutral-400">
      <div>
        <span className="text-neutral-500">Score:</span> {data.score}
      </div>

      <div>
        <span className="text-neutral-500">Temperature:</span>{" "}
        {data.scoreTemperature}
      </div>

      <div>
        <span className="text-neutral-500">Status:</span>{" "}
        {data.status}
      </div>

      <div>
        <span className="text-neutral-500">CNAE:</span> {data.cnaeCode}
      </div>

      <div>
        <span className="text-neutral-500">Raw keys:</span>{" "}
        {Object.keys(data.raw || {}).length}
      </div>
    </div>

    <pre className="mt-3 text-xs font-mono text-neutral-400 bg-surface-ghost border border-surface-border rounded p-3 overflow-auto max-h-64">
      {JSON.stringify(data, null, 2)}
    </pre>
  </div>
)}
      </div>
    </div>
  );
}
