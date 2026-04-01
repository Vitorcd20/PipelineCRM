import { AlertCircle, Building2, Calendar, Loader2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useOpportunities, useDeleteOpportunity, useUpdateOpportunity } from '../../hooks/use-opportunities'
import { useUIStore } from '../../store/ui.store'
import { StatusSelect } from '../ui/status-select'
import { toast } from '../ui/toast'
import { formatCurrency, formatDate } from '../../lib/utils'
import type { Opportunity, OpportunityStatus } from '../../types'

function ListRow({ opp }: { opp: Opportunity }) {
  const [confirmDel, setConfirmDel] = useState(false)
  const { mutateAsync: update, isPending: updating } = useUpdateOpportunity()
  const { mutateAsync: del,    isPending: deleting  } = useDeleteOpportunity()

  const handleStatus = async (status: OpportunityStatus) => {
    try { await update({ id: opp.id, body: { status } }); toast.success('Status updated') }
    catch { toast.error('Failed to update') }
  }

  const handleDelete = async () => {
    if (!confirmDel) { setConfirmDel(true); return }
    try { await del(opp.id); toast.success('Removed') }
    catch { toast.error('Failed to delete') }
  }

  return (
    <tr className="list-row" data-testid="list-row">
      <td>{opp.titulo}</td>
      <td>
        <span className="list-client">
          <Building2 size={12} />
          {opp.cliente}
        </span>
      </td>
      <td className="list-value">{formatCurrency(opp.valor)}</td>
      <td><StatusSelect current={opp.status} loading={updating} onChange={handleStatus} /></td>
      <td>
        <span className="list-date">
          <Calendar size={11} style={{ display: 'inline', marginRight: 4 }} />
          {formatDate(opp.criadoEm)}
        </span>
      </td>
      <td>
        {confirmDel ? (
          <div className="confirm-inline">
            <span className="ci-label">Sure?</span>
            <button className="ci-yes" onClick={handleDelete} disabled={deleting}>
              {deleting ? <Loader2 size={11} className="anim-spin" /> : 'Yes'}
            </button>
            <button className="ci-no" onClick={() => setConfirmDel(false)}>No</button>
          </div>
        ) : (
          <button className="deal-btn-del" style={{ opacity: 1 }} onClick={handleDelete} title="Delete">
            <Trash2 size={13} />
          </button>
        )}
      </td>
    </tr>
  )
}

export function ListView() {
  const { statusFilter, clientSearch } = useUIStore()
  const { data, isLoading, isError, refetch } = useOpportunities({ status: statusFilter, cliente: clientSearch })

  if (isLoading) return (
    <div className="list-view">
      <table className="list-table">
        <thead>
          <tr>
            {['Title', 'Client', 'Value', 'Status', 'Created', ''].map(h => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--c-bd)' }}>
              {[...Array(6)].map((__, j) => (
                <td key={j} style={{ padding: '.75rem 1rem' }}>
                  <div className="skel" style={{ height: 13, width: j === 0 ? 160 : j === 2 ? 70 : 100 }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  if (isError) return (
    <div className="list-view">
      <div className="empty err-box">
        <AlertCircle size={32} color="#f87171" />
        <p className="empty-t" style={{ color: '#f87171' }}>Failed to load</p>
        <button className="btn-retry" onClick={() => refetch()}>Retry</button>
      </div>
    </div>
  )

  const rows = data?.dados ?? []

  return (
    <div className="list-view">
      {rows.length === 0 ? (
        <div className="empty" style={{ marginTop: '3rem' }}>
          <p className="empty-t">No opportunities found</p>
          <p className="empty-s">Try adjusting filters or create a new deal</p>
        </div>
      ) : (
        <table className="list-table">
          <thead>
            <tr>
              {['Title', 'Client', 'Value', 'Status', 'Created', ''].map(h => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(opp => <ListRow key={opp.id} opp={opp} />)}
          </tbody>
        </table>
      )}
    </div>
  )
}
