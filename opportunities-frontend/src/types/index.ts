export type OpportunityStatus = 'aberta' | 'em_negociacao' | 'fechada' | 'perdida'

export interface Opportunity {
  id: string
  titulo: string
  cliente: string
  valor: number
  status: OpportunityStatus
  descricao?: string
  criadoEm: string
  atualizadoEm: string
}

export interface OpportunitiesResponse {
  total: number
  dados: Opportunity[]
}

export interface DashboardSummary {
  totalOportunidades: number
  valorTotal: number
  porStatus: { status: OpportunityStatus; total: number; valorAgregado: number }[]
}

export interface CreateOpportunityPayload {
  titulo: string; cliente: string; valor: number
  status?: OpportunityStatus; descricao?: string
}

export interface UpdateOpportunityPayload {
  status?: OpportunityStatus; valor?: number; descricao?: string
}

export type ViewMode = 'kanban' | 'list'
