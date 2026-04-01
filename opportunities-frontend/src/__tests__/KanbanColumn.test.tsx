import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { KanbanColumn } from '../components/kanban/kanban-column'
import { renderWithProviders } from '../test/renderWithProviders'
import { mockOpportunities } from '../test/mocks'
import type { Opportunity } from '../types'

// Mock DealCard to simplify
import { vi } from 'vitest'
vi.mock('../components/opportunities/DealCard', () => ({
  DealCard: ({ opportunity }: { opportunity: Opportunity }) => (
    <div data-testid="deal-card">{opportunity.titulo}</div>
  ),
}))

describe('KanbanColumn', () => {
  const openItems = mockOpportunities.filter(o => o.status === 'aberta')

  it('renders column header with correct label', () => {
    renderWithProviders(<KanbanColumn status="aberta" items={openItems} />)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('renders count badge with correct number', () => {
    renderWithProviders(<KanbanColumn status="aberta" items={openItems} />)
    expect(screen.getByText(String(openItems.length))).toBeInTheDocument()
  })

  it('renders a DealCard for each item', () => {
    renderWithProviders(<KanbanColumn status="aberta" items={openItems} />)
    expect(screen.getAllByTestId('deal-card')).toHaveLength(openItems.length)
  })

  it('shows empty state when items is empty', () => {
    renderWithProviders(<KanbanColumn status="aberta" items={[]} />)
    expect(screen.getByText('No deals here')).toBeInTheDocument()
  })

  it('shows skeletons when loading', () => {
    renderWithProviders(<KanbanColumn status="aberta" items={[]} loading />)
    expect(screen.queryByText('No deals here')).not.toBeInTheDocument()
    // skeletons rendered instead of cards
    expect(screen.queryAllByTestId('deal-card')).toHaveLength(0)
  })
})
