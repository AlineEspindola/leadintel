export const SCORE_WEIGHTS = {
  isActive: { weight: 40, activeValue: 100, inactiveValue: 0 },
  companyAge: { weight: 20, maxYears: 20 },
  sizeMultiplier: { weight: 20 },
  cnaeAlignment: { weight: 20 },
};

export const SIZE_SCORES: Record<string, number> = {
  MEI: 60,
  MICRO: 75,
  DEMAIS: 55,
  PEQUENA: 80,
  MEDIO: 85,
  GRANDE: 70,
};

const TECH_CNAES = [
  "6201",
  "6202",
  "6203",
  "6204",
  "6209",
  "6311",
  "6312",
  "6319",
  "7020",
  "7022",
];
const HIGH_VALUE_CNAES = ["8599", "4751"];

export function getCNAEScore(cnaeCode: number): number {
  const code = String(cnaeCode).slice(0, 4);
  if (TECH_CNAES.includes(code)) return 90;
  if (HIGH_VALUE_CNAES.includes(code)) return 70;
  return 50;
}
