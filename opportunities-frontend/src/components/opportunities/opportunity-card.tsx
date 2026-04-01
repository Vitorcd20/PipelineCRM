import { useState } from 'react'
import { Trash2, ChevronDown, Loader2, Building2, Calendar } from 'lucide-react'
import { useUpdateOpportunity, useDeleteOpportunity } from '../../hooks/use-opportunities'
import { StatusBadge } from '../ui//status-badge'
import { toast } from '../ui/toast'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { Opportunity, OpportunityStatus } from '../../types'

const ALL_STATUSES: OpportunityStatus[] = ['aberta', 'em_negociacao', 'fechada', 'perdida']

export function OpportunityCard({ opportunity, index = 0 }: { opportunity: Opportunity; index?: number }) {
  const [dropOpen, setDropOpen] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)
  const { mutateAsync: update, isPending: updating } = useUpdateOpportunity()
  const { mutateAsync: remove, isPending: deleting } = useDeleteOpportunity()

  const handleStatus = async (s: OpportunityStatus) => {
    if (s === opportunity.status) { setDropOpen(false); return }
    setDropOpen(false)
    try {
      await update({ id: opportunity.id, body: { status: s } })
      toast.success('Status updated')
    } catch { toast.error('Failed to update status.') }
  }

  const handleDelete = async () => {
    if (!confirmDel) { setConfirmDel(true); return }
    try {
      await remove(opportunity.id)
      toast.success('Opportunity removed.')
    } catch { toast.error('Failed to delete.') }
  }

  return (
    <div
      className={`opp-card s-${opportunity.status} fade-up`}
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="card-top">
        <div style={{ flex:1, minWidth:0 }}>
          <div className="card-title">{opportunity.titulo}</div>
          <div className="card-client" style={{ marginTop:'5px' }}>
            <Building2 size={12} />
            {opportunity.cliente}
          </div>
        </div>

        {confirmDel ? (
          <div className="confirm-delete">
            <span className="confirm-text">Delete?</span>
            <button className="btn-confirm-yes" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 size={11} className="spin" /> : 'Yes'}
            </button>
            <button className="btn-confirm-no" onClick={() => setConfirmDel(false)}>No</button>
          </div>
        ) : (
          <button className="btn-icon" onClick={handleDelete} title="Delete">
            <Trash2 size={14} />
          </button>
        )}
      </div>

      {opportunity.descricao && (
        <div className="card-desc">{opportunity.descricao}</div>
      )}

      <div className="card-footer">
        <span className="card-value">{formatCurrency(opportunity.valor)}</span>

        <div className="status-btn-wrap">
          <button
            className="status-toggle"
            onClick={() => setDropOpen(v => !v)}
            disabled={updating}
          >
            {updating
              ? <Loader2 size={14} className="spin" style={{ color:'var(--text-muted)' }} />
              : <>
                  <StatusBadge status={opportunity.status} />
                  <ChevronDown size={12} className={`chevron ${dropOpen ? 'open' : ''}`} />
                </>
            }
          </button>

          {dropOpen && (
            <>
              <div style={{ position:'fixed', inset:0, zIndex:10 }} onClick={() => setDropOpen(false)} />
              <div className="status-dropdown">
                {ALL_STATUSES.map(s => (
                  <button
                    key={s}
                    className={`dropdown-item ${s === opportunity.status ? 'active' : ''}`}
                    onClick={() => handleStatus(s)}
                  >
                    <StatusBadge status={s} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card-date">
        <Calendar size={11} />
        {formatDate(opportunity.criadoEm)}
      </div>
    </div>
  )
}
