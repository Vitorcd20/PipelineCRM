import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from '../components/ui/status-badge'

describe('StatusBadge', () => {
  it('renders "Open" for aberta', () => {
    render(<StatusBadge status="aberta" />)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders "Negotiating" for em_negociacao', () => {
    render(<StatusBadge status="em_negociacao" />)
    expect(screen.getByText('Negotiating')).toBeInTheDocument()
  })

  it('renders "Won" for fechada', () => {
    render(<StatusBadge status="fechada" />)
    expect(screen.getByText('Won')).toBeInTheDocument()
  })

  it('renders "Lost" for perdida', () => {
    render(<StatusBadge status="perdida" />)
    expect(screen.getByText('Lost')).toBeInTheDocument()
  })

  it('applies the correct CSS class for each status', () => {
    const { container } = render(<StatusBadge status="fechada" />)
    expect(container.firstChild).toHaveClass('badge', 'fechada')
  })
})
