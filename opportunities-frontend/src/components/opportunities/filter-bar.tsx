import { Search, X } from 'lucide-react'
import { useUIStore } from '../../store/ui.store'
import type { OpportunityStatus } from '../../types'

const PILLS: { value: OpportunityStatus | 'all'; label: string; activeClass: string }[] = [
  { value: 'all',          label: 'All',         activeClass: 'active-all' },
  { value: 'aberta',       label: 'Open',        activeClass: 'active-open' },
  { value: 'em_negociacao',label: 'Negotiating', activeClass: 'active-neg' },
  { value: 'fechada',      label: 'Won',         activeClass: 'active-won' },
  { value: 'perdida',      label: 'Lost',        activeClass: 'active-lost' },
]

export function FilterBar() {
  const { statusFilter, clientSearch, setStatusFilter, setClientSearch } = useUIStore()
  return (
    <div className="filter-bar">
      <div className="filter-pills">
        {PILLS.map(({ value, label, activeClass }) => (
          <button
            key={value}
            onClick={() => setStatusFilter(value)}
            className={`pill ${statusFilter === value ? activeClass : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="search-wrap">
        <Search className="search-icon" />
        <input
          className="search-input"
          placeholder="Search by client name..."
          value={clientSearch}
          onChange={e => setClientSearch(e.target.value)}
        />
        {clientSearch && (
          <button className="search-clear" onClick={() => setClientSearch('')}>
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  )
}
