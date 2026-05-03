import {
  Name,
  Email,
  CNPJ,
  Role,
  CNAE,
  Code,
  Size,
  LegalNature,
  City,
  State,
  Address,
  ZipCode,
  Neighborhood,
  Phone,
  Status,
  CompanyDate,
  Text,
  Score,
  Insight,
  DefaultName,
  DefaultEmail,
  DefaultCNPJ,
  DefaultRole,
  DefaultCNAE,
  DefaultCode,
  DefaultSize,
  DefaultLegalNature,
  DefaultCity,
  DefaultState,
  DefaultAddress,
  DefaultZipCode,
  DefaultNeighborhood,
  DefaultPhone,
  DefaultStatus,
  DefaultCompanyDate,
  DefaultText,
  DefaultScore,
  NullText,
  NullEmail,
  NullRole,
  NullCity,
  NullState,
  FormattedCNPJ,
  ValidCNPJ,
  FormattedPhone,
  ValidPhone,
  FormattedZipCode,
  HumanReadableDate,
  HumanReadableSize,
  HumanReadableLegalNature,
  TranslatedCNAE,
  ValidCode,
  FullAddress,
  WeightedLeadScore,
  TemperatureScore,
} from "../index";

export interface Company {
  getName(): Name;
  getEmail(): Email;
  getCNPJ(): CNPJ;
  getRole(): Role;
  getLegalName(): Name;
  getFantasyName(): Name;
  getCNAE(): CNAE;
  getCNAECode(): Code;
  getSize(): Size;
  getLegalNature(): LegalNature;
  getCity(): City;
  getState(): State;
  getAddress(): Address;
  getZipCode(): ZipCode;
  getNeighborhood(): Neighborhood;
  getPhone(): Phone;
  getStatus(): Status;
  getOpenedAt(): CompanyDate;
  getMainPartnerName(): Name;
  getMainPartnerRole(): Role;
  getSecondaryCNAEs(): { code: Code; description: Text }[];
  getScore(): Score;
  getInsights(): Insight[];
}

// ─── Default Company ────────────────────────────────────────────────────────
export class DefaultCompany implements Company {
  constructor(
    private data: {
      name: Name;
      email: Email;
      cnpj: CNPJ;
      role: Role;
      legalName: Name;
      fantasyName: Name;
      cnae: CNAE;
      cnaeCode: Code;
      size: Size;
      legalNature: LegalNature;
      city: City;
      state: State;
      address: Address;
      zipCode: ZipCode;
      neighborhood: Neighborhood;
      phone: Phone;
      status: Status;
      openedAt: CompanyDate;
      mainPartnerName: Name;
      mainPartnerRole: Role;
      secondaryCNAEs: { code: Code; description: Text }[];
      score: Score;
      insights: Insight[];
    },
  ) {}
  getName(): Name {
    return this.data.name;
  }
  getEmail(): Email {
    return this.data.email;
  }
  getCNPJ(): CNPJ {
    return this.data.cnpj;
  }
  getRole(): Role {
    return this.data.role;
  }
  getLegalName(): Name {
    return this.data.legalName;
  }
  getFantasyName(): Name {
    return this.data.fantasyName;
  }
  getCNAE(): CNAE {
    return this.data.cnae;
  }
  getCNAECode(): Code {
    return this.data.cnaeCode;
  }
  getSize(): Size {
    return this.data.size;
  }
  getLegalNature(): LegalNature {
    return this.data.legalNature;
  }
  getCity(): City {
    return this.data.city;
  }
  getState(): State {
    return this.data.state;
  }
  getAddress(): Address {
    return this.data.address;
  }
  getZipCode(): ZipCode {
    return this.data.zipCode;
  }
  getNeighborhood(): Neighborhood {
    return this.data.neighborhood;
  }
  getPhone(): Phone {
    return this.data.phone;
  }
  getStatus(): Status {
    return this.data.status;
  }
  getOpenedAt(): CompanyDate {
    return this.data.openedAt;
  }
  getMainPartnerName(): Name {
    return this.data.mainPartnerName;
  }
  getMainPartnerRole(): Role {
    return this.data.mainPartnerRole;
  }
  getSecondaryCNAEs(): { code: Code; description: Text }[] {
    return this.data.secondaryCNAEs;
  }
  getScore(): Score {
    return this.data.score;
  }
  getInsights(): Insight[] {
    return this.data.insights;
  }
}

