import axios from 'axios'
import type { Opportunity, OpportunitiesResponse, DashboardSummary, CreateOpportunityPayload, UpdateOpportunityPayload, OpportunityStatus } from '../types'

const http = axios.create({ baseURL: '/api', headers: { 'Content-Type': 'application/json' } })

export const api = {
  opportunities: {
    list:   (params?: { status?: OpportunityStatus; cliente?: string }) =>
              http.get<OpportunitiesResponse>('/oportunidades', { params }).then(r => r.data),
    create: (body: CreateOpportunityPayload) =>
              http.post<Opportunity>('/oportunidades', body).then(r => r.data),
    update: (id: string, body: UpdateOpportunityPayload) =>
              http.patch<Opportunity>(`/oportunidades/${id}`, body).then(r => r.data),
    remove: (id: string) =>
              http.delete(`/oportunidades/${id}`),
  },
  dashboard: {
    summary: () => http.get<DashboardSummary>('/dashboard/resumo').then(r => r.data),
  },
}
