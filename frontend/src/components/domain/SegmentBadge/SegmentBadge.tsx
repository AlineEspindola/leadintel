const SEGMENT_MAP: Record<
  string,
  { icon: string; category: "tech" | "retail" | "service" | "industry" }
> = {
  Desenvolvimento: { icon: "💻", category: "tech" },
  Software: { icon: "🖥", category: "tech" },
  Cloud: { icon: "☁️", category: "tech" },
  TI: { icon: "🔧", category: "tech" },
  Dados: { icon: "📊", category: "tech" },
  Internet: { icon: "🌐", category: "tech" },
  "E-commerce": { icon: "🛒", category: "retail" },
  Varejo: { icon: "🏪", category: "retail" },
  Consultoria: { icon: "🎯", category: "service" },
  Educação: { icon: "📚", category: "service" },
  Eventos: { icon: "🎪", category: "service" },
  Organizações: { icon: "🤝", category: "service" },
  Associações: { icon: "🏛", category: "service" },
};

const CATEGORY_STYLES = {
  tech: "badge-tech",
  retail: "badge-retail",
  service: "badge-service",
  industry: "badge-industry",
};

function detectCategory(segment: string): {
  icon: string;
  category: "tech" | "retail" | "service" | "industry";
} {
  for (const [keyword, config] of Object.entries(SEGMENT_MAP)) {
    if (segment.includes(keyword)) return config;
  }
  return { icon: "🏢", category: "industry" };
}

interface Props {
  segment: string;
  className?: string;
}

export function SegmentBadge({ segment, className = "" }: Props) {
  const { icon, category } = detectCategory(segment);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs font-semibold ${CATEGORY_STYLES[category]} ${className}`}
    >
      <span>{icon}</span>
      <span>{segment}</span>
    </span>
  );
}
