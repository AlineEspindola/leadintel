import { InsightDTO } from "../../../types";

const CONFIDENCE_LABELS = {
  high: { label: "Alta confiança", color: "text-success-400" },
  medium: { label: "Média confiança", color: "text-warning-400" },
  estimated: { label: "Estimado", color: "text-neutral-400" },
};

interface Props {
  insights: InsightDTO[];
}

export function InsightBlock({ insights }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
        Insights
      </p>
      {insights.map((insight, i) => {
        const conf = CONFIDENCE_LABELS[insight.confidence];
        return (
          <div
            key={i}
            className="flex gap-3 p-3 bg-surface-ghost border border-surface-border rounded-md animate-insight-in"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className="text-lg shrink-0 mt-0.5">{insight.icon}</span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium text-neutral-200">
                {insight.title}
              </p>
              <p className="text-xs text-neutral-400">{insight.description}</p>
              <span className={`text-xs ${conf.color}`}>{conf.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
