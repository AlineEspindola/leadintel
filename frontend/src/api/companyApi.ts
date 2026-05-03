import { CompanyRequestDTO, CompanyResponseDTO } from '../types'

const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function enrichCompany(dto: CompanyRequestDTO): Promise<CompanyResponseDTO> {
  const res = await fetch(`${API_BASE}/company/enrich`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  })
  const data = await res.json()
  if (!res.ok) throw { status: res.status, ...data }
  return data
}
