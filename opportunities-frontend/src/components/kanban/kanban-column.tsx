import { Inbox, Clock, Activity, CheckCircle, XCircle, DollarSign } from 'lucide-react'
import { DealCard } from '../opportunities/deal-card'
import { DealCardSkeleton } from '../ui/skeleton'
import { formatCurrency } from '../../lib/utils'
import type { Opportunity, OpportunityStatus } from '../../types'

const COL_META: Record<OpportunityStatus, { label: string; cls: string; Icon: React.ElementType }> = {
  aberta:        { label: 'Open',        cls: 's-aberta',        Icon: Clock       },
  em_negociacao: { label: 'Negotiating', cls: 's-em_negociacao', Icon: Activity    },
  fechada:       { label: 'Won',         cls: 's-fechada',       Icon: CheckCircle },
  perdida:       { label: 'Lost',        cls: 's-perdida',       Icon: XCircle     },
}

interface Props { status: OpportunityStatus; items: Opportunity[]; loading?: boolean }

export function KanbanColumn({ status, items, loading }: Props) {
  const { label, cls, Icon } = COL_META[status]
  const total = items.reduce((s, o) => s + o.valor, 0)

  return (
    <div className={`kol ${cls}`} data-testid={`kanban-col-${status}`}>
      <div className="kol-head">
        <div className="kol-title-row">
          <div className="kol-name-wrap">
            <div className="kol-icon"><Icon size={11} /></div>
            <span className="kol-name">{label}</span>
          </div>
          <span className="kol-count">{loading ? '—' : items.length}</span>
        </div>
        <div className="kol-total">
          <DollarSign size={10} />
          {loading ? '…' : formatCurrency(total)}
        </div>
      </div>
      <div className="kol-body">
        {loading ? (
          [...Array(2)].map((_, i) => <DealCardSkeleton key={i} />)
        ) : items.length === 0 ? (
          <div className="kol-empty">
            <Inbox size={26} />
            <span>No deals here</span>
          </div>
        ) : (
          items.map((opp, i) => <DealCard key={opp.id} opportunity={opp} index={i} />)
        )}
      </div>
    </div>
  )
}
