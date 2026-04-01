import { AlertCircle, Inbox } from 'lucide-react'
import { useOpportunities } from '../../hooks/use-opportunities'
import { useUIStore } from '../../store/ui.store'
import { OpportunityCard } from './opportunity-card'
import { DealCardSkeleton } from '../ui/skeleton'
export function OpportunitiesList() {
  const { statusFilter, clientSearch } = useUIStore()
  const { data, isLoading, isError, refetch } = useOpportunities({ status: statusFilter, cliente: clientSearch })

  if (isLoading) return (
    <div className="cards-grid">
      {[...Array(6)].map((_, i) => <DealCardSkeleton key={i} />)}
    </div>
  )

  if (isError) return (
    <div className="error-state">
      <AlertCircle size={36} color="#f87171" />
      <p className="empty-title error-title">Failed to load opportunities</p>
      <p className="empty-sub">Make sure the API is running on <code>localhost:3000</code></p>
      <button className="btn-retry" onClick={() => refetch()}>Try again</button>
    </div>
  )

  const list = data?.dados ?? []

  if (!list.length) return (
    <div className="empty-state">
      <Inbox size={44} className="empty-icon" />
      <p className="empty-title">No opportunities found</p>
      <p className="empty-sub">
        {clientSearch || statusFilter !== 'all'
          ? 'Try adjusting your filters'
          : 'Create your first opportunity to get started'}
      </p>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <p className="results-count">{list.length} result{list.length !== 1 ? 's' : ''}</p>
      <div className="cards-grid">
        {list.map((opp, i) => <OpportunityCard key={opp.id} opportunity={opp} index={i} />)}
      </div>
    </div>
  )
}
