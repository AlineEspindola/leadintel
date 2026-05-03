export interface CompanyRequestDTO {
  name: string
  email: string
  phone: string
  cnpj: string
}

export interface InsightDTO {
  icon: string
  title: string
  description: string
  confidence: 'high' | 'medium' | 'estimated'
}

export interface CompanyResponseDTO {
  cnpj: string
  legalName: string
  fantasyName: string
  cnae: string
  cnaeCode: number
  segment: string
  size: string
  legalNature: string
  city: string
  state: string
  address: string
  zipCode: string
  neighborhood: string
  phone: string
  status: string
  isActive: boolean
  openedAt: string
  mainPartnerName: string
  mainPartnerRole: string
  secondaryCNAEs: { code: number; description: string }[]
  score: number
  scoreTemperature: 'hot' | 'warm' | 'cold'
  insights: InsightDTO[]
  raw?: any
}

export interface LeadDTO {
  name: string
  email: string
  phone: string
  company: CompanyResponseDTO
}
