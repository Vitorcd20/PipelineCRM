import { BarChart3, Plus, LayoutGrid, List } from 'lucide-react'
import { useUIStore } from '../../store/ui.store'

export function Navbar() {
  const { viewMode, setViewMode, openCreate } = useUIStore()
  return (
    <nav className="navbar">
      <div className="nb-brand">
        <div className="nb-logo">
          <BarChart3 size={14} color="#000" />
        </div>
        <span className="nb-name">Pipeline<b>CRM</b></span>
        <div className="nb-divider" />
        <span className="nb-subtitle">Sales Pipeline</span>
      </div>
      <div className="nb-right">
        <div className="view-toggle" role="group" aria-label="View mode">
          <button className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')} aria-label="Kanban view" title="Kanban view">
            <LayoutGrid size={12} />
          </button>
          <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')} aria-label="List view" title="List view">
            <List size={12} />
          </button>
        </div>
        <button className="btn-primary" onClick={openCreate}>
          <Plus size={13} />
          New Opportunity
        </button>
      </div>
    </nav>
  )
}
