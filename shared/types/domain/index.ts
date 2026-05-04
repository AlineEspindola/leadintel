export interface Name {
  getValue(): string;
}
export interface Email {
  getValue(): string;
}
export interface CNPJ {
  getValue(): string;
}
export interface Role {
  getValue(): string;
}
export interface CNAE {
  getValue(): string;
}
export interface Code {
  getValue(): number;
}
export interface Size {
  getValue(): string;
}
export interface LegalNature {
  getValue(): string;
}
export interface City {
  getValue(): string;
}
export interface State {
  getValue(): string;
}
export interface Address {
  getValue(): string;
}
export interface ZipCode {
  getValue(): string;
}
export interface Neighborhood {
  getValue(): string;
}
export interface Phone {
  getValue(): string;
}
export interface Status {
  getValue(): string;
  isActive(): boolean;
}
export interface CompanyDate {
  getValue(): string;
}
export interface Text {
  getValue(): string;
}
export interface Score {
  getValue(): number;
}
export interface LeadScore {
  getValue(): number;
}

export interface Insight {
  icon: string;
  title: string;
  description: string;
  confidence: "high" | "medium" | "estimated";
}

// ─── Name ──────────────────────────────────────────────────────────────────
export class DefaultName implements Name {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidName implements Name {
  constructor(private inner: Name) {}
  getValue() {
    const v = this.inner.getValue();
    if (!v.trim()) throw new Error("Name cannot be empty");
    return v;
  }
}
export class MaxLengthName implements Name {
  constructor(
    private inner: Name,
    private max = 255,
  ) {}
  getValue() {
    const v = this.inner.getValue();
    if (v.length > this.max) throw new Error(`Name exceeds ${this.max} chars`);
    return v;
  }
}
export class MinLengthName implements Name {
  constructor(
    private inner: Name,
    private min = 2,
  ) {}
  getValue() {
    const v = this.inner.getValue();
    if (v.length < this.min) throw new Error(`Name too short`);
    return v;
  }
}

// ─── Email ─────────────────────────────────────────────────────────────────
export class DefaultEmail implements Email {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidEmail implements Email {
  constructor(private inner: Email) {}
  getValue() {
    const v = this.inner.getValue();
    if (!v.includes("@") || !v.includes(".")) throw new Error("Invalid email");
    return v;
  }
}
export class NullEmail implements Email {
  getValue() {
    return "";
  }
}

// ─── CNPJ ──────────────────────────────────────────────────────────────────
const CNPJ_WEIGHTS_1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const CNPJ_WEIGHTS_2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
function calcDigit(digits: number[], weights: number[]) {
  const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
  const rem = sum % 11;
  return rem < 2 ? 0 : 11 - rem;
}
export function validateCNPJ(raw: string): boolean {
  const d = raw.replace(/\D/g, "");
  if (d.length !== 14) return false;
  if (/^(\d)\1+$/.test(d)) return false;
  const digits = d.split("").map(Number);
  const d1 = calcDigit(digits.slice(0, 12), CNPJ_WEIGHTS_1);
  const d2 = calcDigit(digits.slice(0, 13), CNPJ_WEIGHTS_2);
  return digits[12] === d1 && digits[13] === d2;
}
export class DefaultCNPJ implements CNPJ {
  constructor(private v: string) {}
  getValue() {
    return this.v.replace(/\D/g, "");
  }
}
export class ValidCNPJ implements CNPJ {
  constructor(private inner: CNPJ) {}
  getValue() {
    const v = this.inner.getValue();
    if (!validateCNPJ(v)) throw new Error("Invalid CNPJ");
    return v;
  }
}
export class FormattedCNPJ implements CNPJ {
  constructor(private inner: CNPJ) {}
  getValue() {
    const v = this.inner.getValue();
    return v.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
  }
}
export class NullCNPJ implements CNPJ {
  getValue() {
    return "";
  }
}

// ─── Role ──────────────────────────────────────────────────────────────────
export class DefaultRole implements Role {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidRole implements Role {
  constructor(private inner: Role) {}
  getValue() {
    const v = this.inner.getValue();
    if (!v.trim()) throw new Error("Role empty");
    return v;
  }
}
export class NullRole implements Role {
  getValue() {
    return "Não informado";
  }
}

// ─── CNAE ──────────────────────────────────────────────────────────────────
const CNAE_TRANSLATIONS: Record<string, string> = {
  "6201": "Desenvolvimento de Software B2B",
  "6202": "Cloud / Infraestrutura",
  "6203": "Suporte e Gestão de TI",
  "6204": "Consultoria em TI",
  "6209": "Serviços de TI",
  "6311": "Dados e Analytics",
  "6312": "Portais Web",
  "6319": "Internet e Dados",
  "7020": "Consultoria Estratégica",
  "7022": "Consultoria de Gestão",
  "4751": "E-commerce / Varejo Digital",
  "4761": "Varejo de Livros/Mídia",
  "8599": "Educação e Treinamento",
  "8230": "Eventos e Feiras",
  "9430": "Organizações Sociais",
  "9493": "Cultura e Arte",
  "9499": "Associações",
};
export class DefaultCNAE implements CNAE {
  constructor(private v: string) {}
  getValue() {
    return String(this.v);
  }
}
export class ValidCNAE implements CNAE {
  constructor(private inner: CNAE) {}
  getValue() {
    const v = this.inner.getValue();
    if (!v) throw new Error("CNAE empty");
    return v;
  }
}
export class TranslatedCNAE implements CNAE {
  constructor(
    private inner: CNAE,
    private description?: string,
  ) {}
  getValue() {
    if (this.description) return this.description;
    const code = this.inner.getValue().slice(0, 4);
    return CNAE_TRANSLATIONS[code] || this.inner.getValue();
  }
}

// ─── Code ──────────────────────────────────────────────────────────────────
export class DefaultCode implements Code {
  constructor(private v: number) {}
  getValue() {
    return this.v;
  }
}
export class ValidCode implements Code {
  constructor(private inner: Code) {}
  getValue() {
    const v = this.inner.getValue();
    if (!v) throw new Error("Code empty");
    return v;
  }
}
export class NullCode implements Code {
  getValue() {
    return 0;
  }
}

// ─── Size ──────────────────────────────────────────────────────────────────
const SIZE_MAP: Record<string, string> = {
  MEI: "MEI (até 1 funcionário)",
  MICRO: "Microempresa (até 9 funcionários)",
  PEQUENA: "Pequeno porte (10–49 funcionários)",
  MEDIO: "Médio porte (50–249 funcionários)",
  GRANDE: "Grande porte (250+ funcionários)",
  DEMAIS: "Porte não classificado",
};
export class DefaultSize implements Size {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class HumanReadableSize implements Size {
  constructor(private inner: Size) {}
  getValue() {
    return (
      SIZE_MAP[this.inner.getValue().toUpperCase()] || this.inner.getValue()
    );
  }
}

// ─── LegalNature ───────────────────────────────────────────────────────────
export class DefaultLegalNature implements LegalNature {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class HumanReadableLegalNature implements LegalNature {
  constructor(private inner: LegalNature) {}
  getValue() {
    const v = this.inner.getValue();
    return v || "Natureza jurídica não informada";
  }
}

// ─── City / State ──────────────────────────────────────────────────────────
export class DefaultCity implements City {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidCity implements City {
  constructor(private inner: City) {}
  getValue() {
    return this.inner.getValue() || "Não informada";
  }
}
export class NullCity implements City {
  getValue() {
    return "Não informada";
  }
}

export class DefaultState implements State {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidState implements State {
  constructor(private inner: State) {}
  getValue() {
    const v = this.inner.getValue();
    if (v.length !== 2) throw new Error("Invalid UF");
    return v;
  }
}
export class NullState implements State {
  getValue() {
    return "";
  }
}

// ─── Address / ZipCode / Neighborhood ─────────────────────────────────────
export class DefaultAddress implements Address {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class FullAddress implements Address {
  constructor(
    private type: string,
    private street: string,
    private number: string,
    private complement: string,
  ) {}
  getValue() {
    return [this.type, this.street, this.number, this.complement]
      .filter(Boolean)
      .join(" ")
      .trim();
  }
}

export class DefaultZipCode implements ZipCode {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidZipCode implements ZipCode {
  constructor(private inner: ZipCode) {}
  getValue() {
    return this.inner.getValue();
  }
}
export class FormattedZipCode implements ZipCode {
  constructor(private inner: ZipCode) {}
  getValue() {
    const v = this.inner.getValue().replace(/\D/g, "");
    return v.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  }
}

export class DefaultNeighborhood implements Neighborhood {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class NullNeighborhood implements Neighborhood {
  getValue() {
    return "";
  }
}

// ─── Phone ─────────────────────────────────────────────────────────────────
export class DefaultPhone implements Phone {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class ValidPhone implements Phone {
  constructor(private inner: Phone) {}
  getValue() {
    return this.inner.getValue();
  }
}
export class FormattedPhone implements Phone {
  constructor(private inner: Phone) {}
  getValue() {
    const v = this.inner.getValue().replace(/\D/g, "");
    if (v.length === 11)
      return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
    if (v.length === 10)
      return `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    return v;
  }
}

// ─── Status ────────────────────────────────────────────────────────────────
export class DefaultStatus implements Status {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
  isActive() {
    return this.v.toUpperCase() === "ATIVA";
  }
}
export class ActiveStatus implements Status {
  constructor(private inner: Status) {}
  getValue() {
    return "ATIVA";
  }
  isActive() {
    return true;
  }
}
export class InactiveStatus implements Status {
  constructor(private inner: Status) {}
  getValue() {
    return this.inner.getValue();
  }
  isActive() {
    return false;
  }
}

// ─── CompanyDate ───────────────────────────────────────────────────────────
export class DefaultCompanyDate implements CompanyDate {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class HumanReadableDate implements CompanyDate {
  constructor(private inner: CompanyDate) {}
  getValue() {
    const d = new Date(this.inner.getValue());
    const years = Math.floor(
      (Date.now() - d.getTime()) / (365.25 * 24 * 3600 * 1000),
    );
    if (years === 0) return "Menos de 1 ano de mercado";
    if (years === 1) return "1 ano de mercado";
    return `${years} anos de mercado`;
  }
}

// ─── Text ──────────────────────────────────────────────────────────────────
export class DefaultText implements Text {
  constructor(private v: string) {}
  getValue() {
    return this.v;
  }
}
export class NullText implements Text {
  getValue() {
    return "";
  }
}
export class MaxLengthText implements Text {
  constructor(
    private inner: Text,
    private max = 500,
  ) {}
  getValue() {
    const v = this.inner.getValue();
    return v.length > this.max ? v.slice(0, this.max) + "…" : v;
  }
}

// ─── Score ─────────────────────────────────────────────────────────────────
export type ScoreTemperature = "hot" | "warm" | "cold";
export class DefaultScore implements Score {
  constructor(private v: number) {}
  getValue() {
    return this.v;
  }
}
export class ValidScore implements Score {
  constructor(private inner: Score) {}
  getValue() {
    const v = this.inner.getValue();
    if (v < 0 || v > 100) throw new Error("Score out of range");
    return v;
  }
}
export class TemperatureScore implements Score {
  constructor(private inner: Score) {}
  getValue() {
    return this.inner.getValue();
  }
  getTemperature(): ScoreTemperature {
    const v = this.inner.getValue();
    if (v >= 80) return "hot";
    if (v >= 50) return "warm";
    return "cold";
  }
}

// ─── LeadScore ─────────────────────────────────────────────────────────────
export class DefaultLeadScore implements LeadScore {
  constructor(private v: number) {}
  getValue() {
    return this.v;
  }
}
export class WeightedLeadScore implements LeadScore {
  constructor(
    private factors: Record<string, { value: number; weight: number }>,
  ) {}
  getValue() {
    let total = 0,
      totalWeight = 0;
    for (const { value, weight } of Object.values(this.factors)) {
      total += value * weight;
      totalWeight += weight;
    }
    return totalWeight > 0 ? Math.round(total / totalWeight) : 0;
  }
}