// ─── Null Company ───────────────────────────────────────────────────────────
export class NullCompany implements Company {
  private err<T>(field: string): T {
    throw new Error(`NullCompany: ${field} unavailable`);
  }
  getName(): Name {
    return this.err<Name>("name");
  }
  getEmail(): Email {
    return this.err<Email>("email");
  }
  getCNPJ(): CNPJ {
    return this.err<CNPJ>("cnpj");
  }
  getRole(): Role {
    return this.err<Role>("role");
  }
  getLegalName(): Name {
    return this.err<Name>("legalName");
  }
  getFantasyName(): Name {
    return this.err<Name>("fantasyName");
  }
  getCNAE(): CNAE {
    return this.err<CNAE>("cnae");
  }
  getCNAECode(): Code {
    return this.err<Code>("cnaeCode");
  }
  getSize(): Size {
    return this.err<Size>("size");
  }
  getLegalNature(): LegalNature {
    return this.err<LegalNature>("legalNature");
  }
  getCity(): City {
    return this.err<City>("city");
  }
  getState(): State {
    return this.err<State>("state");
  }
  getAddress(): Address {
    return this.err<Address>("address");
  }
  getZipCode(): ZipCode {
    return this.err<ZipCode>("zipCode");
  }
  getNeighborhood(): Neighborhood {
    return this.err<Neighborhood>("neighborhood");
  }
  getPhone(): Phone {
    return this.err<Phone>("phone");
  }
  getStatus(): Status {
    return this.err<Status>("status");
  }
  getOpenedAt(): CompanyDate {
    return this.err<CompanyDate>("openedAt");
  }
  getMainPartnerName(): Name {
    return this.err<Name>("mainPartnerName");
  }
  getMainPartnerRole(): Role {
    return this.err<Role>("mainPartnerRole");
  }
  getSecondaryCNAEs(): { code: Code; description: Text }[] {
    return this.err<{ code: Code; description: Text }[]>("secondaryCNAEs");
  }
  getScore(): Score {
    return this.err<Score>("score");
  }
  getInsights(): Insight[] {
    return this.err<Insight[]>("insights");
  }
}

// ─── BrasilAPI Company ──────────────────────────────────────────────────────
export class BrasilAPICompany implements Company {
  private inner: Company;

  constructor(
    private raw: any,
    private leadData: { name: string; email: string; phone: string },
  ) {
    const qsa = raw.qsa?.[0];
    const status = new DefaultStatus(raw.descricao_situacao_cadastral || "");
    const openedAt = new HumanReadableDate(
      new DefaultCompanyDate(raw.data_inicio_atividade || ""),
    );
    const phone = new FormattedPhone(
      new ValidPhone(new DefaultPhone(raw.ddd_telefone_1 || "")),
    );

    this.inner = new DefaultCompany({
      name: new DefaultName(leadData.name),
      email: new DefaultEmail(leadData.email),
      cnpj: new FormattedCNPJ(new ValidCNPJ(new DefaultCNPJ(raw.cnpj || ""))),
      role: new DefaultRole("Não informado"),
      legalName: new DefaultName(raw.razao_social || ""),
      fantasyName: new DefaultName(raw.nome_fantasia || raw.razao_social || ""),
      cnae: new TranslatedCNAE(
        new DefaultCNAE(String(raw.cnae_fiscal || "")),
        raw.cnae_fiscal_descricao,
      ),
      cnaeCode: new ValidCode(new DefaultCode(raw.cnae_fiscal || 0)),
      size: new HumanReadableSize(new DefaultSize(raw.porte || "")),
      legalNature: new HumanReadableLegalNature(
        new DefaultLegalNature(raw.natureza_juridica || ""),
      ),
      city: new DefaultCity(raw.municipio || ""),
      state: new DefaultState(raw.uf || ""),
      address: new FullAddress(
        raw.descricao_tipo_de_logradouro || "",
        raw.logradouro || "",
        raw.numero || "",
        raw.complemento || "",
      ),
      zipCode: new FormattedZipCode(new DefaultZipCode(raw.cep || "")),
      neighborhood: new DefaultNeighborhood(raw.bairro || ""),
      phone,
      status,
      openedAt,
      mainPartnerName: new DefaultName(qsa?.nome_socio || "Não informado"),
      mainPartnerRole: new DefaultRole(
        qsa?.qualificacao_socio || "Não informado",
      ),
      secondaryCNAEs: (raw.cnaes_secundarios || []).map((c: any) => ({
        code: new DefaultCode(c.codigo),
        description: new DefaultText(c.descricao),
      })),
      score: new DefaultScore(0),
      insights: [],
    });
  }

