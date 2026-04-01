import { AlertCircle } from 'lucide-react'
import { KanbanColumn } from './kanban-column'
import { useOpportunities } from '../../hooks/use-opportunities'
import { useUIStore } from '../../store/ui.store'
import type { Opportunity, OpportunityStatus } from '../../types'

const ALL_STATUSES: OpportunityStatus[] = ['aberta', 'em_negociacao', 'fechada', 'perdida']

export function KanbanBoard() {
  const { statusFilter, clientSearch } = useUIStore()
  const { data, isLoading, isError, refetch } = useOpportunities({
    status: statusFilter,
    cliente: clientSearch,
  })

  if (isError) {
    return (
      <div className="empty err-box" style={{ flex: 1, margin: '1.5rem' }}>
        <AlertCircle size={36} color="#f87171" className="empty-icon" style={{ opacity: 1 }} />
        <p className="empty-t" style={{ color: '#f87171' }}>Could not reach the API</p>
        <p className="empty-s">Make sure the NestJS server is running on <code>localhost:3000</code></p>
        <button className="btn-retry" onClick={() => refetch()}>Retry</button>
      </div>
    )
  }

  const grouped = ALL_STATUSES.reduce<Record<OpportunityStatus, Opportunity[]>>(
    (acc, s) => ({ ...acc, [s]: [] }),
    {} as Record<OpportunityStatus, Opportunity[]>,
  )

  if (data?.dados) {
    for (const opp of data.dados) {
      if (grouped[opp.status]) grouped[opp.status].push(opp)
    }
  }

  const visibleStatuses =
    statusFilter !== 'all' ? [statusFilter] : ALL_STATUSES

  return (
    <div className="kanban-board">
      {visibleStatuses.map(s => (
        <KanbanColumn
          key={s}
          status={s}
          items={grouped[s]}
          loading={isLoading}
        />
      ))}
    </div>
  )
}
