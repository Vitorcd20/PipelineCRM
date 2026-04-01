import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import type { CreateOpportunityPayload, UpdateOpportunityPayload, OpportunityStatus } from '../types'

export const QK = {
  list:      (f?: { status?: OpportunityStatus; cliente?: string }) => ['opportunities', f] as const,
  dashboard: () => ['dashboard'] as const,
}

export const useOpportunities = (filters?: { status?: OpportunityStatus | 'all'; cliente?: string }) => {
  const clean = {
    status: filters?.status && filters.status !== 'all' ? filters.status : undefined,
    cliente: filters?.cliente || undefined,
  }
  return useQuery({ queryKey: QK.list(clean), queryFn: () => api.opportunities.list(clean) })
}

export const useDashboard = () =>
  useQuery({ queryKey: QK.dashboard(), queryFn: api.dashboard.summary })

const invalidate = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ['opportunities'] })
  qc.invalidateQueries({ queryKey: ['dashboard'] })
}

export const useCreateOpportunity = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (p: CreateOpportunityPayload) => api.opportunities.create(p), onSuccess: () => invalidate(qc) })
}

export const useUpdateOpportunity = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ id, body }: { id:string; body: UpdateOpportunityPayload }) => api.opportunities.update(id, body), onSuccess: () => invalidate(qc) })
}

export const useDeleteOpportunity = () => {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (id: string) => api.opportunities.remove(id), onSuccess: () => invalidate(qc) })
}
