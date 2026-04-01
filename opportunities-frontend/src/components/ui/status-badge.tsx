import type { OpportunityStatus } from '../../types'

export const STATUS_META: Record<OpportunityStatus,{ label:string }> = {
  aberta:        { label:'Open' },
  em_negociacao: { label:'Negotiating' },
  fechada:       { label:'Won' },
  perdida:       { label:'Lost' },
}

export function StatusBadge({ status }: { status: OpportunityStatus }) {
  return (
    <span className={`badge ${status}`}>
      <span className="badge-dot" />
      {STATUS_META[status].label}
    </span>
  )
}
