import { useState } from 'react'
import { Trash2, Building2, Calendar, Loader2, DollarSign } from 'lucide-react'
import { useUpdateOpportunity, useDeleteOpportunity } from '../../hooks/use-opportunities'
import { StatusSelect } from '../ui/status-select'
import { toast } from '../ui/toast'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { Opportunity, OpportunityStatus } from '../../types'

interface Props { opportunity: Opportunity; index?: number }

export function DealCard({ opportunity, index = 0 }: Props) {
  const [confirmDel, setConfirmDel] = useState(false)
  const { mutateAsync: update, isPending: updating } = useUpdateOpportunity()
  const { mutateAsync: del,    isPending: deleting  } = useDeleteOpportunity()

  const handleStatus = async (status: OpportunityStatus) => {
    try { await update({ id: opportunity.id, body: { status } }); toast.success('Status updated') }
    catch { toast.error('Failed to update') }
  }

  const handleDelete = async () => {
    if (!confirmDel) { setConfirmDel(true); return }
    try { await del(opportunity.id); toast.success('Opportunity removed') }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div className="deal-card anim-fade-up" data-testid="deal-card" style={{ animationDelay:`${index*40}ms` }}>
      <div className="deal-card-top">
        <span className="deal-title">{opportunity.titulo}</span>
        {confirmDel ? (
          <div className="confirm-inline">
            <span className="ci-label">Sure?</span>
            <button className="ci-yes" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 size={11} className="anim-spin" /> : 'Yes'}
            </button>
            <button className="ci-no" onClick={() => setConfirmDel(false)}>No</button>
          </div>
        ) : (
          <button className="deal-btn-del" onClick={handleDelete} title="Delete">
            <Trash2 size={13} />
          </button>
        )}
      </div>

      <div className="deal-meta">
        <div className="deal-meta-line">
          <Building2 size={10} />
          {opportunity.cliente}
        </div>
        {opportunity.descricao && (
          <div className="deal-meta-line">{opportunity.descricao}</div>
        )}
      </div>

      <div className="deal-footer">
        <span className="deal-value">
          <DollarSign size={11} />
          {formatCurrency(opportunity.valor).replace('$','')}
        </span>
        <StatusSelect current={opportunity.status} loading={updating} onChange={handleStatus} />
      </div>

      <div className="deal-date">
        <Calendar size={9} />
        {formatDate(opportunity.criadoEm)}
      </div>
    </div>
  )
}
