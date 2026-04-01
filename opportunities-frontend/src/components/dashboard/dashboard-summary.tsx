import { useDashboard } from '../../hooks/use-opportunities'
import { formatCurrency } from '../../lib/utils'
import type { OpportunityStatus } from '../../types'
import { SidebarSkeleton } from '../ui/Skeleton'

const STAT_CLASS: Record<OpportunityStatus, string> = {
  aberta: 'open', em_negociacao: 'neg', fechada: 'won', perdida: 'lost',
}
const STAT_LABEL: Record<OpportunityStatus, string> = {
  aberta: 'Open', em_negociacao: 'Negotiating', fechada: 'Won', perdida: 'Lost',
}

export function DashboardSummary() {
  const { data, isLoading, isError } = useDashboard()

  if (isLoading) return <SidebarSkeleton />
  if (isError) return (
    <div style={{ padding:'1rem', borderRadius:'12px', background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.2)', color:'#f87171', fontSize:'0.82rem' }}>
      Failed to load dashboard
    </div>
  )
  if (!data) return null

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div className="pipeline-total fade-up">
        <p className="pipeline-label">Total Pipeline Value</p>
        <p className="pipeline-value">{formatCurrency(data.valorTotal)}</p>
        <p className="pipeline-count">{data.totalOportunidades} opportunities</p>
      </div>

      <div className="stats-grid">
        {data.porStatus.map(({ status, total, valorAgregado }, i) => (
          <div
            key={status}
            className={`stat-card ${STAT_CLASS[status as OpportunityStatus]} fade-up`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="stat-header">
              <span className={`stat-dot`} />
              <span className="stat-label">{STAT_LABEL[status as OpportunityStatus]}</span>
            </div>
            <div className="stat-count">{total}</div>
            <div className="stat-value">{formatCurrency(valorAgregado)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
