import { Search, X, LayoutGrid, DollarSign, Users } from 'lucide-react'
import { useDashboard } from '../../hooks/use-opportunities'
import { useUIStore } from '../../store/ui.store'
import { formatCurrency } from '../../lib/utils'
import type { OpportunityStatus } from '../../types'
import { SidebarSkeleton } from '../ui/skeleton'

const STATUS_META: { key: OpportunityStatus; label: string; cls: string }[] = [
  { key: 'aberta',        label: 'Open',        cls: 's-open'  },
  { key: 'em_negociacao', label: 'Negotiating', cls: 's-neg'   },
  { key: 'fechada',       label: 'Won',         cls: 's-won'   },
  { key: 'perdida',       label: 'Lost',        cls: 's-lost'  },
]

export function Sidebar() {
  const { statusFilter, clientSearch, setStatusFilter, setClientSearch } = useUIStore()
  const { data, isLoading } = useDashboard()

  const getCount = (key: OpportunityStatus) =>
    data?.porStatus.find(p => p.status === key)?.total ?? 0
  const getValue = (key: OpportunityStatus) =>
    data?.porStatus.find(p => p.status === key)?.valorAgregado ?? 0

  return (
    <aside className="sidebar">
      <div className="search-bar">
        <Search size={13} />
        <input
          placeholder="Search clients…"
          value={clientSearch}
          onChange={e => setClientSearch(e.target.value)}
        />
        {clientSearch && (
          <button onClick={() => setClientSearch('')} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--muted)', display:'flex', padding:0 }}>
            <X size={12} />
          </button>
        )}
      </div>

      <div>
        <p className="sidebar-title">Pipeline</p>
        <div style={{ marginTop:'.5rem', display:'flex', flexDirection:'column', gap:'.3rem' }}>
          {isLoading ? <SidebarSkeleton /> : (
            <>
              <div className="pipeline-card anim-fade-up">
                <div className="pl-top">
                  <div>
                    <p className="pl-label">Total Value</p>
                    <p className="pl-value">{formatCurrency(data?.valorTotal ?? 0)}</p>
                  </div>
                  <div className="pl-icon"><DollarSign size={14} /></div>
                </div>
                <p className="pl-count">
                  <Users size={10} />
                  {data?.totalOportunidades ?? 0} opportunities
                </p>
              </div>

              <button
                className={`sidebar-all-btn ${statusFilter === 'all' ? 'active' : ''}`}
                onClick={() => setStatusFilter('all')}
                style={{ marginTop:'.25rem' }}
              >
                <LayoutGrid size={11} />
                All stages
                <span className="sidebar-all-count">{data?.totalOportunidades ?? 0}</span>
              </button>

              {STATUS_META.map(({ key, label, cls }) => (
                <button
                  key={key}
                  className={`stat-row ${cls} ${statusFilter === key ? 'active' : ''}`}
                  onClick={() => setStatusFilter(statusFilter === key ? 'all' : key)}
                >
                  <div className="stat-row-left">
                    <span className="stat-glyph" />
                    <span className="stat-name">{label}</span>
                  </div>
                  <div className="stat-right">
                    <span className="stat-count-badge">{getCount(key)}</span>
                    <span className="stat-val">{formatCurrency(getValue(key))}</span>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
