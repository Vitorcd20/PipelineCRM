import { describe, it, expect, vi } from 'vitest'
import { screen, fireEvent } from '@testing-library/react'
import { Navbar } from '../components/layout/navbar'
import { renderWithProviders } from '../test/renderWithProviders'

const mockOpenCreate = vi.fn()
const mockSetViewMode = vi.fn()

vi.mock('../store/ui.store', () => ({
  useUIStore: () => ({
    viewMode: 'kanban',
    setViewMode: mockSetViewMode,
    openCreate: mockOpenCreate,
  }),
}))

describe('Navbar', () => {
  it('renders brand name with PipelineCRM text', () => {
    renderWithProviders(<Navbar />)
    // Use .nb-name class to target the brand specifically
    const brand = document.querySelector('.nb-name')
    expect(brand).toBeInTheDocument()
    expect(brand?.textContent).toContain('Pipeline')
    expect(brand?.textContent).toContain('CRM')
  })

  it('renders the New Opportunity button', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByText('New Opportunity')).toBeInTheDocument()
  })

  it('calls openCreate when button is clicked', () => {
    renderWithProviders(<Navbar />)
    fireEvent.click(screen.getByText('New Opportunity'))
    expect(mockOpenCreate).toHaveBeenCalled()
  })

  it('calls setViewMode with "list" when list button clicked', () => {
    renderWithProviders(<Navbar />)
    fireEvent.click(screen.getByLabelText('List view'))
    expect(mockSetViewMode).toHaveBeenCalledWith('list')
  })

  it('calls setViewMode with "kanban" when kanban button clicked', () => {
    renderWithProviders(<Navbar />)
    fireEvent.click(screen.getByLabelText('Kanban view'))
    expect(mockSetViewMode).toHaveBeenCalledWith('kanban')
  })
})
