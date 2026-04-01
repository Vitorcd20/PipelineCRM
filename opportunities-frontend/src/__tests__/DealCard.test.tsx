import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { DealCard } from '../components/opportunities/deal-card'
import { renderWithProviders } from '../test/renderWithProviders'
import { mockOpportunity } from '../test/mocks'

// Mock the hooks so tests don't hit real API
vi.mock('../hooks/useOpportunities', () => ({
  useUpdateOpportunity: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
  useDeleteOpportunity: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}))

describe('DealCard', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders title, client and value', () => {
    renderWithProviders(<DealCard opportunity={mockOpportunity} />)
    expect(screen.getByText('ERP System')).toBeInTheDocument()
    expect(screen.getByText('Acme Corp')).toBeInTheDocument()
    expect(screen.getByText('85,000')).toBeInTheDocument()
  })

  it('renders the status badge', () => {
    renderWithProviders(<DealCard opportunity={mockOpportunity} />)
    expect(screen.getByText('Open')).toBeInTheDocument()
  })

  it('shows description when present', () => {
    renderWithProviders(<DealCard opportunity={mockOpportunity} />)
    expect(screen.getByText('Full ERP development')).toBeInTheDocument()
  })

  it('does not show description when absent', () => {
    const noDesc = { ...mockOpportunity, descricao: undefined }
    renderWithProviders(<DealCard opportunity={noDesc} />)
    expect(screen.queryByText('Full ERP development')).not.toBeInTheDocument()
  })

  it('shows confirm prompt on first delete click', async () => {
    renderWithProviders(<DealCard opportunity={mockOpportunity} />)
    const delBtn = document.querySelector('.deal-btn-del') as HTMLElement
    fireEvent.click(delBtn)
    await waitFor(() => {
      expect(screen.getByText('Sure?')).toBeInTheDocument()
      expect(screen.getByText('Yes')).toBeInTheDocument()
      expect(screen.getByText('No')).toBeInTheDocument()
    })
  })

  it('hides confirm prompt when "No" is clicked', async () => {
    renderWithProviders(<DealCard opportunity={mockOpportunity} />)
    const delBtn = document.querySelector('.deal-btn-del') as HTMLElement
    fireEvent.click(delBtn)
    await waitFor(() => screen.getByText('Sure?'))
    fireEvent.click(screen.getByText('No'))
    await waitFor(() => {
      expect(screen.queryByText('Sure?')).not.toBeInTheDocument()
    })
  })
})
