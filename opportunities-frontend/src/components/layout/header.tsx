import { BarChart3, Plus } from 'lucide-react'
import { useUIStore } from '../../store/ui.store'

export function Header() {
  const { openCreate } = useUIStore()
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-icon">
          <BarChart3 size={16} color="#fff" />
        </div>
        <div>
          <div className="brand-name">Pipeline<span>CRM</span></div>
          <div className="brand-sub">Sales opportunities</div>
        </div>
      </div>
      <button className="btn-primary" onClick={openCreate}>
        <Plus size={15} />
        New Opportunity
      </button>
    </header>
  )
}