  getRaw() {
    return this.raw;
  }
  getName() {
    return this.inner.getName();
  }
  getEmail() {
    return this.inner.getEmail();
  }
  getCNPJ() {
    return this.inner.getCNPJ();
  }
  getRole() {
    return this.inner.getRole();
  }
  getLegalName() {
    return this.inner.getLegalName();
  }
  getFantasyName() {
    return this.inner.getFantasyName();
  }
  getCNAE() {
    return this.inner.getCNAE();
  }
  getCNAECode() {
    return this.inner.getCNAECode();
  }
  getSize() {
    return this.inner.getSize();
  }
  getLegalNature() {
    return this.inner.getLegalNature();
  }
  getCity() {
    return this.inner.getCity();
  }
  getState() {
    return this.inner.getState();
  }
  getAddress() {
    return this.inner.getAddress();
  }
  getZipCode() {
    return this.inner.getZipCode();
  }
  getNeighborhood() {
    return this.inner.getNeighborhood();
  }
  getPhone() {
    return this.inner.getPhone();
  }
  getStatus() {
    return this.inner.getStatus();
  }
  getOpenedAt() {
    return this.inner.getOpenedAt();
  }
  getMainPartnerName() {
    return this.inner.getMainPartnerName();
  }
  getMainPartnerRole() {
    return this.inner.getMainPartnerRole();
  }
  getSecondaryCNAEs() {
    return this.inner.getSecondaryCNAEs();
  }
  getScore() {
    return this.inner.getScore();
  }
  getInsights() {
    return this.inner.getInsights();
  }
}

// ─── Scored Company (Decorator) ─────────────────────────────────────────────
export class ScoredCompany implements Company {
  private _score: Score;
  private _insights: Insight[];

  constructor(
    private inner: Company,
    score: Score,
    insights: Insight[],
  ) {
    this._score = score;
    this._insights = insights;
  }

  getName() {
    return this.inner.getName();
  }
  getEmail() {
    return this.inner.getEmail();
  }
  getCNPJ() {
    return this.inner.getCNPJ();
  }
  getRole() {
    return this.inner.getRole();
  }
  getLegalName() {
    return this.inner.getLegalName();
  }
  getFantasyName() {
    return this.inner.getFantasyName();
  }
  getCNAE() {
    return this.inner.getCNAE();
  }
  getCNAECode() {
    return this.inner.getCNAECode();
  }
  getSize() {
    return this.inner.getSize();
  }
  getLegalNature() {
    return this.inner.getLegalNature();
  }
  getCity() {
    return this.inner.getCity();
  }
  getState() {
    return this.inner.getState();
  }
  getAddress() {
    return this.inner.getAddress();
  }
  getZipCode() {
    return this.inner.getZipCode();
  }
  getNeighborhood() {
    return this.inner.getNeighborhood();
  }
  getPhone() {
    return this.inner.getPhone();
  }
  getStatus() {
    return this.inner.getStatus();
  }
  getOpenedAt() {
    return this.inner.getOpenedAt();
  }
  getMainPartnerName() {
    return this.inner.getMainPartnerName();
  }
  getMainPartnerRole() {
    return this.inner.getMainPartnerRole();
  }
  getSecondaryCNAEs() {
    return this.inner.getSecondaryCNAEs();
  }
  getScore() {
    return this._score;
  }
  getInsights() {
    return this._insights;
  }
}
