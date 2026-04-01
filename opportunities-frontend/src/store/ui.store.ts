import { create } from 'zustand'
import type { OpportunityStatus, ViewMode } from '../types'

interface UIState {
  statusFilter: OpportunityStatus | 'all'
  clientSearch: string
  viewMode: ViewMode
  isCreateOpen: boolean
  setStatusFilter: (s: OpportunityStatus | 'all') => void
  setClientSearch: (q: string) => void
  setViewMode: (v: ViewMode) => void
  openCreate: () => void
  closeCreate: () => void
}

export const useUIStore = create<UIState>(set => ({
  statusFilter: 'all',
  clientSearch: '',
  viewMode: 'kanban',
  isCreateOpen: false,
  setStatusFilter: s => set({ statusFilter: s }),
  setClientSearch:  q => set({ clientSearch: q }),
  setViewMode:      v => set({ viewMode: v }),
  openCreate:  () => set({ isCreateOpen: true }),
  closeCreate: () => set({ isCreateOpen: false }),
}))
