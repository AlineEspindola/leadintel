import { ICNPJRepository, NotFoundError, APIError } from '../repositories/BrasilAPIRepository'
import { CompanyRequestDTO, CompanyResponseDTO, InsightDTO } from '../../../shared/types/dto'
import { BrasilAPICompany, ScoredCompany } from '../../../shared/types/domain/company'
import { WeightedLeadScore, DefaultScore, TemperatureScore } from '../../../shared/types/domain'
import { SCORE_WEIGHTS, SIZE_SCORES, getCNAEScore } from '../scoreWeights'

export interface ICompanyService {
  enrich(dto: CompanyRequestDTO): Promise<CompanyResponseDTO>
}

export class CompanyService implements ICompanyService {
  constructor(private repo: ICNPJRepository) {}

  async enrich(dto: CompanyRequestDTO): Promise<CompanyResponseDTO> {
    const raw = await this.repo.findByCNPJ(dto.cnpj)
    const company = new BrasilAPICompany(raw, { name: dto.name, email: dto.email, phone: dto.phone })

    const score = this.calculateScore(company, raw)
    const insights = this.generateInsights(company, raw, score)
    const temperature = new TemperatureScore(new DefaultScore(score))
    const scored = new ScoredCompany(company, new DefaultScore(score), insights)

    return {
      cnpj: scored.getCNPJ().getValue(),
      legalName: scored.getLegalName().getValue(),
      fantasyName: scored.getFantasyName().getValue(),
      cnae: scored.getCNAE().getValue(),
      cnaeCode: scored.getCNAECode().getValue(),
      segment: scored.getCNAE().getValue(),
      size: scored.getSize().getValue(),
      legalNature: scored.getLegalNature().getValue(),
      city: scored.getCity().getValue(),
      state: scored.getState().getValue(),
      address: scored.getAddress().getValue(),
      zipCode: scored.getZipCode().getValue(),
      neighborhood: scored.getNeighborhood().getValue(),
      phone: scored.getPhone().getValue(),
      status: scored.getStatus().getValue(),
      isActive: scored.getStatus().isActive(),
      openedAt: scored.getOpenedAt().getValue(),
      mainPartnerName: scored.getMainPartnerName().getValue(),
      mainPartnerRole: scored.getMainPartnerRole().getValue(),
      secondaryCNAEs: scored.getSecondaryCNAEs().map(c => ({
        code: c.code.getValue(),
        description: c.description.getValue(),
      })),
      score,
      scoreTemperature: temperature.getTemperature(),
      insights,
      raw,
    }
  }

  private calculateScore(company: BrasilAPICompany, raw: any): number {
    const isActive = company.getStatus().isActive()

    const openedDate = new Date(raw.data_inicio_atividade || '')
    const ageYears = isNaN(openedDate.getTime())
      ? 0
      : Math.floor((Date.now() - openedDate.getTime()) / (365.25 * 24 * 3600 * 1000))
    const ageScore = Math.min(100, (ageYears / SCORE_WEIGHTS.companyAge.maxYears) * 100)

    const sizeKey = (raw.porte || '').toUpperCase()
    const sizeScore = SIZE_SCORES[sizeKey] ?? 55

    const cnaeScore = getCNAEScore(raw.cnae_fiscal || 0)

    const weighted = new WeightedLeadScore({
      isActive:     { value: isActive ? SCORE_WEIGHTS.isActive.activeValue : SCORE_WEIGHTS.isActive.inactiveValue, weight: SCORE_WEIGHTS.isActive.weight },
      companyAge:   { value: ageScore,  weight: SCORE_WEIGHTS.companyAge.weight },
      size:         { value: sizeScore, weight: SCORE_WEIGHTS.sizeMultiplier.weight },
      cnae:         { value: cnaeScore, weight: SCORE_WEIGHTS.cnaeAlignment.weight },
    })

    return weighted.getValue()
  }

  private generateInsights(company: BrasilAPICompany, raw: any, score: number): InsightDTO[] {
    const insights: InsightDTO[] = []
    const isActive = company.getStatus().isActive()

    const openedDate = new Date(raw.data_inicio_atividade || '')
    const ageYears = isNaN(openedDate.getTime())
      ? 5
      : Math.floor((Date.now() - openedDate.getTime()) / (365.25 * 24 * 3600 * 1000))

    const porte = (raw.porte || '').toUpperCase()
    const cnaeCode = String(raw.cnae_fiscal || '').slice(0, 4)
    const isTech = ['6201','6202','6203','6204','6209','6311','6312'].includes(cnaeCode)

    const INSIGHT_MAP: Array<[boolean, InsightDTO]> = [
      [isActive, { icon: '✅', title: 'Empresa ativa e regularizada', description: 'Situação regular na Receita Federal — sem impedimentos cadastrais.', confidence: 'high' }],
      [!isActive, { icon: '⚠️', title: 'Empresa com situação irregular', description: 'Atenção: empresa encerrada ou com pendências na Receita Federal.', confidence: 'high' }],
      [ageYears < 2, { icon: '💡', title: 'Empresa recente', description: 'Menos de 2 anos de mercado — ciclo de decisão tende a ser mais rápido.', confidence: 'medium' }],
      [ageYears > 10, { icon: '🏛', title: 'Empresa consolidada', description: `${ageYears} anos de mercado — processo de compra mais estruturado.`, confidence: 'high' }],
      [porte === 'MEI' || porte === 'MICRO', { icon: '🎯', title: 'Decisor acessível', description: 'Equipe pequena, menos burocracia — contato direto com o decisor.', confidence: 'high' }],
      [isTech, { icon: '🖥', title: 'Perfil tech', description: 'Segmento tecnológico — familiaridade com SaaS e adoção digital.', confidence: 'high' }],
      [porte === 'GRANDE', { icon: '📋', title: 'Grande porte', description: 'Ciclo de vendas longo — múltiplos decisores e processo formal.', confidence: 'medium' }],
      [(raw.cnaes_secundarios || []).length > 3, { icon: '🔀', title: 'Empresa diversificada', description: 'Múltiplas atividades cadastradas — possível oportunidade em mais de uma área.', confidence: 'estimated' }],
    ]

    for (const [condition, insight] of INSIGHT_MAP) {
      if (condition) insights.push(insight)
    }

    return insights.slice(0, 4)
  }
}
