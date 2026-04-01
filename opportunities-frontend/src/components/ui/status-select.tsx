import { useState } from 'react'
import { ChevronDown, Loader2 } from 'lucide-react'
import { StatusBadge } from './status-badge'
import type { OpportunityStatus } from '../../types'

const ALL: OpportunityStatus[] = ['aberta','em_negociacao','fechada','perdida']

interface Props {
  current: OpportunityStatus
  loading?: boolean
  onChange: (s: OpportunityStatus) => void
}

export function StatusSelect({ current, loading, onChange }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="status-wrap">
      <button
        className="status-toggle"
        disabled={loading}
        onClick={e => { e.stopPropagation(); setOpen(v=>!v) }}
      >
        {loading
          ? <Loader2 size={13} className="anim-spin" style={{color:'var(--c-muted)'}}/>
          : <>
              <StatusBadge status={current}/>
              <ChevronDown size={11} className={`chevron ${open?'up':''}`}/>
            </>
        }
      </button>

      {open && (
        <>
          <div style={{position:'fixed',inset:0,zIndex:55}} onClick={()=>setOpen(false)}/>
          <div className="status-drop">
            {ALL.map(s => (
              <button
                key={s}
                className={`drop-item ${s===current?'cur':''}`}
                onClick={()=>{ onChange(s); setOpen(false) }}
              >
                <StatusBadge status={s}/>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
