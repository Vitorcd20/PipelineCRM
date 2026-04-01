import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateModal } from '../components/opportunities/create-modal'
import { renderWithProviders } from '../test/renderWithProviders'

const mockCreate = vi.fn().mockResolvedValue({})
const mockClose = vi.fn()

vi.mock('../hooks/useOpportunities', () => ({
  useCreateOpportunity: () => ({ mutateAsync: mockCreate, isPending: false }),
}))

vi.mock('../store/ui.store', () => ({
  useUIStore: () => ({
    isCreateOpen: true,
    closeCreate: mockClose,
  }),
}))

describe('CreateModal', () => {
  beforeEach(() => vi.clearAllMocks())

  it('renders modal when isCreateOpen is true', () => {
    renderWithProviders(<CreateModal />)
    expect(screen.getByTestId('create-modal')).toBeInTheDocument()
    expect(screen.getByText('New Opportunity')).toBeInTheDocument()
  })

  it('shows validation errors when submitted empty', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateModal />)
    await user.click(screen.getByText('Create Opportunity'))
    await waitFor(() => {
      expect(screen.getByText(/Min 3 characters/i)).toBeInTheDocument()
    })
  })

  it('calls closeCreate when Cancel is clicked', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateModal />)
    await user.click(screen.getByText('Cancel'))
    expect(mockClose).toHaveBeenCalled()
  })

  it('calls closeCreate when backdrop is clicked', async () => {
    renderWithProviders(<CreateModal />)
    const overlay = document.querySelector('.overlay') as HTMLElement
    fireEvent.click(overlay)
    expect(mockClose).toHaveBeenCalled()
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    renderWithProviders(<CreateModal />)
    await user.type(screen.getByPlaceholderText(/ERP System/i), 'New Deal')
    await user.type(screen.getByPlaceholderText(/Acme Corporation/i), 'Client ABC')
    await user.type(screen.getByPlaceholderText('50000'), '25000')
    await user.click(screen.getByText('Create Opportunity'))
    await waitFor(() => {
      expect(mockCreate).toHaveBeenCalledWith(expect.objectContaining({
        titulo: 'New Deal',
        cliente: 'Client ABC',
        valor: 25000,
      }))
    })
  })
})
