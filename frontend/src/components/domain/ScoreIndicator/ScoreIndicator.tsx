import { useEffect, useState } from "react";

interface Props {
  score: number;
  temperature: "hot" | "warm" | "cold";
}

const TEMP_CONFIG = {
  hot: {
    icon: "🔥",
    label: "Prioridade Alta",
    color: "text-score-hot",
    bar: "bg-score-hot",
    glow: "shadow-glow-hot",
    badge: "bg-score-hot-bg text-score-hot border-score-hot",
  },
  warm: {
    icon: "⚡",
    label: "Qualificar",
    color: "text-score-warm",
    bar: "bg-score-warm",
    glow: "shadow-glow-warm",
    badge: "bg-score-warm-bg text-score-warm border-score-warm",
  },
  cold: {
    icon: "❄️",
    label: "Baixa Prioridade",
    color: "text-score-cold",
    bar: "bg-score-cold",
    glow: "",
    badge: "bg-score-cold-bg text-score-cold border-score-cold",
  },
};

export function ScoreIndicator({ score, temperature }: Props) {
  const [display, setDisplay] = useState(0);
  const cfg = TEMP_CONFIG[temperature];

  useEffect(() => {
    let start = 0;
    const end = score;
    const duration = 600;
    const step = (timestamp: number, startTime: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime));
    };
    requestAnimationFrame((t) => step(t, t));
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div
        className={`relative w-32 h-32 rounded-full border-4 border-surface-border flex items-center justify-center ${cfg.glow} animate-score-in`}
        style={{
          borderColor:
            temperature === "hot"
              ? "#F5521A"
              : temperature === "warm"
                ? "#F5A623"
                : "#6B7C93",
        }}
      >
        <div className="text-center">
          <span className={`font-display text-5xl leading-none ${cfg.color}`}>
            {display}
          </span>
        </div>
      </div>

      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${cfg.badge}`}
      >
        <span>{cfg.icon}</span>
        <span>{cfg.label}</span>
      </div>

      <div className="w-full bg-surface-border rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-score ${cfg.bar}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="text-xs text-neutral-500">Score de prioridade do lead</p>
    </div>
  );
}
