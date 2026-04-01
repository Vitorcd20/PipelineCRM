import type { Opportunity, DashboardSummary } from '../types'

export const mockOpportunity: Opportunity = {
  id: 'abc-123',
  titulo: 'ERP System',
  cliente: 'Acme Corp',
  valor: 85000,
  status: 'aberta',
  descricao: 'Full ERP development',
  criadoEm: '2025-01-10T00:00:00.000Z',
  atualizadoEm: '2025-01-15T00:00:00.000Z',
}

export const mockOpportunities: Opportunity[] = [
  mockOpportunity,
  { ...mockOpportunity, id: 'def-456', titulo: 'Cloud Consulting', status: 'em_negociacao', valor: 32000, cliente: 'Tech Co' },
  { ...mockOpportunity, id: 'ghi-789', titulo: 'Mobile App', status: 'fechada', valor: 120000, cliente: 'Varejo SA' },
  { ...mockOpportunity, id: 'jkl-012', titulo: 'Portal Redesign', status: 'perdida', valor: 18500, cliente: 'XYZ Group' },
]

export const mockDashboard: DashboardSummary = {
  totalOportunidades: 4,
  valorTotal: 255500,
  porStatus: [
    { status: 'aberta',        total: 1, valorAgregado: 85000  },
    { status: 'em_negociacao', total: 1, valorAgregado: 32000  },
    { status: 'fechada',       total: 1, valorAgregado: 120000 },
    { status: 'perdida',       total: 1, valorAgregado: 18500  },
  ],
}
